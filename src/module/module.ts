import { Stmt } from "../stmt"
// import { Env } from "../env"

class ModuleEntry {
  stmt: Stmt
  output: string

  constructor(opts: { stmt: Stmt; output: string }) {
    this.stmt = opts.stmt
    this.output = opts.output
  }
}

export class Module {
  entries: Array<ModuleEntry>

  constructor(opts: { entries?: Array<ModuleEntry> }) {
    this.entries = opts.entries || []
  }

  enter(stmt: Stmt, opts?: { output?: string }): void {
    const output = opts?.output || ""
    this.entries.push(new ModuleEntry({ stmt, output }))
  }
}
