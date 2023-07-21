const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  desc: {
    desc: "Affiche depuis combien de temps le bot est en ligne",
    emote: "🕒",
    exemple: [
      {
        cmd: "/uptime",
        desc: "Affiche le temps d'activité du bot",
      },
    ],
    usage: "/uptime",
  },
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Affiche le temps d'activité du bot !")
    .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone),
  async execute(interaction) {
    const uptime = interaction.client.uptime;
    const days = Math.floor(uptime / 86400000);
    const hours = Math.floor(uptime / 3600000) % 24;
    const minutes = Math.floor(uptime / 60000) % 60;
    const seconds = Math.floor(uptime / 1000) % 60;

    await interaction.reply(
      `Le bot est en ligne depuis ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes !`
    );
  },
};
