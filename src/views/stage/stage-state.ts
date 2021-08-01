import { GitLibrary } from "@cicada-lang/librarian"
import { GitLabLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { GitHubLibrary } from "@cicada-lang/librarian/lib/git-libraries"
import { Module } from "@xieyuheng/exp"

export class StageState {
  static async build(): Promise<StageState> {
    return new StageState()
  }
}
