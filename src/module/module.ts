import { Library } from "../library"
import { Stmt } from "../stmt"
import { Doc } from "../doc"
import { Env } from "../env"

class ModuleEntry {
  stmt: Stmt
  output: string

  constructor(opts: { stmt: Stmt; output: string }) {
    this.stmt = opts.stmt
    this.output = opts.output
  }
}

// NOTE
// - a module knows which library it belongs to
// - one doc one module, loaded modules are cached
// - the loading order of docs matters
// - no recursion

export class Module {
  library: Library
  doc: Doc
  env: Env
  entries: Array<ModuleEntry>

  constructor(opts: { doc: Doc; env?: Env; entries?: Array<ModuleEntry> }) {
    this.doc = opts.doc
    this.library = opts.doc.library
    this.env = opts.env || new Env()
    this.entries = opts.entries || []
  }

  static async from_doc(doc: Doc): Promise<Module> {
    const mod = new Module({ doc: doc })
    for (const { stmt } of doc.entries) {
      await stmt.execute(mod)
    }
    return mod
  }

  enter(stmt: Stmt, opts?: { output?: string }): void {
    const output = opts?.output || ""
    this.entries.push(new ModuleEntry({ stmt, output }))
  }

  get output(): string {
    const output = this.entries
      .filter((entry) => entry.output)
      .map((entry) => entry.output)
      .join("\n")

    return output ? output + "\n" : ""
  }
}
