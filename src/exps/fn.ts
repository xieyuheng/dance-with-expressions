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

  free_names(bound_names: Set<string>): Set<string> {
    return new Set([
      ...this.ret.free_names(new Set([...bound_names, this.name])),
    ])
  }

  subst(name: string, exp: Exp): Exp {
    if (name === this.name) {
      return this
    } else {
      // NOTE Before subst the `exp` into the `this.ret`, free names must be protected,
      //   we must change `this.name` to a `fresh_name` relative to `exp`,
      //   so that, it will not bound free names of the `exp`.
      const fresh_name = ut.freshen_name(exp.free_names(new Set()), this.name)
      const ret = this.ret.subst(this.name, new Exps.Var(fresh_name))
      return new Fn(fresh_name, ret.subst(name, exp))
    }
  }

  evaluate(env: Env): Exp {
    return this
  }

  beta_step(): Exp {
    return new Fn(this.name, this.ret.beta_step())
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
