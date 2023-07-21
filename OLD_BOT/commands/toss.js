const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");
const { startToss } = require("../commandsPlugin/tossPlugin");

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
    desc: "Créer un tirage au sort personnalisable avec un temps en heure demandé et minimum 2 choix ! La numéro correspondant à la bonne réponse doit également être rentrée !",
    emote: "🎰",
    exemple: [
      {
        cmd: "/tirage-au-sort Quel est la couleur du cheval blanc d'Henri IV ? 1 | Rouge | Blanc | Vert | Jaune | 2",
        desc: "Créer un tirage au sort pendant 1 heure avec les choix (Rouge | Blanc | Vert | Jaune) et la bonne réponse étant le choix 2 !",
      },
    ],
    usage:
      "/tirage-au-sort <question> <temps en heure> <choix1> | <choix2> | [choix3] | [choix4] | [choix5] | <bonne réponse>",
  },
  data: new SlashCommandBuilder()
    .setName("tirage-au-sort")
    .setDescription("Lance un tirage au Sort !")
    .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone)
    .addStringOption((option) =>
      option
        .setName("enonce")
        .setDescription("Enoncé du tirage au sort")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("temps")
        .setDescription("Temps en heure - Rappel : 1.5 = 1h30")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reponse-1")
        .setDescription("Première réponse au tirage.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reponse-2")
        .setDescription("Seconde réponse au tirage.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("good-answer")
        .setDescription("Réponse correcte parant de 1 à [Nombre de réponses]")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reponse-3").setDescription("Troième réponse au tirage.")
    )
    .addStringOption((option) =>
      option.setName("reponse-4").setDescription("Quatrième réponse au tirage.")
    )
    .addStringOption((option) =>
      option.setName("reponse-5").setDescription("Cinquième réponse au tirage.")
    )
    .addAttachmentOption((option) =>
      option.setName("image").setDescription("Image du tirage au sort")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setAuthor({ name: "🎱 Tirage au sort 🎱" })
      .setTitle("🎰 | " + interaction.options.getString("enonce"))
      .setColor("Red")
      .setFooter({ text: "Tirage au Sort" })
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/814908646138970122/1019551635388760115/OHNO.png"
      )
      .setDescription(
        "Tirage au sort en cours ! Cliquez sur le bouton correspondant à la réponse de votre choix !"
      );
    let row = new ActionRowBuilder();
    let answer;
    let votedUsers = [];
    for (let i = 0; i < 5; i++) {
      answer = interaction.options.getString(`reponse-${i + 1}`);
      if (!answer) break;
      embed.addFields({
        name: Emote_Numbers_Array[i],
        value: answer,
      });
      row.addComponents(
        new ButtonBuilder()
          .setEmoji(Emote_Numbers_Array[i])
          .setCustomId(String(i + "-toss-answer"))
          .setStyle(ButtonStyle.Secondary)
      );

      votedUsers.push([]);
    }

    interaction.channel
      .send({ embeds: [embed], components: [row] })
      .then((msg) => {
        msg.votedUsers = votedUsers;
        startToss(
          interaction.options.getNumber("temps"),
          interaction.channel,
          msg,
          interaction.options.getInteger("good-answer")
        );
      });

    interaction.reply("Tirage au sort lancé !");
  },
};
