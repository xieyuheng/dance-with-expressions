import { Exp, evaluate } from "../exp"
import { Env } from "../env"
import { Trace } from "../errors"
import * as Exps from "../exps"
import * as ut from "../ut"

export class Ap extends Exp {
  target: Exp
  arg: Exp

  constructor(target: Exp, arg: Exp) {
    super()
    this.target = target
    this.arg = arg
  }

  free_names(bound_names: Set<string> = new Set()): Set<string> {
    return new Set([
      ...this.target.free_names(bound_names),
      ...this.arg.free_names(bound_names),
    ])
  }

  subst(free_names: Set<string>, name: string, exp: Exp): Exp {
    return new Ap(
      this.target.subst(free_names, name, exp),
      this.arg.subst(free_names, name, exp)
    )
  }

  evaluate(env: Env): Exp {
    const target = evaluate(env, this.target)
    if (target instanceof Exps.Fn) {
      const ret = target.ret.subst(env.free_names(), target.name, this.arg)
      return evaluate(env, ret)
    } else {
      throw new Trace(
        [
          `I can not apply target because it is not a function.`,
          `target:`,
          `  ${this.target.repr()}`,
          `target reduced:`,
          `  ${target.repr()}`,
          `arg:`,
          `  ${this.arg.repr()}`,
        ].join("\n")
      )
    }
  }

  beta_step(env: Env): Exp {
    if (this.target instanceof Exps.Fn) {
      return this.target.ret.subst(env.free_names(), this.target.name, this.arg)
    } else {
      return new Ap(this.target.beta_step(env), this.arg)
    }
  }

  private multi_ap(args: Array<Exp> = new Array()): {
    target: Exp
    args: Array<Exp>
  } {
    if (this.target instanceof Ap) {
      return this.target.multi_ap([this.arg, ...args])
    } else {
      return { target: this.target, args: [this.arg, ...args] }
    }
  }

  repr(): string {
    const { target, args } = this.multi_ap()
    return `${target.repr()}(${args.map((arg) => arg.repr()).join(", ")})`
  }
}
