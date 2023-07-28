import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import { YABLA_ENG, YABLA_SPA } from "../../res/ContexteRessources";
import { Command } from "../../models/Command";

const UsedCode = new Set();

const yabla: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("yabla")
    .setDescription("Envoie les codes Yabla lié au jour.")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDMPermission(false)
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
  async run(interaction) {
    let currentDay = new Date().getDay();
    if (currentDay === 0 || currentDay === 6) {
      Messages.sendWarning(
        interaction,
        "Les codes Yabla ne sont pas disponibles le week-end."
      );
    }

    let user = interaction.options.getUser("utilisateur");
    let lang = interaction.options.getString("codes_espagnol");

    let YABLA_USED = lang === "SPA" ? YABLA_SPA : YABLA_ENG;

    let i = 0;

    for (const element of YABLA_USED) {
      let id = Object.getOwnPropertyNames(element)[0];

      if (!UsedCode.has(id)) {
        let code = Object.values(element)[0][currentDay - 1];
        const embed = new EmbedBuilder()
          .setTitle("🎧 - Code Yabla - ")
          .addFields(
            {
              name: "🔒 | Identifiant : ",
              value: id,
            },
            {
              name: "🔑 | Mot de Passe : ",
              value: code,
            }
          )
          .setColor("#0061fc")
          .setThumbnail(
            "https://media.discordapp.net/attachments/910200998339944479/1034155605537071124/learn-french-with-yabla.jpg"
          )
          .setFooter({ text: "Ce code est valide pendant 1h." });

        let content = user ? `<@${user.id}>` : null;
        Messages.sendInteraction(interaction, embed, null, content);

        UsedCode.add(id);

        setTimeout(() => {
          UsedCode.delete(id);
        }, 3600000);
        break;
      }
      i++;

      if (i === YABLA_USED.length) {
        Messages.sendWarning(
          interaction,
          "Tous les codes Yabla ont été utilisés, veuillez réessayer plus tard !"
        );
      }
    }
  },
};

export default yabla;
