import { GitLibrary } from "@cicada-lang/librarian"
import { GitLabLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { GitHubLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { Exp, Module, Trace, doc_builder, module_viewer } from "@xieyuheng/exp"
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
  library: GitLibrary<Module>
  path: string
  report: Report | null = null
  exp: Exp | null = null

  constructor(opts: { library: GitLibrary<Module>; path: string }) {
    this.library = opts.library
    this.path = opts.path
  }

  static async build(opts: {
    library_id: string
    servant: string
  }): Promise<StageState> {
    const { library_id, servant } = opts

    const library = await createLibrary({ library_id, servant })
    const paths = Object.keys(library.files)
    if (paths.length === 0) {
      throw new Error(`library has no files`)
    }

    return new StageState({ library, path: paths[0] })
  }

  get text(): string {
    return this.library.files[this.path]
  }

  set text(text: string) {
    if (!text) return
    this.library.files[this.path] = text
  }

  step(): void {
    // TODO
  }

  async run(): Promise<void> {
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

async function createLibrary(opts: {
  library_id: string
  servant: string
}): Promise<GitLibrary<Module>> {
  const { library_id, servant } = opts
  if (servant === "github") {
    return await GitHubLibrary.create(library_id, {
      doc_builder,
      module_viewer,
    })
  } else if (servant === "gitlab") {
    return await GitLabLibrary.create(library_id, {
      doc_builder,
      module_viewer,
    })
  } else {
    throw new Error(`Unknown servant: ${servant}`)
  }
}
