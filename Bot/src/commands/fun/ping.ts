import {
  ButtonInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { Command } from "../../models/Command";
import MCQ from "../../app/MCQ/MCQ";
import { GUILD_LOGS_C_ID } from "../../config/config.guild";
const QUESTIONS = require("../../app/MCQ/template.json").QUESTIONS;

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async run(interaction) {
    await interaction.reply("Pong!");

    const i = interaction as unknown as ButtonInteraction;
    const mcq = new MCQ(i, QUESTIONS, true);
    await mcq.launch();
    let channel = interaction.guild.channels.cache.get(
      GUILD_LOGS_C_ID
    ) as TextChannel;
    if (!channel) return;

    channel.send(mcq.buildMcqReport());
  },
};

export default ping;
