import { Env } from "../env"

export abstract class Exp {
  instanceofExp = true

  abstract free_names(bound_names: Set<string>): Set<string>
  abstract subst(name: string, exp: Exp): Exp
  abstract evaluate(env: Env): Exp
  abstract beta_step(): Exp
  abstract repr(): string
}
