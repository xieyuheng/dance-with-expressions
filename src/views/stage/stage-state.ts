import { GitLibrary } from "@cicada-lang/librarian"
import { GitLabLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { GitHubLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { Module, Trace, doc_builder, module_viewer } from "@xieyuheng/exp"
import pt, { ParsingError } from "@cicada-lang/partech"

type Report = {
  output?: string
  semantic_error?: {
    message: string
    previous_expressions: Array<string>
  }
  syntax_error?: {
    message: string
    context?: string
  }
  unknown_error?: Error
}

export class StageState {
  library: null | GitLibrary<Module> = null
  path: null | string = null
  report: null | Report = null

  constructor(opts: { library: GitLibrary<Module> }) {
    this.library = opts.library
  }

  static async build(opts: {
    library_id: string
    servant: string
  }): Promise<StageState> {
    const { library_id, servant } = opts

    if (servant === "github") {
      return new StageState({
        library: await GitHubLibrary.create(library_id, {
          doc_builder,
          module_viewer,
        }),
      }).init_path()
    } else if (servant === "gitlab") {
      return new StageState({
        library: await GitLabLibrary.create(library_id, {
          doc_builder,
          module_viewer,
        }),
      }).init_path()
    } else {
      throw new Error(`Unknown servant: ${servant}`)
    }
  }

  init_path(): this {
    if (this.library) {
      const paths = Object.keys(this.library.files)
      this.path = paths[0] || null
    }

    return this
  }

  get text(): null | string {
    if (!this.library) return null
    if (!this.path) return null
    return this.library.files[this.path] || null
  }

  set text(text: null | string) {
    if (!text) return
    if (!this.library) return
    if (!this.path) return
    this.library.files[this.path] = text
  }

  async run(): Promise<void> {
    if (!this.library) return
    if (!this.path) return

    try {
      const mod = await this.library.reload(this.path)
      this.report = { output: mod.output }
    } catch (error) {
      if (error instanceof Trace) {
        this.report = {
          semantic_error: {
            message: error.message,
            previous_expressions: error.previous.map((exp) => exp.repr()),
          },
        }
      } else if (error instanceof ParsingError) {
        this.report = {
          syntax_error: {
            message: error.message.trim(),
            context: this.text ? pt.report(error.span, this.text) : undefined,
          },
        }
      } else {
        this.report = { unknown_error: error }
      }
    }
  }
}
