import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { Command } from "../../models/Command";
import { CHAN_SUPPORT } from "../../config/config.guild";

const COACHING_COLOR = "#e0821d";
const COACHING_EMOTE = "🎓";

const coaching: Command = {
  description: "Alias des commandes de coaching",

  data: new SlashCommandBuilder()
    .setName("coaching")
    .setDescription("Alias des commandes de coaching")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("deb-pas-faite")
        .setDescription("Utilisateur n'ayant pas fait la fiche de début")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Utilisateur n'ayant pas fait la fiche de début")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("deb-comm")
        .setDescription("Envoie message début de parcours commenté")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("fiche-comm")
        .setDescription("Envoie message dernière fiche Moodle commentée")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    ),
  async run(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const userTarget = interaction.options.getUser("user");

    let desc;
    let footer = "Coaching - Cril";

    switch (subcommand) {
      case "deb-pas-faite":
        desc = `🛑 | Bonjour, vous n'aviez pas rempli la fiche début de parcours la veille comme demandé dans le mail de confirmation et de rappel. \n\nJe ne peux pas vous accepter en coaching aujourd'hui, vous serez noté en excusé pour cette fois. \nSi vous avez rencontré un souci avec la fiche, merci de vous diriger vers le <#${CHAN_SUPPORT}>`;
        footer = "Vous perdrez vos permissions dans 5 minutes.";
        break;
      case "deb-comm":
        desc = `🎓 | Vous pouvez ouvrir la fiche début de parcours que vous avez remplie. Dans le champ Conseil coachs nous vous avons donné des conseils de travail pour cette séance. Prenez-en connaissance et commencez à travailler.\n\n
        1️⃣ Les ressources mentionnées dans les conseils sont disponibles en cliquant sur le symbole épingle en haut de ce chat. La séance dure 1h. \n\n
        2️⃣ Vous devez remplir la fiche coaching 1 au fur et à mesure de la séance : cela fait partie de votre heure de travail, mais si vous n’avez pas le temps de terminer, vous pouvez enregistrer et la modifier plus tard. \n\n
        3️⃣ Si vous avez des questions, besoin d’aide ou d’identifiants, revenez vers nous, nous sommes là pour vous répondre`;
        break;
      case "fiche-comm":
        desc =
          "🎓 | Votre dernière fiche de coaching a été commentée avec un conseil, vous pouvez aller en prendre connaissance et continuer votre travail. \nPour rappel, vous trouverez le lien vers le catalogue des ressources épinglé en haut de ce chat. \nSi vous avez besoin de plus de précisions, d'identifiants ou toute autre aide, revenez vers nous !";
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${COACHING_EMOTE} Coaching - Cril`)
      .setColor(COACHING_COLOR)
      .setDescription(desc)
      .setFooter({ text: footer });

    const msgParams = {
      embeds: [embed],
    };

    if (userTarget) {
      msgParams["content"] = `<@${userTarget.id}>`;
      msgParams["allowedMentions"] = { parse: ["users"] };
    }

    await interaction.reply(msgParams);

    if (subcommand == "deb-pas-faite") {
      setTimeout(() => {
        const channel = interaction.channel as TextChannel;
        channel.permissionOverwrites.delete(userTarget.id);
      }, 5 * 60 * 1000);
    }
  },
};

export default coaching;
