const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  desc: {
    desc: "Calculatrice qui parrait-il ne tomberait jamais juste.",
    emote: "🧮",
    exemple: [
      {
        cmd: "/calculator",
        desc: '-"You really thought I would do math ?"',
      },
    ],
    usage: "/calculator <A value> <operator> <B value>",
  },
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("THE Ultimate Calculator.")
    .addNumberOption((option) =>
      option.setName("a").setDescription("First value").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("operator")
        .setDescription("Operator")
        .setRequired(true)
        .addChoices(
          { name: "Addition", value: "+" },
          { name: "Substraction", value: "-" },
          { name: "Multiplication", value: "*" },
          { name: "Division", value: "/" },
          { name: "Square Root", value: "√" },
          { name: "Power", value: "^" },
          { name: "Power Two", value: "^2" }
        )
    )
    .addNumberOption((option) =>
      option.setName("b").setDescription("Second value").setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.reply("Processing ...");
    // wait 2 se
    // Wait 4 secondes
    setTimeout(async () => {
      await interaction.editReply("⚠️ Surchaufe du processeur ... 🌡️");
    }, 1500);
    setTimeout(async () => {
      await interaction.editReply("A̶̢͍͗̓͊L̶͍͒͑̂Ē̷̩̖̦̥̂̀̂́̌̆̀D̸̟͕̮̓̈̌̿͋̓̆̈ ̷̥͆͌̑͛͌̑̀͂̍͑͊͑̚͝S̶̮͈̱͍̣̆͒͂̒̔͑́́̾̚Ȕ̴̩̰̮̖̘͔̺̥́̂̆̑̿͘Ŗ̸̨̢̢̗̯̳͇̹̲͕̥̭͇͊̓̓̿̀̃͑̾̌̾͜͝͠C̵̨͈̙̻̠̳̣͍̰̪̖̚Ḩ̶̛̪̼̦̫͉̪̥̦͉̋̒͐͑̇Å̵̡̡̫͍̟̗̗͖̝͉̹͚̍̊̐͒̅̈̔̑͝͝Ų̵̖̮͔̥̱̓͒F̴̮̤͓͈̲͖̈F̷͖̺̺̠͎̒̽̈́ͅÈ̵͉̝͎̟̼̣̬̪̥̪̯͖̝̰͘͜");
    }, 3500);

    const a = interaction.options.getNumber("a");
    const b = interaction.options.getNumber("b");
    const operator = interaction.options.getString("operator");
    let result;
    switch (operator) {
      case "+":
        result = Math.random() * (Math.random() * 10);
        break;
      case "-":
        result = 89;
        break;
      case "*":
        result = Math.random() > 0.5 ? a * b + 69 : "I don't do math anyway.";
        break;
      case "/":
        result = "What if I divide by 0 ? BLACK HOLE OMG.";
        break;
      case "√":
        result = "🐌 Are we gardening ? 🌱";
        break;
      case "^":
        result = "UNLIMITED POWER";
        break;
      case "^2":
        result = "Remarkable identity ? I remember this from highschool ...";
        break;
    }

    setTimeout(() => {
      interaction.followUp({ content: `The result is ${result}` });
    }, 5000);
  },
};
