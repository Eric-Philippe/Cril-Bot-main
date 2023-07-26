export class PollsManager {
  private static answersMap: Map<string, Array<Array<string>>> = new Map();

  public static savePoll(msgId: string, answersSize: number) {
    let answers = [];
    for (let i = 0; i < answersSize; i++) {
      answers.push([]);
    }

    this.answersMap.set(msgId, answers);
  }

  public static removePoll(msgId: string) {
    this.answersMap.delete(msgId);
  }
}
