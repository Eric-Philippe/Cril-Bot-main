const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Envoie un Embed (Cadre stylisé de Discord) avec tous les paramètres de vos choix !",
    emote: "🖼️",
    exemple: [
      {
        cmd: "/embed Red Salut Je suis un Description",
        desc: "Envoie un Embed rouge avec le titre Salut, la description Je suis un Description et aucune image.",
      },
    ],
    usage: "/embed [Couleur] [Titre] <Description> [Image] [Vignette]",
  },
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Créer un embed avec les paramètres de votre choix !")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MentionEveryone)
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description de l'embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("couleur")
        .setDescription("Couleur de l'embed")
        .addChoices(
          { name: "Red", value: "red" },
          { name: "Green", value: "green" },
          { name: "Blue", value: "blue" },
          { name: "Yellow", value: "yellow" },
          { name: "Orange", value: "orange" },
          { name: "Purple", value: "purple" },
          { name: "Pink", value: "pink" },
          { name: "Black", value: "black" },
          { name: "White", value: "white" },
          { name: "Grey", value: "grey" }
        )
    )
    .addStringOption((option) =>
      option.setName("titre").setDescription("Titre de l'embed")
    )
    .addAttachmentOption((option) =>
      option.setName("image").setDescription("Image de l'embed")
    )
    .addAttachmentOption((option) =>
      option.setName("thumbnail").setDescription("Image du thumbnail")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let embed = new EmbedBuilder();
    let option = interaction.options.getString("titre");
    if (option) embed.setTitle(option);
    option = interaction.options.getString("description");
    if (option) embed.setDescription(option);
    option = interaction.options.getAttachment("image");
    if (option) embed.setImage(option.url);
    option = interaction.options.getString("Thumbnail");
    if (option) embed.setThumbnail(option);
    option = interaction.options.getString("couleur");
    if (option) option = option.toLocaleLowerCase();
    switch (option) {
      case "red":
        embed.setColor("#ff0000");
        break;
      case "green":
        embed.setColor("#00ff00");
        break;
      case "blue":
        embed.setColor("#0000ff");
        break;
      case "yellow":
        embed.setColor("#ffff00");
        break;
      case "purple":
        embed.setColor("#ff00ff");
        break;
      case "orange":
        embed.setColor("#ffa500");
        break;
      case "pink":
        embed.setColor("#ffc0cb");
        break;
      case "grey":
        embed.setColor("#808080");
        break;
      case "black":
        embed.setColor("#000000");
        break;
      case "white":
        embed.setColor("#ffffff");
        break;
      default:
        embed.setColor("#ffffff");
    }
    try {
      interaction.channel.send({ embeds: [embed] });
      interaction.reply({ ephemeral: true, content: "Embed envoyé !" });
    } catch (e) {
      interaction.reply("Une erreur est survenue !");
    }
  },
};
