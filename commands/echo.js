const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Envoie des messages en binaire !",
    emote: "🏓",
    exemple: [{ cmd: "/echo", desc: "00101110101011" }],
    usage: "/echo",
  },
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Envoie des messages en binaire !.")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Texte à convertir")
        .setRequired(true)
        .setMinLength(1)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const binary = text.split("").map((char) => char.charCodeAt(0).toString(2));
    await interaction.reply(binary.join(" "));
  },
};
