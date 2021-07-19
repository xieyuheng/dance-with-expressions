import { Exp, evaluate } from "../exp"
import { Env } from "../env"
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
      // NOTE Before subst the `exp` into the `this.ret`, free names must be protected,
      //   we must change `this.name` to a `fresh_name` relative to `exp`,
      //   so that, it will not bound free names of the `exp`.
      const fresh_name = ut.freshen_name(exp.free_names(new Set()), this.name)
      const ret = this.ret.subst(this.name, new Exps.Var(fresh_name))
      return new Let(
        fresh_name,
        this.exp.subst(name, exp),
        ret.subst(name, exp)
      )
    }
  }

  evaluate(env: Env): Exp {
    const exp = evaluate(env, this.exp)
    return evaluate(env, this.ret.subst(this.name, exp))
  }

  beta_step(): Exp {
    return this.ret.subst(this.name, this.exp)
  }

  repr(): string {
    return `let ${this.name} = ${this.exp.repr()} ${this.ret.repr()}`
  }
}
