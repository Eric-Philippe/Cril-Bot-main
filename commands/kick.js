const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Vire un utilisateur du serveur.",
    emote: "💥",
    exemple: [
      {
        cmd: "/kick @Boulet",
        desc: "Vire Boulet du serveur.",
      },
    ],
    usage: "/kick <@User>",
  },
  data: new SlashCommandBuilder()
    .setName("kick")
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

    // If the user is kickable
    if (member.kickable) {
      // Kick the user
      await member.kick();
      // Send a message to the channel
      await interaction.reply(`L'utilisateur ${user.tag} a été kick !`);
    } else {
      // If the user is not kickable
      await interaction.reply("Je ne peux pas kick cet utilisateur !");
    }
  },
};
