import { GitLibrary } from "@cicada-lang/librarian"
import { GitLabLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { GitHubLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { Module, Trace, doc_builder, module_viewer } from "@xieyuheng/exp"
import { Exp, Syntax } from "@xieyuheng/exp"
import pt, { ParsingError } from "@cicada-lang/partech"

export class StageState {
  library: GitLibrary<Module>
  path: string

  mod: Module | null = null
  report: Report | null = null

  expText: string = ""
  exp: Exp | null = null
  expError: ParsingError | null = null

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
    if (paths.length === 0) throw new Error("library has no files")
    const path = paths[0]

    return new StageState({ library, path })
  }

  get text(): string {
    return this.library.files[this.path]
  }

  set text(text: string) {
    if (!text) return
    this.library.files[this.path] = text
  }

  async loadMod(): Promise<void> {
    const result = await loadMod({ library: this.library, path: this.path })
    if (result instanceof Module) {
      this.mod = result
    } else {
      this.report = result
    }
  }

  loadExp(): void {
    try {
      this.exp = Syntax.parse_exp(this.expText)
    } catch (error) {
      if (error instanceof ParsingError) {
        this.expError = error
      } else {
        throw error
      }
    }
  }

  step(): void {
    if (this.mod && this.exp) {
      this.exp = this.mod.step(this.exp)
    }
  }
}

async function loadMod(opts: {
  library: GitLibrary<Module>
  path: string
}): Promise<Module | Report> {
  const { library, path } = opts
  const text = await library.fetch_file(path)

  try {
    return await library.reload(path)
  } catch (error) {
    if (error instanceof Trace) {
      return {
        semantic_error: {
          message: error.message,
          previous_expressions: error.previous.map((exp) => exp.repr()),
        },
      }
    } else if (error instanceof ParsingError) {
      return {
        syntax_error: {
          message: error.message.trim(),
          context: pt.report(error.span, text),
        },
      }
    } else {
      return {
        unknown_error: error,
      }
    }
  }
}

type Report = {
  semantic_error?: {
    message: string
    previous_expressions: Array<string>
  }
  syntax_error?: {
    message: string
    context: string
  }
  unknown_error?: Error
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
