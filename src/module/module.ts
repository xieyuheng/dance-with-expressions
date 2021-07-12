import { Stmt } from "../stmt"
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
// - a module knows which library it belongs to -- TODO
// - one doc one module, loaded modules are cached
// - the loading order of docs matters
// - no recursion

export class Module {
  env: Env
  entries: Array<ModuleEntry>

  constructor(opts: { env?: Env; entries?: Array<ModuleEntry> }) {
    this.env = opts.env || new Env()
    this.entries = opts.entries || []
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
