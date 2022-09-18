const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Obtenez l'avatar d'un utilisateur mentionné, si aucun utilisateur n'est spécifié, vous obtiendrez votre propre avatar.",
    emote: "📸",
    exemple: [
      { cmd: "/avatar", desc: "Recevez votre propre avatar." },
      {
        cmd: "/avatar @Louise#8903",
        desc: "Affiche l'avatar de l'utilisateur Louise",
      },
    ],
    usage: "/avatar [@User]",
  },
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Affiche votre avatar ou celui de la personne mentionnée !")
    .addUserOption((option) =>
      option.setName("utilisateur").setDescription("Utilisateur Cible")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let option = interaction.options.getUser("utilisateur");
    let user = option ? option : interaction.user;

    let embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setColor("Random")
      .setFooter({ text: `Demandé par ${interaction.user.username}` })
      .setImage(user.displayAvatarURL());

    interaction.reply({ embeds: [embed] });
  },
};
