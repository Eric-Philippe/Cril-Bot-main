const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const fs = require("fs");

const { placeChannel } = require("../config");
const CrilPlace = require("../CrilPlace/CrilPlace");

const Memory = require("../CrilPlace/Memory.json").$;

const COLORS = require("../CrilPlace/ColorEnum").COLOR;

module.exports = {
  desc: {
    desc: "Ajoute un pixel à la grille.",
    emote: "🟥",
    exemple: [
      {
        cmd: "/pixel 0 0 RED",
        desc: "Ajoute un pixel rouge aux coordonnées 0 0 ",
      },
    ],
    usage: "/ping <x> <y> <color>",
  },
  data: new SlashCommandBuilder()
    .setName("pixel")
    .setDescription("Ajoute un pixel à la grille.")
    .addIntegerOption((option) =>
      option
        .setName("x")
        .setDescription("Coordonnée x du pixel")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("y")
        .setDescription("Coordonnée y du pixel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Couleur du pixel")
        .setRequired(true)
        .addChoices(
          { name: "Rouge", value: "RED" },
          { name: "Vert", value: "GREEN" },
          { name: "Bleu", value: "BLUE" },
          { name: "Violet", value: "PURPLE" },
          { name: "Rose", value: "PINK" },
          { name: "Noir", value: "BLACK" },
          { name: "Blanc", value: "WHITE" },
          { name: "Orange", value: "ORANGE" },
          { name: "Gris", value: "GREY" },
          { name: "Bleu foncé", value: "DARK_BLUE" },
          { name: "Vert foncé", value: "DARK_GREEN" },
          { name: "Jaune", value: "YELLOW" },
          { name: "Marron", value: "BROWN" },
          { name: "Lila", value: "LILA" }
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const x = interaction.options.getInteger("x");
    const y = interaction.options.getInteger("y");
    const color = interaction.options.getString("color");

    if (x < 0 || x > 14 || y < 0 || y > 14) {
      interaction.reply({
        content: "Les coordonnées doivent être comprises entre 0 et 14.",
        ephemeral: true,
      });
      return;
    }

    Memory[x][y] = COLORS[color];

    fs.writeFileSync(
      "./CrilPlace/Memory.json",
      JSON.stringify({ $: Memory }, null, 2)
    );

    let channelCrilPlace = interaction.client.channels.cache.get(placeChannel);
    // Get the second message sent in the channel
    let messages = await channelCrilPlace.messages.fetch({ limit: 100 });
    // Get the before last message
    let msgSortedCollection = messages.sort(
      (a, b) => b.createdTimestamp - a.createdTimestamp
    );

    let msgSortedArray = [...msgSortedCollection.values()];
    // Take the second message sent in the channel
    let message = msgSortedArray[1];

    CrilPlace.updateCanvas(message, x, y, COLORS[color]);

    interaction.reply({
      content: `Le pixel en ${x} ${y} a été ajouté avec la couleur ${color}.`,
      ephemeral: true,
    });

    console.log(
      `L'utilisateur ${interaction.user.username} avec l'identifiant ${interaction.user.id} a ajouté un pixel ${color} en ${x}, ${y}.`
    );
  },
};
