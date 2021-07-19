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

  free_names(bound_names: Set<string> = new Set()): Set<string> {
    return new Set([
      ...this.exp.free_names(bound_names),
      ...this.ret.free_names(new Set([...bound_names, this.name])),
    ])
  }

  subst(free_names: Set<string>, name: string, exp: Exp): Exp {
    if (name === this.name) {
      return new Let(this.name, this.exp.subst(free_names, name, exp), this.ret)
    } else {
      // NOTE Before subst the `exp` into the `this.ret`, free names must be protected,
      //   we must change `this.name` to a `fresh_name` relative to `exp`,
      //   so that, it will not bound free names of the `exp`.
      free_names = new Set([...free_names, ...exp.free_names()])
      const fresh_name = ut.freshen_name(free_names, this.name)
      const ret = this.ret.subst(
        free_names,
        this.name,
        new Exps.Var(fresh_name)
      )
      return new Let(
        fresh_name,
        this.exp.subst(free_names, name, exp),
        ret.subst(free_names, name, exp)
      )
    }
  }

  evaluate(env: Env): Exp {
    const exp = evaluate(env, this.exp)
    return evaluate(env, this.ret.subst(env.free_names(), this.name, exp))
  }

  beta_reduction_step(env: Env): Exp {
    return this.ret.subst(env.free_names(), this.name, this.exp)
  }

  normal_form_p(env: Env): boolean {
    // NOTE A "let" expression can always be reduced,
    //   thus it is not normal form.
    return false
  }

  repr(): string {
    return `let ${this.name} = ${this.exp.repr()} ${this.ret.repr()}`
  }
}
