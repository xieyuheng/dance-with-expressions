import { Stmt } from "../stmt"
import { Module } from "../module"
import { Exp, evaluate } from "../exp"

export class Def implements Stmt {
  name: string
  exp: Exp

  constructor(name: string, exp: Exp) {
    this.name = name
    this.exp = exp
  }

  async execute(mod: Module): Promise<void> {
    const exp = evaluate(mod.env, this.exp)
    mod.env = mod.env.extend(this.name, exp)
    mod.enter(this)
  }
}
