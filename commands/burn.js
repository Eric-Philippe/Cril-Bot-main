const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Détruit le CRIL.",
    emote: "🔥",
    exemple: [
      {
        cmd: "/burn",
        desc: "Détruit le CRIL.",
      },
    ],
    usage: "/burn",
  },
  data: new SlashCommandBuilder()
    .setName("burn")
    .setDescription("Détruit le CRIL.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    // Compte à rebours
    await interaction.reply("Début du compte à rebours");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Send a message to the channel
    await interaction.editReply("3");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await interaction.editReply("2");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await interaction.editReply("1");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await interaction.editReply("DESTRUCTION DU CIL IMMINENTE");

    // Destruction du CRIL
    await interaction.editReply("Destruction du CRIL en cours...");

    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 200));
    await interaction.followUp("🔥 🔥 🔥 🔥");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 200));
    await interaction.followUp("💥💥💥💥💥💥");
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 200));
    await interaction.followUp(
      "```bash \nAuto-Destruction du bot en cours...```"
    );
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 200));
    await interaction.followUp(
      "```bash \nAuto-Destruction du bot en cours... \npm2 stop & crash BotCril.exe```"
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    await interaction.followUp(
      "```bash \nAuto-Destruction du bot en cours... \npm2 stop & crash BotCril.exe \n delete files -all Cril/```"
    );
  },
};
