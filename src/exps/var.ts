import { Exp } from "../exp"

export class Var extends Exp {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  free_names(bound_names: Set<string>): Set<string> {
    if (bound_names.has(this.name)) {
      return new Set()
    } else {
      return new Set([this.name])
    }
  }

  subst(name: string, exp: Exp): Exp {
    if (name === this.name) {
      return exp
    } else {
      return this
    }
  }

  repr(): string {
    return this.name
  }
}
