import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../models/Command";
import { GUILD_SUPPORT_C_ID } from "../../config/config.guild";

const INFO_COLOR = "#66c9ed";
const INFO_EMOTE = "ℹ️";

const info: Command = {
  description: "Envoie un message d'information selon la ressource demandée",

  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription(
      "Envoie un message d'information selon la ressource demandée"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("validation")
        .setDescription("Envoie les délais de validation.")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("check-activity")
        .setDescription("Demande quelle activité l'utilisateur est inscrit.")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("support")
        .setDescription("Envoie le lien vers le Support.")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    ),
  async run(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const userTarget = interaction.options.getUser("user");

    let desc;
    switch (subcommand) {
      case "validation":
        desc =
          "🕛 | La validation de votre activité ou coaching se fait au maximum 1 semaine suivant votre venue. \n\n✅ | Vous pouvez le vérifier sur [Récap & Planning sur Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/). \n\n 📮 | Si vous pensez qu’il y a une erreur de validation, contactez-nous sur cril.langues@iut-tlse3.fr ou <#1018802206536896532>.";

        break;
      case "check-activity":
        desc =
          "⚠️ | Bonjour, merci de vérifier le type, l’heure, le lieu et le niveau de votre réservation et vous présenter dans le channel adéquat – [RésaCRIL](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)";
        break;
      case "support":
        desc = `🕳️ | Merci de poser votre question dans le <#${GUILD_SUPPORT_C_ID}> et pas dans un channel au hasard..`;
        break;
    }

    const embed = new EmbedBuilder()
      .setColor(INFO_COLOR)
      .setDescription(desc)
      .setTitle(`${INFO_EMOTE} | Information`);

    const msgParams = {
      embeds: [embed],
    };

    if (userTarget) {
      msgParams["content"] = `<@${userTarget.id}>`;
      msgParams["allowedMentions"] = { parse: ["users"] };
    }

    await interaction.reply(msgParams);
  },
};

export default info;
