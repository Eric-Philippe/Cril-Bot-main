const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Vire un utilisateur du serveur.",
    emote: "🛑",
    exemple: [
      {
        cmd: "/deb-pas-faite @Boulet",
        desc: "Envoie un message refusant l'accès et retire les permissions dans le channel courant au bout de 5 minutes.",
      },
    ],
    usage: "/deb-pas-faite <@User>",
  },
  data: new SlashCommandBuilder()
    .setName("deb-pas-faite")
    .setDescription(
      "Envoie un message refusant l'accès et retire les permissions."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
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
    interaction.deferReply();
    const user = interaction.options.getUser("user");
    const embed = new EmbedBuilder()
      .setTitle("Fiche début de parcours pas faite !")
      .setColor("Red")
      .setDescription(
        `Bonjour, vous n'aviez pas rempli la fiche début de parcours la veille comme demandé dans le mail de confirmation et de rappel. \nJe ne peux pas vous accepter en coaching aujourd'hui, vous serez noté en excusé pour cette fois. \nSi vous avez rencontré un souci avec la fiche, merci de vous diriger vers le <#$1018802206536896532>`
      )
      .setFooter({ text: "Vous perdrez vos permissions dans 5 minutes." });

    interaction.channel.send({
      content: `<@${user.id}>`,
      embeds: [embed],
      allowedMentions: { users: [user.id] },
    });

    setTimeout(() => {
      interaction.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: false,
        SendMessages: false,
      });
    }, 5 * 60 * 1000);
  },
};
