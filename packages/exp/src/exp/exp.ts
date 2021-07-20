import { Env } from "../env"

// NOTE The use of `Env` here, is for global variables, not for closure.
// The word "env" means "evaluation context" by tradition.

export abstract class Exp {
  instanceofExp = true

  abstract free_names(bound_names?: Set<string>): Set<string>
  // NOTE We need to pass `global_free_names` to `subst`,
  //   because all free names should be protected.

  abstract subst(global_free_names: Set<string>, name: string, exp: Exp): Exp
  abstract evaluate(env: Env): Exp

  // NOTE One step should only eliminate one reduction target.

  abstract reduction_step(env: Env): Exp
  abstract normal_form_p(env: Env): boolean

  abstract repr(): string

  normalize(env: Env): Exp {
    let exp: Exp = this
    while (!exp.normal_form_p(env)) {
      exp = exp.reduction_step(env)
    }

    return exp
  }
}
