const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  User,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const { adminRole } = require("../config");

module.exports = {
  desc: {
    desc:
      "Message automatique réduit en une commande pour répondre à plusieurs cas de figure en vous offrant la possibilité de cibler, ou non, un utilisateur !" +
      "\n\n───── Liste des commandes ──────\n➣ late | participation | rules | validation | check-activity | support" +
      "\n\n───── Liste des sous commandes ────\n➣ Coaching ➪ deb-a-faire | deb-faite | fiche-comm \n\n➣ Sound ➪ initial | escalate \n\n➣ JoinChat ➪ tel | ordi \n\n➣ Link ➪ moodle | resacril | ressources",
    emote: "📨",
    exemple: [
      {
        cmd: "send coaching deb-a-faire @Boulet#2001",
        desc: "Envoie le message de coaching de début de parcours à l'utilisateur Boulet !",
      },
      {
        cmd: "send coaching support",
        desc: "Envoie un message de redirection vers le support !",
      },
    ],
    usage: "send [subCommand] <command> [@User]",
  },
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Envoie un message préformaté selon les valeurs choisies.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false)

    //  ####################################################################################
    /** ##################################### @COACHING #################################### */
    //  ####################################################################################
    .addSubcommandGroup((group) =>
      group
        .setName("coaching")
        .setDescription("Envoie un message de coaching")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("deb-a-faire")
            .setDescription("1. Début de parcours - Fiche.")
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("deb-faite")
            .setDescription("2. Début de parcours faite - Faite")
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("fiche-comm")
            .setDescription("3. Fiche commentée.")
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
    )

    //  ####################################################################################
    /** ##################################### @JOINCHAT #################################### */
    //  ####################################################################################
    .addSubcommandGroup((group) =>
      group
        .setName("join-chat")
        .setDescription("Help pour rejoindre le textuel d'un channel vocal")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("tel")
            .setDescription("Sur Support Téléphone")
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("Utilisateur cible.")
                .setRequired(true)
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("ordi")
            .setDescription("Sur Support Ordinateur")
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("Utilisateur cible.")
                .setRequired(true)
            )
        )
    )

    //  ###################################################################################
    /** ###################################### @LINK ####################################### */
    //  ###################################################################################
    .addSubcommandGroup((group) =>
      group
        .setName("link")
        .setDescription("Envoie le lien demandé")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("moodle")
            .setDescription("Envoie un lien vers Moodle.")
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("resacril")
            .setDescription("Envoie un lien vers RésaCRIL.")
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("ressources")
            .setDescription(
              "Envoie un lien vers les ressources utiles pour les coachings."
            )
            .addUserOption((option) =>
              option.setName("utilisateur").setDescription("Utilisateur cible.")
            )
        )
    )

    //  ####################################################################################
    /** ###################################### @SOUND ###################################### */
    //  ####################################################################################
    .addSubcommandGroup((group) =>
      group
        .setName("sound")
        .setDescription("Affiche un message lié aux problèmes de son.")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("initial")
            .setDescription("Affiche le PDF d'assistance son Discord.")
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("Utilisateur cible.")
                .setRequired(true)
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("escalate")
            .setDescription(
              "Demande à un étudiant de quitter la conversation suivant un problème de son."
            )
            .addUserOption((option) =>
              option
                .setName("utilisateur")
                .setDescription("Utilisateur cible.")
                .setRequired(true)
            )
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("late")
        .setDescription("Envoie un message quand un utilisateur est en retard.")
        .addUserOption((option) =>
          option
            .setName("utilisateur")
            .setDescription("Utilisateur cible.")
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("participation")
        .setDescription(
          "Envoie un message à un utilisateur pour le prévenir de participer"
        )
        .addUserOption((option) =>
          option
            .setName("utilisateur")
            .setDescription("Utilisateur cible.")
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("rules")
        .setDescription("Envoie un message avec les règles du serveur.")
        .addUserOption((option) =>
          option.setName("utilisateur").setDescription("Utilisateur cible.")
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("validation")
        .setDescription(
          "Envoie un message pour donner le délais moyen de validation."
        )
        .addUserOption((option) =>
          option.setName("utilisateur").setDescription("Utilisateur cible.")
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("check-activity")
        .setDescription(
          "Envoie un message demandant à l'utilisateur ce à quoi il est inscrit."
        )
        .addUserOption((option) =>
          option.setName("utilisateur").setDescription("Utilisateur cible.")
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("support")
        .setDescription("Renvoie l'utilisateur vers le channel support.")
        .addUserOption((option) =>
          option.setName("utilisateur").setDescription("Utilisateur cible.")
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let topCommand, subCommand;
    subCommand = interaction.options.getSubcommand();

    let user = interaction.options.getUser("utilisateur");

    if (interaction.options.getSubcommandGroup()) {
      topCommand = interaction.options.getSubcommandGroup();

      switch (topCommand) {
        case "coaching":
          coachingInteraction(interaction, subCommand, user);
          break;
        case "link":
          linkInteraction(interaction, subCommand, user);
          break;
        case "sound":
          soundInteraction(interaction, subCommand, user);
          break;
        case "join-chat":
          joinChatInteraction(interaction, subCommand, user);
          break;
      }
    } else {
      treatOtherSubcommand(interaction, subCommand, user);
    }
  },
};
/**
 *
 * @param {ChatInputCommandInteraction} i
 * @param {String} subCommand
 * @param {User | undefined} user
 */
const coachingInteraction = (i, subCommand, user) => {
  let desc = "";
  switch (subCommand) {
    case "deb-a-faire":
      desc = `🎓 | Le but du coaching est de travailler vos objectifs en langue sur toute autre compétence que l’expression orale. \nPour vous aider à définir cela, commencez par compléter la fiche début de parcours dans votre dossier Moodle CRIL. \nRevenez nous le dire ici quand vous avez terminé, ça devrait vous prendre environ 5 minutes. Lien vers moodle.`;
      break;
    case "deb-faite":
      desc = `🎓 | Vous pouvez ouvrir la fiche début de parcours que vous avez remplie. Dans le champ Conseil coachs nous vous avons donné des conseils de travail pour cette séance. Prenez-en connaissance et commencez à travailler.\n\n
      1️⃣ Les ressources mentionnées dans les conseils sont disponibles en cliquant sur le symbole épingle en haut de ce chat. La séance dure 1h. \n\n
      2️⃣ Vous devez remplir la fiche coaching 1 au fur et à mesure de la séance : cela fait partie de votre heure de travail, mais si vous n’avez pas le temps de terminer, vous pouvez enregistrer et la modifier plus tard. \n\n
      3️⃣ Si vous avez des questions, besoin d’aide ou d’identifiants, revenez vers nous, nous sommes là pour vous répondre`;
      break;
    case "fiche-comm":
      desc =
        "🎓 | Votre dernière fiche de coaching a été commentée avec un conseil, vous pouvez aller en prendre connaissance et continuer votre travail. Si vous avez besoin de plus de précisions, d'identifiants ou toute autre aide, revenez vers nous ! ";
      break;
  }

  let embed = new EmbedBuilder()
    .setTitle("Coaching")
    .setColor("DarkGreen")
    .setDescription(desc)
    .setFooter({ text: "cril.langues@iut-tlse3.fr" })
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1019303726965608448/Sans_titre.png"
    );

  if (!user) return i.reply({ embeds: [embed] });
  i.reply({ content: `<@${user.id}>`, embeds: [embed] });
};
/**
 *
 * @param {ChatInputCommandInteraction} i
 * @param {String} subCommand
 * @param {User | undefined} user
 */
const linkInteraction = (i, subCommand, user) => {
  let embed = new EmbedBuilder()
    .setFooter({
      text: "cril.langues@iut-tlse3.fr",
    })
    .setTitle("Lien");
  switch (subCommand) {
    case "moodle":
      embed
        .setColor("#FF8700")
        .setDescription(
          "Lien vers Moodle : \n💂 - [Moodle Pack ANGLAIS](https://moodle.iut-tlse3.fr/course/view.php?id=1833) \n💃 - [Moodle Pack ESPAGNOL](https://moodle.iut-tlse3.fr/course/view.php?id=2368)"
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/814908646138970122/1019323000417419304/Sans_titre.png"
        );
      break;
    case "resacril":
      embed
        .setColor("#C10000")
        .setDescription(
          "Lien vers Résacril : \n📖 - [RésaCRIL](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)"
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019322974286917762/resacril.png"
        );
      break;
    case "ressources":
      embed
        .setColor("#55FF00")
        .setDescription(
          "Le lien vers les ressources pour le coaching est épinglé en haut de ce channel. Vous pouvez aussi [cliquer ici]() pour y accéder "
        );
      break;
  }

  if (!user) return i.reply({ embeds: [embed] });
  i.reply({ content: `<@${user.id}>`, embeds: [embed] });
};
/**
 *
 * @param {ChatInputCommandInteraction} i
 * @param {String} subCommand
 * @param {User | undefined} user
 */
const soundInteraction = (i, subCommand, user) => {
  let embed = new EmbedBuilder()
    .setTitle("Problème de son")
    .setColor("DarkButNotBlack")
    .setFooter({ text: "cril.langues@iut-tlse3.fr" })
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1019306223247568906/Sans_titre.png"
    );

  switch (subCommand) {
    case "initial":
      embed.setDescription(
        "🔇 | Il semble que vous rencontrez des problèmes de son. Merci de suivre les étapes dans ce document pour les résoudre. Si les problèmes persistent et que vous ne pouvez pas participer, vous serez noté en ‘absent justifié’ pour cette séance."
      );
      const file = new AttachmentBuilder("./docs/Support_Vocal.pdf");
      i.reply({
        embeds: [embed],
        files: [file],
        content: `<@${user.id}> | <@&${adminRole}>`,
      });
      break;
    case "escalate":
      embed.setDescription(
        "🔇 | Nous ne pouvons pas valider votre activité si des problèmes de son vous empêchent de participer. Vous pouvez quitter la conversation, vous ne serez pas pénalisé. Merci de régler les problèmes de son d’ici votre prochaine séance à distance. Vous pouvez nous contacter sur <#1018802206536896532> ou par mail à cril.langues@iut-tlse3.fr pour demander de l’aide."
      );
      i.reply({ embeds: [embed], content: `<@${user.id}>` });
      break;
  }
};

const joinChatInteraction = (i, subCommand, user) => {
  let embed = new EmbedBuilder()
    .setTitle("Rejoindre la conversation")
    .setColor("DarkButNotBlack")
    .setFooter({ text: "cril.langues@iut-tlse3.fr" });

  switch (subCommand) {
    case "tel":
      embed
        .setDescription(
          "Rejoignez un salon textuel en cliquant sur le vocal en question puis en cliquant sur le bouton avec l'icône de message en haut à droite !"
        )
        .setImage(
          "https://media.discordapp.net/attachments/739553949199106158/1019688568756649984/Screenshot_20220914-211519_Discord.jpg?width=297&height=660"
        );
      break;
    case "ordi":
      embed
        .setDescription(
          "Rejoignez un salon textuel en faisant un clique droit sur le vocal sur lequel vous-vous trouvez et ainsi cliquer sur **__Ouvrir la discussion__**"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/814908646138970122/1019687214441042020/unknown.png"
        );
      break;
  }

  i.reply({ embeds: [embed], content: `<@${user.id}>` });
};

const treatOtherSubcommand = (i, subCommand, user) => {
  let myObj = {};
  let content = user ? `<@${user.id}>` : "";

  let embed = new EmbedBuilder().setFooter({
    text: "cril.langues@iut-tlse3.fr",
  });

  switch (subCommand) {
    case "check-activity":
      embed
        .setColor("DarkGrey")
        .setDescription(
          "⚠️ | Bonjour, merci de vérifier le type, l’heure, le lieu et le niveau de votre réservation et vous présenter dans le channel adéquat – [RésaCRIL](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)"
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/814908646138970122/1019335409962078269/GONE.png"
        );
      break;
    case "late":
      embed
        .setColor("Blurple")
        .setDescription(
          "⏰ | Bonjour, vous êtes trop en retard pour participer à l’activité, nous ne pouvons pas vous accepter. Vous serez noté en __**‘absent justifié'**__ pour cette séance. \n\n📧 | Contactez cril.langues@iut-tlse3.fr pour toute question"
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019335451737342032/blurp.png"
        );
      break;
    case "participation":
      embed
        .setColor("Red")
        .setDescription(
          "⛔ | Nous ne pouvons pas valider une activité interaction si vous ne parlez pas. \n\n🛠️ | Si vous rencontrez un problème technique, merci de nous le signaler immédiatement. \n\n😶‍🌫️ | Sans participation de votre part, la tutrice se réserve le droit de vous demander de partir."
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019335443340345424/bipilibibibilipi.png"
        );
      if (content.length == 0) content = `<@&${adminRole}>`;
      else content = content + ` | <@&${adminRole}>`;
      break;
    case "rules":
      embed
        .setColor("DarkNavy")
        .setTitle("Règles du serveur")
        .setImage(
          "https://cdn.discordapp.com/attachments/814908646138970122/1019336410760749096/unknown.png"
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019335418782695444/aled.png"
        );
      break;
    case "validation":
      embed
        .setColor("DarkGold")
        .setDescription(
          "🕛 | La validation de votre activité ou coaching se fait au maximum 1 semaine suivant votre venue. \n\n✅ | Vous pouvez le vérifier sur [Récap & Planning sur Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/). \n\n 📮 | Si vous pensez qu’il y a une erreur de validation, contactez-nous sur cril.langues@iut-tlse3.fr ou <#1018802206536896532>."
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019335436423925861/Zoubiwa.png"
        );
      break;
    case "support":
      embed
        .setColor("LuminousVividPink")
        .setDescription(
          "🕳️ | Merci de poser votre question dans le <#1018802206536896532> et pas dans un channel au hasard.."
        )
        .setThumbnail(
          "https://media.discordapp.net/attachments/814908646138970122/1019335424398872667/YEET.png"
        );
      break;
  }

  if (content) myObj.content = content;
  myObj.embeds = [embed];

  i.reply(myObj);
};
