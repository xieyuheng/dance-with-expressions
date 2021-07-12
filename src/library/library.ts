import { Module } from "../module"

export class Library {
  async load(path: string): Promise<Module> {
    throw new Error("TODO")
  }
}
