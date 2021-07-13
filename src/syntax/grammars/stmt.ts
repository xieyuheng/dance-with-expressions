export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}

export const stmt = {
  $grammar: {
    "stmt:def": [{ name: "identifier" }, '"="', { exp: "exp" }],
    "stmt:def_fn": [
      { name: "identifier" },
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { ret: "exp" },
      '"}"',
    ],
    "stmt:show_operator": [{ operator: "operator" }],
    "stmt:import": [
      '"import"',
      '"{"',
      { entries: { $ap: ["zero_or_more", "import_entry"] } },
      '"}"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
  },
}

export const import_entry = {
  $grammar: {
    "import_entry:name": [{ name: "identifier" }, { $ap: ["optional", '","'] }],
    "import_entry:name_alias": [
      { name: "identifier" },
      '":"',
      { alias: "identifier" },
      { $ap: ["optional", '","'] },
    ],
  },
}
