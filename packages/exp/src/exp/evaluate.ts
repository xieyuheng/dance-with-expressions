import { Exp } from "../exp"
import { Env } from "../env"
import { Trace } from "../errors"

export function evaluate(env: Env, exp: Exp): Exp {
  try {
    return exp.evaluate(env)
  } catch (error) {
    if (error instanceof Trace) {
      throw error.trail(exp)
    } else {
      throw error
    }
  }
}
