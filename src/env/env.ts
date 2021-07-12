import { Exp } from "../exp"

export class Env {
  exps: Map<string, Exp>

  constructor(exps: Map<string, Exp> = new Map()) {
    this.exps = exps
  }

  extend(name: string, value: Exp): Env {
    return new Env(new Map([...this.exps, [name, value]]))
  }

  extend_by_exps(exps: Map<string, Exp>): Env {
    return new Env(new Map([...this.exps, ...exps]))
  }

  lookup_value(name: string): undefined | Exp {
    const value = this.exps.get(name)
    if (value !== undefined) return value
    else return undefined
  }
}
