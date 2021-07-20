import { Stmt } from "../stmt"
import { Module } from "../module"
import { Trace } from "../errors"

export type ImportEntry = {
  name: string
  alias?: string
}

export class Import implements Stmt {
  path: string
  entries: Array<ImportEntry>

  constructor(path: string, entries: Array<ImportEntry>) {
    this.path = path
    this.entries = entries
  }

  async execute(mod: Module): Promise<void> {
    const imported_mod = await mod.library.load(this.path).catch((error) => {
      throw new Trace(
        [
          `I fail to import from path: ${this.path}`,
          `because there are errors in that module.`,
        ].join("\n")
      )
    })

    for (const { name, alias } of this.entries) {
      const exp = imported_mod.env.lookup_exp(name)
      if (!exp) {
        throw new Trace(
          [
            `I meet undefined name:`,
            `  ${name}`,
            `when importing from module:`,
            `  ${this.path}`,
          ].join("\n")
        )
      }

      mod.env = mod.env.extend(alias || name, exp)
    }

    mod.enter(this)
  }
}
