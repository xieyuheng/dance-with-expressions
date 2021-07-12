import { Exp } from "../exp"
import { Env } from "../env"
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

  free_names(bound_names: Set<string>): Set<string> {
    return new Set([
      ...this.target.free_names(bound_names),
      ...this.arg.free_names(bound_names),
    ])
  }

  subst(name: string, exp: Exp): Exp {
    return new Ap(this.target.subst(name, exp), this.arg.subst(name, exp))
  }

  evaluate(env: Env): Exp {
    throw new Error("TODO")
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
