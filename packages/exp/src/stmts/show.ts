import { Stmt } from "../stmt"
import { Module } from "../module"
import { Exp, evaluate } from "../exp"

export class Show implements Stmt {
  exp: Exp

  constructor(exp: Exp) {
    this.exp = exp
  }

  async execute(mod: Module): Promise<void> {
    const exp = this.exp.normalize(mod.env)
    mod.enter(this, { output: exp.repr() })
  }
}
