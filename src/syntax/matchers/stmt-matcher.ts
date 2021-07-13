import pt from "@cicada-lang/partech"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as Exps from "../../exps"
import { exp_matcher, operator_matcher, names_matcher } from "../matchers"

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:def": ({ name, exp }) =>
      new Stmts.Def(pt.str(name), exp_matcher(exp)),
    "stmt:def_fn": ({ name, names, ret_t, ret }) => {
      const fn = names_matcher(names)
        .reverse()
        .reduce((result, name) => new Exps.Fn(name, result), exp_matcher(ret))

      return new Stmts.Def(pt.str(name), fn)
    },
    "stmt:show_operator": ({ operator }) =>
      new Stmts.Show(operator_matcher(operator)),
    "stmt:import": ({ path, entries }) => {
      return new Stmts.Import(
        pt.trim_boundary(pt.str(path), 1),
        pt.matchers.zero_or_more_matcher(entries).map(import_entry_matcher)
      )
    },
  })(tree)
}

export function import_entry_matcher(tree: pt.Tree): Stmts.ImportEntry {
  return pt.matcher({
    "import_entry:name": ({ name }) => ({ name: pt.str(name) }),
    "import_entry:name_alias": ({ name, alias }) => ({
      name: pt.str(name),
      alias: pt.str(alias),
    }),
  })(tree)
}
