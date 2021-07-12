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
    mod.env = mod.env.extend(this.name, evaluate(mod.env, this.exp))
    mod.enter(this)
  }
}
