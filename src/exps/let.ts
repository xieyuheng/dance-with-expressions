import { Exp } from "../exp"
import * as Exps from "../exps"
import * as ut from "../ut"

export class Let extends Exp {
  name: string
  exp: Exp
  ret: Exp

  constructor(name: string, exp: Exp, ret: Exp) {
    super()
    this.name = name
    this.exp = exp
    this.ret = ret
  }

  free_names(bound_names: Set<string>): Set<string> {
    return new Set([
      ...this.exp.free_names(bound_names),
      ...this.ret.free_names(new Set([...bound_names, this.name])),
    ])
  }

  subst(name: string, exp: Exp): Exp {
    if (name === this.name) {
      return new Let(this.name, this.exp.subst(name, exp), this.ret)
    } else {
      const free_names = exp.free_names(new Set())
      const fresh_name = ut.freshen_name(free_names, this.name)

      return new Let(
        fresh_name,
        this.exp.subst(name, exp),
        this.ret.subst(this.name, new Exps.Var(fresh_name)).subst(name, exp)
      )
    }
  }

  repr(): string {
    return `let ${this.name} = ${this.exp.repr()} ${this.ret.repr()}`
  }
}
