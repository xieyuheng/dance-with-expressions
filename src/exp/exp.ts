export abstract class Exp {
  instanceofExp = true

  abstract free_names(bound_names: Set<string>): Set<string>
  abstract subst(name: string, exp: Exp): Exp
  abstract repr(): string
}
