export class StageState {
  static async build(): Promise<StageState> {
    return new StageState()
  }
}
