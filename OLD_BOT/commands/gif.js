const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { TOKEN_TENOR } = require("../config");
const Tenor = require("tenorjs").client({
  Key: TOKEN_TENOR,
  Filter: "medium",
  Locale: "en_US",
  MediaFilter: "basic",
  DateFormat: "DD/MM/YYYY - H:mm:ss A",
});

module.exports = {
  desc: {
    desc: "Envoie des Gifs dans la catégorie de votre choix des différentes catégories proposées que vous pouvez choisir en entrant la commande !",
    emote: "📟",
    exemple: [
      {
        cmd: "/gif coffee",
        desc: "Envoie un gif de café.",
      },
      {
        cmd: "/gif zen",
        desc: "Envoie un gif zen.",
      },
    ],
    usage: "/gif [catégorie]",
  },
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Get a random gif from Giphy")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("Item you want to get a gif of")
        .setRequired(true)
        .addChoices(
          { name: "Coffee", value: "coffee" },
          { name: "Tea", value: "tea" },
          { name: "Gin Tonic", value: "gin" },
          { name: "Yeet", value: "yeeeeeeet" },
          { name: "Batte", value: "batte" },
          { name: "Zen", value: "zen" },
          { name: "Cat", value: "cat" }
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const search = interaction.options.getString("search");
    const gif = await Tenor.Search.Random(search, "1");
    let title, color, name;
    name = search;
    switch (search) {
      case "coffee":
        title = "☕ A nice warm coffee for you ☕";
        color = "#6f4e37";
        break;
      case "tea":
        title = "🍵 A nice warm tea for you 🍵";
        color = "#FF5733";
        break;
      case "gin":
        title = "🍸 A nice gin tonic for you 🍸";
        color = "#00870E";
        name = "Gin tonic";
        break;
      case "yeeeeeeet":
        title = "💥 YEEEEEEEEEEEEEEEEEEEEET 💥";
        color = "#E800FF";
        name = "YEET";
        break;
      case "batte":
        title = "💥 BATTE 💥";
        color = "#5B4720";
        name = "baseball bat";
        break;
      case "zen":
        title = "🌙 Stay calm, don't kill anyone ... (ofc go for it) 🌙";
        color = "#FF00E4";
        break;
      case "cat":
        title = "🐱 KAAAAAAT 🐱";
        color = "#F0F0F0";
    }
    let embed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color)
      .setImage(gif[0].media_formats.gif.url);

    interaction.reply({ embeds: [embed] });
  },
};
