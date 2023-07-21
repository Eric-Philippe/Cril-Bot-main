const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  desc: {
    desc: "Vous retourne un nombre aléatoire entre 1 et 6 par défaut. Changez le maximum en ajoutant un nombre en paramètre de la fonction !",
    emote: "🎲",
    exemple: [
      {
        cmd: "/dice",
        desc: "Vous retourne un nombre aléatoire entre 1 et 6 par défaut.",
      },
      {
        cmd: "/dice 88",
        desc: "Vous retourne un nombre aléatoire entre 1 et 88.",
      },
    ],
    usage: "/dice [max]",
  },
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Lancer un dé par défaut de 6 faces.")
    .addNumberOption((option) =>
      option.setName("faces").setDescription("Nombre maximum à tirer")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let option = interaction.options.getNumber("faces");
    let faces = option ? option : 6;
    let result = Math.floor(Math.random() * faces) + 1;
    let embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🎲 Lancé de dé 🎲")
      .setDescription(`🎰 | Vous avez tiré le : ${result} !`);

    interaction.reply({ embeds: [embed] });
  },
};
