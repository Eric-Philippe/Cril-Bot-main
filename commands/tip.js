const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");

const TIPS_FILE = require("../crilTips.json");
const TIPS = TIPS_FILE.TIPS;

module.exports = {
  desc: {
    desc: "Tip manager for the tips displayed in the tips channel.",
    emote: "💡",
    exemple: [
      {
        cmd: "/tip add Pensez à utiliser les **slash commande**",
        desc: "Ajoute un nouveau tip dans la liste !",
      },
      { cmd: "/tip list", desc: "Affiche la liste des tips" },
      { cmd: "/tip remove 1", desc: "Supprime le tip numéro 1 de la liste" },
    ],
    usage: "/tip <add|remove|list> <tip>",
  },
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip manager for the tips displayed in the tips channel.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add a new tip to the list")
        .addStringOption((option) =>
          option
            .setName("tip")
            .setDescription("The tip to add")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a tip from the list")
        .addIntegerOption((option) =>
          option
            .setName("index-tip")
            .setDescription("The tip to remove")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("List all the tips")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let subCommand = interaction.options.getSubcommand();

    let embed = new EmbedBuilder().setColor("Blurple");

    switch (subCommand) {
      case "add":
        let tip = interaction.options.getString("tip");
        TIPS.push(tip);
        updateJsonFile();
        embed
          .setTitle("Tip ajouté !")
          .setDescription("✅ | Le tip a correctement été ajouté !");
        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
        break;
      case "remove":
        let index = interaction.options.getInteger("index-tip");
        if (index > TIPS.length) {
          interaction.reply({
            content: `Le numéro de tip est trop grand !`,
            ephemeral: true,
          });
        } else {
          TIPS.splice(index - 1, 1);
          updateJsonFile();
          embed
            .setTitle("Tip supprimé !")
            .setDescription("✅ | Le tip a correctement été supprimé !");
          interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }
        break;
      case "list":
        if (TIPS.length <= 0)
          interaction.reply(
            "La liste est vide ! Merci d'en rajouter avec la commande /tip add"
          );
        let list = "";
        let tip_text;
        for (let i = 0; i < TIPS.length; i++) {
          // Display the 20 first characters of the tip if the tip is longer than 20 characters
          tip_text =
            TIPS[i].length > 35 ? TIPS[i].substring(0, 35) + "..." : TIPS[i];
          list += `#${i + 1} - ${tip_text}\n`;
        }

        embed.setTitle("Liste des tips").setDescription(list);
        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
        break;
    }
  },
};

updateJsonFile = () => {
  fs.writeFileSync("crilTips.json", JSON.stringify(TIPS_FILE, null, 2));
};
