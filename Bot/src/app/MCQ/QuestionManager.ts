import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ColorResolvable,
  EmbedBuilder,
  MessageCreateOptions,
} from "discord.js";
import { Question } from "./Question";
import { NumberEmotes } from "../../middlewares/Messages/Emotes";
import { ButtonId } from "../../res/ButtonID";

export default class QuestionManager {
  private questions: Question[];
  private index: number = 0;
  private generator: IterableIterator<Question>;

  constructor(questionJson: any[]) {
    this.questions = QuestionManager.loadQuestions(questionJson);
    this.generator = this.nextQuestion();
  }

  public getGenerator(): IterableIterator<Question> {
    return this.generator;
  }

  private *nextQuestion(): IterableIterator<Question> {
    while (this.index < this.questions.length) {
      yield this.questions[this.index++];
    }
  }

  public getQuestionSize(): number {
    return this.questions.length;
  }

  public static buildQuestionIHM(
    question: Question,
    currentQuestionIndex: number,
    totalQuestions: number,
    color: ColorResolvable = "Blurple"
  ): MessageCreateOptions {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `❔ | Question ${currentQuestionIndex + 1}/${totalQuestions}`,
      })
      .setTitle(question.question)
      .setColor(color);

    if (question.imgURL)
      embed.setImage(question.imgURL).setFooter({
        text: "Vous pouvez cliquer sur l'image pour la voir en plein écran",
      });

    const row = new ActionRowBuilder<ButtonBuilder>();

    for (let i = 0; i < question.answers.length; i++) {
      let buttonStyle =
        i % 2 == 0 ? ButtonStyle.Primary : ButtonStyle.Secondary;
      row.addComponents(
        new ButtonBuilder()
          .setEmoji(NumberEmotes[i])
          .setStyle(buttonStyle)
          .setCustomId(ButtonId.MCQ_ANSWER + i.toString())
      );

      embed.addFields({
        name: NumberEmotes[i],
        value: question.answers[i],
        inline: true,
      });
    }

    return { embeds: [embed], components: [row] };
  }

  public static loadQuestions(questionJson: any[]): Question[] {
    const questions: Question[] = [];

    for (const question of questionJson) {
      if (
        !question["question"] ||
        !question["answers"] ||
        question["rightAnswer"] === undefined
      )
        throw new Error("Invalid question");
      questions.push({
        question: question.question,
        answers: question.answers,
        rightAnswer: question.rightAnswer,
        imgURL: question.imgURL,
      });
    }
    return questions;
  }
}
