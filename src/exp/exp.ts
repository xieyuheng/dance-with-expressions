import { Env } from "../env"

export abstract class Exp {
  instanceofExp = true

  abstract free_names(bound_names?: Set<string>): Set<string>
  abstract subst(free_names: Set<string>, name: string, exp: Exp): Exp
  abstract evaluate(env: Env): Exp
  abstract beta_reduction_step(env: Env): Exp
  // abstract eta_reduction_step(env: Env): Exp
  abstract normal_form_p(env: Env): boolean
  // abstract normalize(env: Env): Exp
  abstract repr(): string
}
