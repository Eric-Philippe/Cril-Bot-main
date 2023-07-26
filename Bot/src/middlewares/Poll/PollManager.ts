import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { AppDataSource } from "../../data-source";
import { Poll } from "../../entities/Poll";
import { PollResult } from "./PollResult";
import { ButtonId } from "../../res/ButtonID";

export class PollsManager {
  public static async createAnswer(
    msgId: string,
    userId: string,
    answer: number
  ): Promise<number> {
    try {
      const repo = AppDataSource.getRepository(Poll);
      const poll = new Poll();
      poll.msgid = msgId;
      poll.userid = userId;
      poll.answer = answer;

      await repo.save(poll);

      return 0;
    } catch (e) {
      return -1;
    }
  }

  protected static async removeAnswer(
    msgId: string,
    userId: string
  ): Promise<number> {
    try {
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(Poll)
        .where("msgid = :msgid AND userid = :userid", {
          msgid: msgId,
          userid: userId,
        })
        .execute();
    } catch (e) {
      return -1;
    }
  }

  protected static async getPollResults(msgId: string): Promise<PollResult> {
    try {
      const repo = AppDataSource.getRepository(Poll);
      const answers = await repo.findBy({ msgid: msgId });
      let pollResult: PollResult = {
        msgId: msgId,
        answers: [null, null, null, null, null],
      };

      for (const answer of answers) {
        let indexAnswer = answer.answer;
        if (pollResult.answers[indexAnswer] == null) {
          pollResult.answers[indexAnswer] = 0;
        }
        pollResult.answers[indexAnswer]++;
      }

      return pollResult;
    } catch (e) {
      return null;
    }
  }

  protected static async hasVoted(
    msgId: string,
    userId: string
  ): Promise<number> {
    try {
      const repo = await AppDataSource.getRepository(Poll);
      const poll = await repo.findOneBy({ msgid: msgId, userid: userId });

      if (poll != null) return poll.answer;
      return -1;
    } catch (e) {
      return -1;
    }
  }

  public static async updatePoll(i: ButtonInteraction) {
    const msgId = i.message.id;
    const userId = i.user.id;
    const oldEmbed = i.message.embeds[0];

    const newAnswer = parseInt(i.customId.split(ButtonId.POLL)[1]);
    const pastAnswer = await this.hasVoted(msgId, userId);

    if (pastAnswer == newAnswer) {
      await this.removeAnswer(msgId, userId);
    } else if (pastAnswer != -1 && pastAnswer != newAnswer) {
      await this.removeAnswer(msgId, userId);
      await this.createAnswer(msgId, userId, newAnswer);
    } else if (pastAnswer == -1) {
      await this.createAnswer(msgId, userId, newAnswer);
    }

    let pollResult = await this.getPollResults(msgId);

    let percentArray = this.intArrayToPercentArray(pollResult.answers);

    for (let y = 0; y < oldEmbed.fields.length; y++) {
      let total = pollResult.answers[y] == null ? 0 : pollResult.answers[y];
      oldEmbed.fields[y] = {
        name: oldEmbed.fields[y].name,
        value:
          "``" +
          this.generatoSquaro(percentArray[y]) +
          "`` | " +
          percentArray[y] +
          "% (" +
          total +
          ")",
      };
    }

    await i.update({ embeds: [oldEmbed] });
  }

  /**
   *
   * @param intArray [22,58%, 44,12%, 12,30%]
   */
  private static intArrayToPercentArray(intArray: number[]): number[] {
    let total = intArray.reduce((a, b) => a + b, 0);
    intArray = intArray.map((x) => (x / total) * 100);
    let finalArray = [];
    for (let i = 0; i < intArray.length; i++) {
      if (isNaN(intArray[i])) finalArray.push(0);
      else finalArray.push(Math.round(intArray[i] * 100) / 100);
    }

    return finalArray;
  }

  /**
   * Generate a string composed with black and white square
   * @example percentage = 22,72 => '⬜⬜⬛⬛⬛⬛⬛⬛⬛⬛'
   * @param {Number} percentage
   */
  private static generatoSquaro = (percentage) => {
    let square = "";
    let whiteSquareNumber = Math.round(percentage / 10);
    for (let i = 0; i < whiteSquareNumber; i++) {
      square += "⬜";
    }
    let blackSquareNumber = 10 - whiteSquareNumber;
    for (let i = 0; i < blackSquareNumber; i++) {
      square += "⬛";
    }
    return square;
  };
}
