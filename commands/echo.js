const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  ", ": "--..--",
  ".": ".-.-.-",
  "?": "..--..",
  "/": "-..-.",
  "-": "-....-",
  "(": "-.--.",
  ")": "-.--.-",
  " ": " ",
};

module.exports = {
  desc: {
    desc: "Envoie des messages convertis !",
    emote: "🖥️",
    exemple: [{ cmd: "/echo", desc: "00101110101011" }],
    usage: "/echo",
  },
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Envoie des messages convertis !.")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Texte à convertir")
        .setRequired(true)
        .setMinLength(1)
    )
    .addStringOption((option) =>
      option
        .setName("conversion")
        .setDescription("conversion choisie")
        .addChoices(
          { name: "binaire", value: "BIN" },
          { name: "zorglang", value: "ZOR" },
          { name: "morse", value: "MOR" },
          { name: "louise_langue", value: "LOU" }
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const conversion = interaction.options.getString("conversion");
    let res;
    switch (conversion) {
      case "BIN":
        res = text
          .split("")
          .map((char) => char.charCodeAt(0).toString(2))
          .join(" ");
        break;
      case "ZOR":
        res = text
          .split(" ")
          .map((word) => word.split("").reverse().join(""))
          .join(" ");
        break;
      case "MOR":
        res = text
          .split("")
          .map((char) => morseCode[char])
          .join(" ");

        break;
      case "LOU":
        // Each letter is the real one + 2
        res = text
          .split("")
          .map((char) => String.fromCharCode(char.charCodeAt(0) + 2))
          .join("");
        break;
      default:
        res = text;
    }

    await interaction.reply(res);
  },
};
