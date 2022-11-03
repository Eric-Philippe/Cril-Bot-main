const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  PermissionsBitField,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const Emote_Numbers_Array = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟",
];

module.exports = {
  desc: {
    desc: "Créer un sondage interactif avec 5 choix maximum, et si aucun choix n'est placé, met par défaut (Yes | No) !",
    emote: "🔮",
    exemple: [
      {
        cmd: "/poll Ca va ?",
        desc: "Créer un sondage avec les choix par défaut (Yes | No)",
      },
      {
        cmd: "/poll Ca va ? Oui | Non | Peut-être",
        desc: "Créer un sondage avec les choix (Oui | Non | Peut-être)",
      },
    ],
    usage:
      "/poll <question> <choix1> | <choix2> | <choix3> | <choix4> | <choix5>",
  },
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Start a new interactive poll !")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MentionEveryone)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("enonce")
        .setDescription("Enoncé du sondage")
        .setRequired(true)
        .setMaxLength(50)
    )
    .addStringOption((option) =>
      option.setName("answer1").setDescription("Réponse 1").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer2").setDescription("Réponse 2").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer3").setDescription("Réponse 3").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer4").setDescription("Réponse 4").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer5").setDescription("Réponse 5").setMaxLength(35)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const enonce = interaction.options.getString("enonce");
    let answers = [];
    let answer;
    for (let i = 1; i <= 5; i++) {
      answer = interaction.options.getString("answer" + i);
      if (!answer) break;
      answers.push(answer);
    }

    if (!answers.length) answers = ["Yes", "No"];

    let pollEmbed = new EmbedBuilder()
      .setTitle("📊 " + enonce)
      .setColor("Random")
      .setFooter({ text: `#️⃣ | Demandé par ${interaction.user.tag}` })
      .setAuthor({ name: "SONDAGE" });

    const row = new ActionRowBuilder();

    for (let i = 0; i < answers.length; i++) {
      pollEmbed.addFields({
        name: Emote_Numbers_Array[i] + " " + answers[i],
        value: "``" + "⬛⬛⬛⬛⬛⬛⬛⬛⬛" + "`` | 0.0% (0)",
      });
      row.addComponents(
        new ButtonBuilder()
          .setEmoji(Emote_Numbers_Array[i])
          .setStyle(ButtonStyle.Primary)
          .setCustomId(String(i + 1))
      );
    }

    interaction.channel
      .send({ embeds: [pollEmbed], components: [row] })
      .then((m) => {
        m.answers = [];
        for (let i = 0; i < answers.length; i++) {
          m.answers[i] = [];
        }
      });

    interaction.reply({
      content: "Sondage créé avec succès !",
      ephemeral: true,
    });
  },
};
