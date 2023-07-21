const { SlashCommandBuilder } = require("discord.js");

const HelpSystem = require("../helpSystem");

module.exports = {
  desc: {
    desc: "Help INCEPTION. \nAffiche les différentes commandes sous 3 catégories différentes en fonction des permissions, et vous offre des informations supplémentaire sur chaque commande à l'aide des différents boutons",
    emote: "🪞",
    exemple: [
      {
        cmd: "/help",
        desc: "Affiche la liste des commandes disponibles.",
      },
    ],
    usage: "/help",
  },
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display all my commands !"),
  async execute(interaction) {
    interaction.reply(
      "Cliquez sur le bouton ci-dessous pour afficher les commandes disponibles !"
    );
    new HelpSystem(interaction);
  },
};
