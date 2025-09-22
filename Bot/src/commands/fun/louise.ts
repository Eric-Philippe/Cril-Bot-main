import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../models/Command";
import { getRandInt } from "../../utils/Number";
import {
  strToBinaire,
  strToLeetCode,
  strToLouise,
  strToMorse,
  strToZorglang,
} from "../../utils/Converter";
import Messages from "../../middlewares/Messages/Messages";

const louise: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("louise")
    .setDescription("It works strangely ...")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("echo")
        .setDescription("Replies with your input!")
        .addStringOption((option) =>
          option
            .setName("input")
            .setDescription("The input to echo back")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("lang")
            .setDescription("The language to use")
            .addChoices(
              { name: "binaire", value: "BIN" },
              { name: "zorglang", value: "ZOR" },
              { name: "morse", value: "MOR" },
              { name: "louise_langue", value: "LOU" },
              { name: "l33t", value: "1337" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("calculator")
        .setDescription("Calculates stuff")
        .addNumberOption((option) =>
          option
            .setName("num1")
            .setDescription("The first number")
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName("operator")
            .setDescription("The operator")
            .setRequired(true)
            .addChoices(
              { name: "addition", value: "+" },
              { name: "soustraction", value: "-" },
              { name: "multiplication", value: "*" },
              { name: "division", value: "/" },
              { name: "modulo", value: "%" },
              { name: "exponentiation", value: "^" },
              { name: "racine carrée", value: "sqrt" }
            )
        )
        .addNumberOption((option) =>
          option
            .setName("num2")
            .setDescription("The second number")
            .setRequired(true)
            .setAutocomplete(true)
        )
    ) as SlashCommandBuilder,
  async autocomplete(interaction) {
    const possibleAnswers = [
      { name: "Math ? Wtf.", value: 0 },
      { name: "I don't know what you're talking about.", value: 1 },
      { name: "I'm not a calculator.", value: 2 },
      { name: "Please no", value: 3 },
      { name: "Fuck you", value: 4 },
      { name: "STOP IT.", value: 5 },
    ];
    const subcommand = interaction.options.getSubcommand();

    let choice = getRandInt(possibleAnswers.length - 1, 0);

    if (subcommand === "calculator") {
      interaction.respond([possibleAnswers[choice]]);
    }
  },
  async run(interaction) {
    let subcommand = interaction.options.getSubcommand();

    if (subcommand === "echo") {
      let input = interaction.options.getString("input");
      let talker = interaction.options.getString("lang");

      let result = input;
      switch (talker) {
        case "BIN":
          result = strToBinaire(input);
          break;
        case "ZOR":
          result = strToZorglang(input);
          break;
        case "MOR":
          result = strToMorse(input);
          break;
        case "LOU":
          result = strToLouise(input);
          break;
        case "1337":
          result = strToLeetCode(input);
          break;
      }

      Messages.sendInfo(interaction, result, "🗣️ | Echo !");
    }

    if (subcommand == "calculator") {
      let num1 = interaction.options.getNumber("num1");
      let num2 = interaction.options.getNumber("num2");
      let operator = interaction.options.getString("operator");

      let result;
      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        case "%":
          result = num1 % num2;
          break;
        case "^":
          result = num1 ** num2;
          break;
        case "sqrt":
          result = Math.sqrt(num1);
          break;
      }

      Messages.sendInfo(interaction, result.toString(), "🧮 | Calculator !");
    }
  },
};

export default louise;
