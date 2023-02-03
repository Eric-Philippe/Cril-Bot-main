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
        cmd: "/kick @Boulet [Raison]",
        desc: "Vire Boulet du serveur. Envoyez une raison si vous le souhaitez.",
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
    )
    .addStringOption((option) =>
      option.setName("raison").setDescription("Raison du kick")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const raison = interaction.options.getString("raison");
    const member = interaction.guild.members.cache.get(user.id);

    // If the user is kickable
    if (member.kickable) {
      // Send a message to the channel
      if (raison) {
        let embed = new EmbedBuilder()
          .setTitle("Kick")
          .setDescription(raison)
          .setColor("Red");

        try {
          await user.send({ embeds: [embed] });
        } catch (err) {}
      }
      if (raison) {
        await interaction.reply(
          `L'utilisateur ${user.tag} a été kick pour ${raison} !`
        );
        await member.kick();
      } else {
        await interaction.reply(`L'utilisateur ${user.tag} a été kick !`);
        await member.kick();
      }

      // Kick the user
    } else {
      // If the user is not kickable
      await interaction.reply("Je ne peux pas kick cet utilisateur !");
    }
  },
};
