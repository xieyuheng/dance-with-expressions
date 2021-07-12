import { Stmt } from "../stmt"
import { Module } from "../module"
import { Exp } from "../exp"
// import { evaluate } from "../core"

export class Def implements Stmt {
  name: string
  exp: Exp

  constructor(name: string, exp: Exp) {
    this.name = name
    this.exp = exp
  }

  async execute(mod: Module): Promise<void> {
    // mod.env = mod.env.extend(this.name, evaluate(mod.env, inferred.core))
    mod.enter(this)
  }
}
