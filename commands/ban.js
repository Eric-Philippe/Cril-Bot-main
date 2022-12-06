const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Vire un utilisateur du serveur.",
    emote: "🔨",
    exemple: [
      {
        cmd: "/ban @Boulet",
        desc: "Vire Boulet du serveur.",
      },
    ],
    usage: "/ban <@User>",
  },
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Vire un utilisateur du serveur.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Utilisateur à virer")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    // If the user is banable
    if (member.banable) {
      // ban the user
      await member.ban();
      // Send a message to the channel
      await interaction.reply(`L'utilisateur ${user.tag} a été ban !`);
    } else {
      // If the user is not banable
      await interaction.reply("Je ne peux pas ban cet utilisateur !");
    }
  },
};
