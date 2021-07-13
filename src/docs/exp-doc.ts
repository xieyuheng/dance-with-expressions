import { Doc, DocEntry } from "../doc"
import { Library } from "../library"
// import * as Syntax from "../syntax"

export class ExpDoc extends Doc {
  library: Library
  text: string
  path: string

  constructor(opts: { library: Library; text: string; path: string }) {
    super()
    this.library = opts.library
    this.text = opts.text
    this.path = opts.path
  }

  get entries(): Array<DocEntry> {
    throw new Error("TODO")
    // const stmts = Syntax.parse_stmts(this.text)
    // return stmts.map((stmt) => new DocEntry({ stmt }))
  }
}
