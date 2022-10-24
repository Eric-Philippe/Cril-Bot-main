const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

const UsedCode = new Set();

const { YABLA_ENG, YABLA_SPA } = require("../res/yabla.json");

module.exports = {
  desc: {
    desc: "Envoie les codes Yabla lié au jour et à l'utilisation automatiquement. Rend le dernier code donné inutilisable pendant 1h. \nAjouter l'option 'esp' pour avoir les codes espagnols.",
    emote: "🔑",
    exemple: [
      {
        cmd: "yabla",
        desc: "Envoie les codes Yabla du jour en anglais.",
      },
      {
        cmd: "yabla esp @User",
        desc: "Envoie les codes Yabla du jour en espagnol à l'utilisateur User.",
      },
    ],
    usage: "yabla [Espagnol | Anglais (Anglais par défaut)] [@User]",
  },
  data: new SlashCommandBuilder()
    .setName("yabla")
    .setDescription("Envoie les codes Yabla lié au jour.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addStringOption((option) =>
      option
        .setName("codes_espagnol")
        .setDescription("Passer les codes yabla espagnoles")
        .setRequired(false)
        .addChoices(
          { name: "Espagnol", value: "SPA" },
          { name: "Anglais", value: "ENG" }
        )
    )
    .addUserOption((option) =>
      option.setName("utilisateur").setDescription("Utilisateur Cible.")
    )
    .setDMPermission(false),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let current_day = new Date().getDay();
    if (current_day === 0 || current_day === 6)
      return interaction.reply(
        "Les codes Yabla ne sont pas disponibles le week-end."
      );

    let user = interaction.options.getUser("utilisateur");
    let lang = interaction.options.getString("codes_espagnol");
    let YABLA_USED = lang === "SPA" ? YABLA_SPA : YABLA_ENG;

    let i = 0;

    for (const element of YABLA_USED) {
      let id = Object.getOwnPropertyNames(element)[0];
      // Check if the code is already used
      if (!UsedCode.has(id)) {
        let code = Object.values(element)[0][current_day - 1];
        let embed = new EmbedBuilder()
          .setTitle("Code Yabla")
          .addFields(
            {
              name: "Identifiant : ",
              value: id,
            },
            {
              name: "Mot de Passe : ",
              value: code,
            }
          )
          .setColor("#0061fc")
          .setFooter({ text: "Ce code est valide pendant 1h." });
        if (user)
          interaction.reply({ embeds: [embed], content: `<@${user.id}>` });
        else interaction.reply({ embeds: [embed] });
        UsedCode.add(id);
        setTimeout(() => {
          UsedCode.delete(id);
        }, 3600000);
        break;
      }
      i++;
      if (i === YABLA_USED.length) {
        return interaction.reply({
          content:
            "Tous les codes Yabla ont été utilisés, veuillez réessayer plus tard",
          ephemeral: true,
        });
      }
    }
  },
};
