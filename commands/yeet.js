const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Déconnecte et Mute un utilisateur et l'empêche de revenir le temps de 20 minutes !",
    emote: "🔇",
    exemple: [
      {
        cmd: "/yeet @Boulet",
        desc: "Déconnecte et mute Boulet pendant 20 minutes.",
      },
    ],
    usage: "/yeet [@User]",
  },
  data: new SlashCommandBuilder()
    .setName("yeet")
    .setDescription("Déconnecte et Mute un utilisateur pour 20 minutes.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MentionEveryone)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Utilisateur à déconnecter et mute")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let ID_ROLE = "1037676335046332426";
    let ID_ETU_ROLE = "727554276267786300";
    let ADMIN_ROLE_ID = "688866979460939776";
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const yeetRole = interaction.guild.roles.cache.find(
      (role) => role.id === ID_ROLE
    );
    const etuRole = interaction.guild.roles.cache.find(
      (role) => role.id === ID_ETU_ROLE
    );
    // If the user is already muted, return
    if (member.roles.cache.has(yeetRole.id)) {
      return interaction.reply("L'utilisateur est déjà mute !");
    } else {
      // If the user is not muted, mute them
      await member.roles.add(yeetRole);
      await member.roles.remove(etuRole);
    }
    let voiceKicked = false;
    // If the user is in the voice channel
    if (member.voice.channel) {
      // Try to disconnect the user
      try {
        await member.voice.setChannel(null);
        voiceKicked = true;
      } catch (err) {
        console.log(err);
      }
    }
    let finalTxt = "L'utilisateur a correctement été mute !";
    if (voiceKicked) {
      finalTxt += " Il a également été déconnecté du salon vocal.";
    }
    let embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("💣💥 YEET 💥💣")
      .setDescription(finalTxt)
      .setFooter({ text: "20 minutes de silence !" })
      .setAuthor({
        name: `Asked by ${interaction.user.username}`,
        iconURL: interaction.user.avatarURL(),
      });

    try {
      user.send({
        content:
          "Comme prévenu précédemment, nous vous faisons quitter la conversation car nous ne pouvons pas valider votre activité si vous ne parlez pas. Pour toute question, contactez-nous par mail à cril.langues@iut-tlse3.fr",
      });
    } catch (err) {}
    // Ping the admin role
    await interaction.reply({
      embeds: [embed],
      content: `<@&${ADMIN_ROLE_ID}>`,
    });

    // Unmute the user after 20 minutes
    setTimeout(() => {
      member.roles.remove(yeetRole);
      member.roles.add(etuRole);
    }, 1200000);
  },
};
