import pt from "@cicada-lang/partech"

const preserved = [
  // stmts
  "import",
  // keywords
  // built-in
]

export const identifier = pt.grammars.pattern_unless_preserved(
  "identifier",
  preserved
)
