import { Exp } from "../exp"
import { Env } from "../env"
import { Trace } from "../errors"

export class Var extends Exp {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  free_names(bound_names: Set<string> = new Set()): Set<string> {
    if (bound_names.has(this.name)) {
      return new Set()
    } else {
      return new Set([this.name])
    }
  }

  subst(free_names: Set<string>, name: string, exp: Exp): Exp {
    if (name === this.name) {
      return exp
    } else {
      return this
    }
  }

  evaluate(env: Env): Exp {
    const exp = env.lookup_exp(this.name)
    if (exp === undefined) {
      throw new Trace(
        [
          `Fail to evaluate a variable.`,
          `The name ${this.name} is undefined.`,
        ].join("\n")
      )
    }

    return exp
  }

  beta_step(): Exp {
    throw new Error()
    return this
  }

  repr(): string {
    return this.name
  }
}
