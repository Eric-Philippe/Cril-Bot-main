import {
  ButtonInteraction,
  EmbedBuilder,
  GuildMember,
  Message,
  MessageCreateOptions,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import QuestionManager from "./QuestionManager";
import Stopwatch from "../../utils/Stopwatch";
import { Question } from "./Question";
import { ButtonId } from "../../res/ButtonID";
import Messages from "../../middlewares/Messages/Messages";
import { Colors } from "../../middlewares/Messages/Colors";
import Logger from "../../logger/Logger";

export default class MCQ {
  private questionManager: QuestionManager;
  private member: GuildMember;
  private channel: ThreadChannel | TextChannel;
  private totalErrors: number = 0;
  private stopwatch: Stopwatch;
  private answersHistory: boolean[] = [];

  constructor(
    interaction: ButtonInteraction,
    questionJson: any[],
    withTimer: boolean
  ) {
    this.questionManager = new QuestionManager(questionJson);
    this.member = interaction.member as GuildMember;
    this.channel = interaction.channel as ThreadChannel | TextChannel;
    if (withTimer) this.stopwatch = new Stopwatch();
  }

  public async launch() {
    return new Promise(async (res) => {
      if (this.stopwatch) this.stopwatch.start();

      const generator = this.questionManager.getGenerator();

      let questionG = generator.next();
      while (questionG.done == false) {
        const question = questionG.value as Question;
        const rightAnswer = question.rightAnswer;

        const msg = await this.channel.send(
          QuestionManager.buildQuestionIHM(
            question,
            this.answersHistory.length,
            this.questionManager.getQuestionSize()
          )
        );

        let firstTry = true;
        while (true) {
          let answer: Map<number, ButtonInteraction> | number = -1;
          try {
            answer = await this.buttonCollector(msg);
            if (typeof answer == "number") {
              this.channel.send(
                "Une erreur s'est produite merci de contacter un administrateur !"
              );
            }
          } catch (e) {
            return;
          }

          const answerIndex = (answer as Map<number, ButtonInteraction>)
            .keys()
            .next().value;
          const answerButton = (answer as Map<number, ButtonInteraction>)
            .values()
            .next().value;

          if (answerIndex == rightAnswer) {
            this.answersHistory.push(firstTry);
            await Messages.sendSuccess(
              answerButton,
              "Bonne réponse ! \nProchaine question !",
              "Bravo !",
              true
            );
            questionG = generator.next();
            break;
          } else {
            this.totalErrors++;
            let text = "Mauvaise réponse ! \nRéessayez !";
            if (this.totalErrors >= 2)
              text += `\n\n**Pensez à répondre sérieusement sans vous précipiter !**`;

            await Messages.sendError(answerButton, text, "Dommage !", true);
            firstTry = false;
          }
        }
      }

      this.stopwatch.stop();
      res(0);
    });
  }

  private async buttonCollector(
    msg: Message
  ): Promise<Map<number, ButtonInteraction> | number> {
    return new Promise(async (res, rej) => {
      const filter = (i: ButtonInteraction) => i.user.id === this.member.id;
      try {
        const response = (await msg.awaitMessageComponent({
          filter: filter,
        })) as ButtonInteraction;

        const customId = response.customId;
        // Remove the MCQ prefix
        const answerIndex = parseInt(
          customId.slice(ButtonId.MCQ_ANSWER.length)
        );

        res(new Map([[answerIndex, response]]));
      } catch (error) {
        rej(-1);
      }
    });
  }

  public buildMcqReport(): MessageCreateOptions {
    const elapsedTimeInMin = this.stopwatch.elapsedTimeMin;

    const errorPerMinute =
      Math.round((this.totalErrors / elapsedTimeInMin) * 100) / 100;

    // Count the number of good answers in the history
    const score = this.answersHistory.filter((e) => e).length;

    const color =
      score <= 0 || errorPerMinute >= 0.8 ? Colors.RED : Colors.GREEN;

    const reportHistory = this.buildReportHistory();

    const embed = new EmbedBuilder()
      .setTitle(`L'utilisateur ${this.member.nickname} a fini le QCM !`)
      .setFields(
        {
          name: "Score",
          value: `${score}/${this.answersHistory.length}`,
        },
        {
          name: "Temps",
          value: this.stopwatch.toString(),
        },
        {
          name: "Erreurs par minute",
          value: `${errorPerMinute} erreurs/min`,
        },
        {
          name: "Erreurs totales",
          value: `${this.totalErrors}`,
        },
        {
          name: "Historique",
          value: reportHistory,
        }
      )
      .setColor(color)
      .setThumbnail(
        "https://media.discordapp.net/attachments/579303130886569984/1032297054036312145/check.png"
      )
      .setDescription(`**${this.member.user}** a fini le QCM !`)
      .setTimestamp();

    Logger.logEntry(this.member.id, `${this.member.nickname} MCQ Terminé`);
    return { embeds: [embed] };
  }

  private buildReportHistory(): string {
    let report = "";
    for (let i = 0; i < this.answersHistory.length; i++) {
      const answer = this.answersHistory[i];
      report += `Question ${i + 1}: ${answer ? "``✅``" : "``❌``"}\n`;
    }
    return report;
  }
}
