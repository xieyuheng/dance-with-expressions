import { Exp } from "../exp"

export class Env {
  exps: Map<string, Exp>

  constructor(exps: Map<string, Exp> = new Map()) {
    this.exps = exps
  }

  extend(name: string, value: Exp): Env {
    return new Env(new Map([...this.exps, [name, value]]))
  }

  lookup_exp(name: string): undefined | Exp {
    const value = this.exps.get(name)
    if (value !== undefined) return value
    else return undefined
  }
}
