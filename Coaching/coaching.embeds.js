const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");

const SUPPORT_CHANNEL_LINK =
  "https://discord.com/channels/688866481689329773/1018802206536896532";
const GRADUATION_CAP_THUMBNAIL =
  "https://cdn.discordapp.com/attachments/814908646138970122/1019303726965608448/Sans_titre.png";

const SUPPORT_BUTTON = new ButtonBuilder()
  .setStyle(ButtonStyle.Link)
  .setLabel("Support")
  .setEmoji("📞")
  .setURL(SUPPORT_CHANNEL_LINK);

module.exports = {
  welcomeEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("🎓 | Bienvenue en coaching !")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Bonjour !\n Vous avez réservé un coaching ?\n Vous êtes au bon endroit !\n Cliquez sur le bouton '**Commencer Coaching**' pour commencer. En cas de question ou problème, cliquez sur le bouton **📞 Support**"
      )
      .setColor("Purple")
      .setFooter({ text: "cril.langues@iut-tlse3.fr" });

    const row = new ActionRowBuilder();

    const start_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel("Commencer Coaching")
      .setEmoji("🎓")
      .setCustomId("coaching:start");

    row.addComponents(start_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  coolDownEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("🕒 | Veuillez patienter")
      .setDescription(
        "Hey Slow Down !\n Vous avez déjà cliqué sur ce bouton il y a peu.\n Si vous avez besoin d'aide rendez-vous dans le salon **📞 Support**"
      )
      .setImage(
        "https://tenor.com/view/proceed-with-caution-stop-sign-slow-resume-flagger-gif-25547481"
      );

    const row = new ActionRowBuilder();
    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  coachingChoice: () => {
    const embed = new EmbedBuilder()
      .setTitle("🪶 | De quelle séance de coaching s'agit-il ?")
      .addFields(
        {
          name: "🐤 | 1ere séance",
          value: "Première séance de coaching",
        },
        {
          name: "🐔 | 2ème séance 2",
          value: "Deuxième séance de coaching",
        },
        {
          name: "🦅 | 3ème séance",
          value: "Troisième séance de coaching",
        },
        {
          name: "🛩️ | 4ème séance ou plus",
          value: "Quatrième séance de coaching ou plus",
        }
      )
      .setFooter({
        text: "🖱️ | Cliquez sur le bouton correspondant à votre séance de coaching",
      })
      .setColor("Aqua");

    const firstRow = new ActionRowBuilder();
    const secondRow = new ActionRowBuilder();

    let ButtonFirst = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Premier Coaching")
      .setEmoji("🐤")
      .setCustomId("coaching:first");

    let ButtonSecond = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Second Coaching")
      .setEmoji("🐔")
      .setCustomId("coaching:second");

    let ButtonThird = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Troisième Coaching")
      .setEmoji("🦅")
      .setCustomId("coaching:third");

    let ButtonPlus = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Plus de 3 coachings")
      .setEmoji("🛩️")
      .setCustomId("coaching:plus");

    firstRow.addComponents(ButtonFirst, ButtonSecond);
    secondRow.addComponents(ButtonThird, ButtonPlus);

    return {
      embeds: [embed],
      components: [firstRow, secondRow],
      ephemeral: true,
    };
  },

  verificationCoaching: () => {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Réservation Introuvable")
      .setDescription(
        "Il semble que vous n'êtes pas sur la liste des coaching aujourd'hui.\n Merci de vérifier la **date** et l'**heure** de votre réservation sur [Résacril](http://resacril.iut-tlse3.fr/).\n\n Si vous êtes __**sûr**__ d'avoir un coaching maintenant, cliquez sur **OUI**. Si non, cliquez sur **NON**."
      )
      .setColor("Orange");

    const row = new ActionRowBuilder();

    const yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId("coaching:yes");

    const no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId("coaching:no");

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  debAFaireEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Fiche Début de parcours introuvable")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Nous n'avons pas trouvé votre fiche début de parcours remplie.\n Il est demandé dans le mail de confirmation et de rappel de remplir cette fiche la veille de votre coaching.\n Aviez-vous rempli cette fiche? Si oui cliquez sur **OUI**. Si non, cliquez sur **NON**."
      )
      .setColor("DarkRed");

    const row = new ActionRowBuilder();

    let yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId("coaching:yes");

    let no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId("coaching:no");

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  sorryEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("🚫 | Désolé ...")
      .setColor("Red")
      .setDescription(
        "Nous ne pouvons pas vous accepter. Merci de réserver une autre séance sur [Résacril](http://resacril.iut-tlse3.fr/) et d'écrire un mail à **__cril.langues@iut-tlse3.fr__**\n Cliquez sur le bouton Support pour parler directement à une responsable."
      );

    const row = new ActionRowBuilder();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  ficheAFaireEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Dernière fiche coaching introuvable")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Nous n'avons pas trouvé votre dernière fiche de coaching.\n Vous deviez remplir cette fiche au fur et à mesure de votre séance.\n Aviez-vous rempli cette fiche?\n Si oui cliquez sur **OUI**. Si non, cliquez sur **NON**."
      )
      .setColor("DarkRed");

    const row = new ActionRowBuilder();

    let yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId("coaching:yes");

    let no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId("coaching:no");

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  channelUnlockedEmbedIn: (channelId) => {
    const embed = new EmbedBuilder()
      .setTitle("🏁 | Channel débloqué !")
      .setDescription(
        `Parfait!\n Rendez-vous dans le channel <#${channelId}> et **__dites bonjour__**.`
      )
      .setColor("Green");

    return { embeds: [embed], ephemeral: true };
  },

  channelUnlockedEmbedOut: (userId) => {
    const embed = new EmbedBuilder()
      .setTitle("🎓 | Channel débloqué !")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        `Bienvenue dans le channel de guidage.\n
        Commencez par dire **bonjour**, une de nos coach vous répondra. 
        `
      )
      .setColor("Green");

    return {
      content: `<@${userId}>`,
      embeds: [embed],
      ephemeral: true,
      allowedMentions: { users: [userId] },
    };
  },

  lateEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("Retard")
      .setDescription(
        "Vous êtes en retard de plus de 15 min pour votre coaching, nous ne pouvons pas vous accepter. Merci d'écrire à cril.langues@iut-tlse3.fr pour justifier votre absence. Cliquez sur le bouton Support pour parler à une Responsable."
      )
      .setFooter({
        text: "Vous êtes autorisé de maximum 15 minutes de retard !",
      })
      .setColor("LightGrey");

    const row = new ActionRowBuilder();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  errorEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("🤖 | Une erreur est survenue !")
      .setDescription(
        "Une erreur est survenue. Merci de contacter un Responsable à l'aide du support !"
      )
      .setColor("Red");

    const row = new ActionRowBuilder();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },

  tryAgainEmbed: () => {
    const embed = new EmbedBuilder()
      .setTitle("⏰ | A bientôt !")
      .setDescription(
        "Merci de revenir le jour de votre réservation.\n Cliquez ici pour aller sur résacril et réserver. [lien vers résacril](http://resacril.iut-tlse3.fr/)"
      )
      .setColor("DarkOrange");

    const row = new ActionRowBuilder();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  },
};
