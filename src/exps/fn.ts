import { Exp } from "../exp"
import { Env } from "../env"
import * as Exps from "../exps"
import * as ut from "../ut"

export class Fn extends Exp {
  name: string
  ret: Exp

  constructor(name: string, ret: Exp) {
    super()
    this.name = name
    this.ret = ret
  }

  free_names(bound_names: Set<string> = new Set()): Set<string> {
    return new Set([
      ...this.ret.free_names(new Set([...bound_names, this.name])),
    ])
  }

  subst(free_names: Set<string>, name: string, exp: Exp): Exp {
    if (name === this.name) {
      return this
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
      return new Fn(fresh_name, ret.subst(free_names, name, exp))
    }
  }

  evaluate(env: Env): Exp {
    return this
  }

  beta_reduction_step(env: Env): Exp {
    return new Fn(this.name, this.ret.beta_reduction_step(env))
  }

  beta_normal_form_p(env: Env): boolean {
    return this.ret.beta_normal_form_p(env)
  }

  private multi_fn(names: Array<string> = new Array()): {
    names: Array<string>
    ret: Exp
  } {
    if (this.ret instanceof Fn) {
      return this.ret.multi_fn([...names, this.name])
    } else {
      return { names: [...names, this.name], ret: this.ret }
    }
  }

  repr(): string {
    const { names, ret } = this.multi_fn()
    return `(${names.join(", ")}) { ${ret.repr()} }`
  }
}
