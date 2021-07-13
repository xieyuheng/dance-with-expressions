export const operator = {
  $grammar: {
    "operator:var": [{ name: "identifier" }],
    "operator:ap": [
      { target: "operator" },
      { args: { $ap: ["one_or_more", '"("', "exps", '")"'] } },
    ],
    "operator:fn": [
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { ret: "exp" },
      '"}"',
    ],
  },
}

export const declaration = {
  $grammar: {
    "declaration:let": [
      { name: "identifier" },
      '"="',
      { exp: "exp" },
      { ret: "exp" },
    ],
    "declaration:let_fn": [
      { name: "identifier" },
      '"("',
      { names: "names" },
      '")"',
      '"{"',
      { ret: "exp" },
      '"}"',
      { body: "exp" },
    ],
  },
}

export const exp = {
  $grammar: {
    "exp:operator": [{ operator: "operator" }],
    "exp:declaration": [{ declaration: "declaration" }],
  },
}

export const names = {
  $grammar: {
    "names:names": [
      { entries: { $ap: ["zero_or_more", "identifier", '","'] } },
      { last_entry: "identifier" },
      { $ap: ["optional", '","'] },
    ],
  },
}

export const exps = {
  $grammar: {
    "exps:exps": [
      { entries: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_entry: "exp" },
      { $ap: ["optional", '","'] },
    ],
  },
}
