import { Stmt } from "../stmt"
import { Module } from "../module"
import { Exp, evaluate } from "../exp"

export class Show implements Stmt {
  exp: Exp

  constructor(exp: Exp) {
    this.exp = exp
  }

  async execute(mod: Module): Promise<void> {
    mod.enter(this, { output: this.exp.repr() })
  }
}
