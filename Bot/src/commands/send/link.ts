import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../models/Command";

const LINK_COLOR = "#0c215e";
const LINK_EMOTE = "🌐";

const link: Command = {
  description: "Envoie un lien vers la ressource demandée",

  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Envoie un lien vers la ressource demandée")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("moodle")
        .setDescription("Envoie un lien vers Moodle")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("resacril")
        .setDescription("Envoie un lien vers Resacril")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ressources")
        .setDescription("Envoie un lien vers les ressources")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
    ),
  async run(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const userTarget = interaction.options.getUser("user");

    let embed = new EmbedBuilder()
      .setFooter({
        text: "cril.langues@iut-tlse3.fr",
      })
      .setTitle(`${LINK_EMOTE} - Lien`)
      .setColor(LINK_COLOR);
    switch (subcommand) {
      case "moodle":
        embed
          .setDescription(
            "Lien vers Moodle : \n💂 - [Moodle Pack ANGLAIS](https://moodle.iut-tlse3.fr/course/view.php?id=1833) \n💃 - [Moodle Pack ESPAGNOL](https://moodle.iut-tlse3.fr/course/view.php?id=2368)"
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/814908646138970122/1019323000417419304/Sans_titre.png"
          );
        break;
      case "resacril":
        embed
          .setDescription(
            "Lien vers Résacril : \n📖 - [RésaCRIL](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)"
          )
          .setThumbnail(
            "https://media.discordapp.net/attachments/814908646138970122/1019322974286917762/resacril.png"
          );
        break;
      case "ressources":
        embed.setDescription(
          "Le lien vers les ressources pour le coaching est épinglé en haut de ce channel. Vous pouvez aussi [cliquer ici](https://view.genial.ly/62d6907e2a974b001115bf35/guide-ressources-coaching-cril) pour y accéder "
        );
        break;
    }

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

export default link;
