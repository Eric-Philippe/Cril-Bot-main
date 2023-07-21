const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Retire la permission d'accéder au channel courant à un utilisateur cible",
    emote: "🔒",
    exemple: [
      {
        cmd: "/remove-perm @user",
        desc: "Empêche l'utilisateur cible d'accéder au channel courant",
      },
    ],
    usage: "/remove-perm <@user>",
  },
  data: new SlashCommandBuilder()
    .setName("remove-perm")
    .setDescription(
      "Retire la permission d'accéder au channel courant à un utilisateur cible"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("L'utilisateur cible")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const channel = interaction.channel;

    if (!member || !channel)
      return interaction.reply("Une erreur est survenue");

    try {
      await channel.permissionOverwrites.edit(member.id, {
        ViewChannel: false,
        SendMessages: true,
      });
      interaction.reply(
        `L'utilisateur ${user.username} ne peut plus accéder au channel ${channel.name}`
      );
    } catch (e) {}
  },
};
