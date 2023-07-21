const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Affiche les informations utilisateurs de vous ou bien de la personne désirée !",
    emote: "🐱",
    exemple: [
      {
        cmd: "/userinfo",
        desc: "Affiche vos informations utilisateurs.",
      },
      {
        cmd: "/userinfo @user",
        desc: "Affiche les informations utilisateurs de la personne mentionnée.",
      },
    ],
    usage: "/userinfo [@User]",
  },
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription(
      "Affiche les informations sur ton propre compte ou bien un autre utilisateur."
    )
    .addUserOption((option) =>
      option.setName("utilisateur").setDescription("Utilisateur Cible")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let option = interaction.options.getUser("utilisateur");
    let user = option ? option : interaction.user;
    let member = interaction.guild.members.cache.get(user.id);

    let embed = new EmbedBuilder()
      .setColor(member.displayColor)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setThumbnail(user.displayAvatarURL({ format: "png", size: 512 }))
      .addFields(
        {
          name: "ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Créé le",
          value: user.createdAt.toLocaleString(),
          inline: true,
        },
        {
          name: "Rôle",
          value: member.roles.cache.map((role) => role.name).join(", "),
          inline: true,
        },
        {
          name: "Statut",
          value: member.presence.status,
          inline: true,
        },
        {
          name: "Joue à",
          value: member.presence.game ? member.presence.game.name : "Aucun jeu",
          inline: true,
        }
      )
      .setFooter({
        text: `${interaction.guild.name}`,
        icon: interaction.guild.iconURL({ format: "png", size: 512 }),
      })
      .setTimestamp()
      .setAuthor({
        name: `Demandé par ${interaction.user.username}#${interaction.user.discriminator}`,
        icon: interaction.user.displayAvatarURL({ format: "png", size: 512 }),
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
