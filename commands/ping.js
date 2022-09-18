const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  desc: {
    desc: "PING-PONG ! Rien de plus simple ! (We don't do sports here :( )",
    emote: "🏓",
    exemple: [
      { cmd: "/ping", desc: '-"You really thought I would do sports ?"' },
    ],
    usage: "/ping",
  },
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Begin a hard game of ping-pong against the lazy laggy bot."
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.reply("Processing ...");
    // Wait 4 secondes
    setTimeout(() => {
      interaction.followUp({ content: "*plop*. I don't do sport anyway." });
    }, 4500);
  },
};
