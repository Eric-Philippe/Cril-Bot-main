import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
} from "discord.js";
import { Colors } from "./Colors";
import { Emotes } from "./Emotes";
import Logger from "../../logger/Logger";

export default class Messages {
  public static send(
    i: ChatInputCommandInteraction,
    msg: string,
    title?: string
  ) {
    const embed = this.buildEmbed(`${Emotes.INFO} | ${msg}`, title);

    this.sendInteraction(i, embed);
  }

  public static async sendSuccess(
    i: ChatInputCommandInteraction,
    msg: string,
    title?: string
  ) {
    const embed = this.buildEmbed(
      `${Emotes.SUCCESS} | ${msg}`,
      title,
      Colors.GREEN
    );

    await this.sendInteraction(i, embed);
  }

  public static async sendError(
    i: ChatInputCommandInteraction,
    msg: string,
    title?: string
  ) {
    const embed = this.buildEmbed(
      `${Emotes.ERROR} | ${msg}`,
      title,
      Colors.RED
    );

    await this.sendInteraction(i, embed);
  }

  public static async sendWarning(
    i: ChatInputCommandInteraction,
    msg: string,
    title?: string
  ) {
    const embed = this.buildEmbed(
      `${Emotes.WARNING} | ${msg}`,
      title,
      Colors.YELLOW
    );

    await this.sendInteraction(i, embed);
  }

  public static async sendLoading(
    i: ChatInputCommandInteraction,
    msg: string,
    title?: string
  ) {
    const embed = this.buildEmbed(
      `${Emotes.LOADING} | ${msg}`,
      title,
      Colors.YELLOW
    );

    await this.sendInteraction(i, embed);
  }

  public static buildEmbed(
    msg: string,
    title?: string,
    color?: string
  ): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor((color as ColorResolvable) || Colors.PURPLE)
      .setDescription(`${msg}`);

    if (title) embed.setTitle(title);

    return embed;
  }

  public static async updateReply(
    i: ChatInputCommandInteraction,
    embed: EmbedBuilder,
    rows?: ActionRowBuilder[]
  ) {
    let body = {
      embeds: [embed],
    };

    if (rows) body["components"] = rows;

    try {
      await i.editReply(body);
    } catch (err) {
      await Logger.logError(err);
    }
  }

  public static async sendInteraction(
    i: ChatInputCommandInteraction,
    embed: EmbedBuilder,
    rows?: ActionRowBuilder[]
  ) {
    let body = {
      embeds: [embed],
    };

    if (rows) body["components"] = rows;

    try {
      switch (true) {
        case i.replied:
          await i.followUp(body);
          break;
        case i.deferred:
          await i.editReply(body);
          break;
        default:
          await i.reply(body);
      }
    } catch (err) {
      await Logger.logError(err);
    }
  }
}
