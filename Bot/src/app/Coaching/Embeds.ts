import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  InteractionReplyOptions,
  MessageCreateOptions,
} from "discord.js";
import { CHAN_SUPPORT } from "../../config/config.guild";
import { ButtonId } from "../../res/ButtonID";

const SUPPORT_CHANNEL_LINK = `https://discord.com/channels/688866481689329773/${CHAN_SUPPORT}`;
const GRADUATION_CAP_THUMBNAIL =
  "https://cdn.discordapp.com/attachments/814908646138970122/1019303726965608448/Sans_titre.png";

const SUPPORT_BUTTON = new ButtonBuilder()
  .setStyle(ButtonStyle.Link)
  .setLabel("Support")
  .setEmoji("📞")
  .setURL(SUPPORT_CHANNEL_LINK);

export default class EmbedsCoaching {
  static welcomeEmbed(): MessageCreateOptions {
    const embed = new EmbedBuilder()
      .setTitle("🎓 | Bienvenue en coaching !")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Bonjour !\n Vous avez réservé un coaching ?\n Vous êtes au bon endroit !\n Cliquez sur le bouton '**Commencer Coaching**' pour commencer. En cas de question ou problème, cliquez sur le bouton **📞 Support**"
      )
      .setColor("Purple")
      .setFooter({ text: "cril.langues@iut-tlse3.fr" });

    const row = new ActionRowBuilder<ButtonBuilder>();

    const start_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel("Commencer Coaching")
      .setEmoji("🎓")
      .setCustomId(`${ButtonId.COACHING}:start`);

    row.addComponents(start_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row] };
  }

  static coolDownEmbed(remainTimeStr: string): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("🕒 | Veuillez patienter")
      .setDescription(
        `Hey Slow Down !\n Vous avez déjà cliqué sur ce bouton il y a peu.\n Merci de **patienter** __${remainTimeStr}__ et recommencer !\n Si vous avez besoin d'aide rendez-vous dans le salon **📞 Support**`
      )
      .setImage(
        "https://media.tenor.com/Koztj63MPVsAAAAC/proceed-with-caution-stop-sign.gif"
      );

    const row = new ActionRowBuilder<ButtonBuilder>();
    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static coachingChoice(): InteractionReplyOptions {
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

    const firstRow = new ActionRowBuilder<ButtonBuilder>();
    const secondRow = new ActionRowBuilder<ButtonBuilder>();

    let ButtonFirst = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Premier Coaching")
      .setEmoji("🐤")
      .setCustomId(`${ButtonId.COACHING}:first`);

    let ButtonSecond = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Second Coaching")
      .setEmoji("🐔")
      .setCustomId(`${ButtonId.COACHING}:second`);

    let ButtonThird = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Troisième Coaching")
      .setEmoji("🦅")
      .setCustomId(`${ButtonId.COACHING}:third`);

    let ButtonPlus = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Plus de 3 coachings")
      .setEmoji("🛩️")
      .setCustomId(`${ButtonId.COACHING}:plus`);

    firstRow.addComponents(ButtonFirst, ButtonSecond);
    secondRow.addComponents(ButtonThird, ButtonPlus);

    return {
      embeds: [embed],
      components: [firstRow, secondRow],
      ephemeral: true,
    };
  }

  static verificationCoaching(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Réservation Introuvable")
      .setDescription(
        "Il semble que vous n'êtes pas sur la liste des coaching aujourd'hui.\n Merci de vérifier la **date** et l'**heure** de votre réservation sur [Résacril](http://resacril.iut-tlse3.fr/).\n\n Si vous êtes __**sûr**__ d'avoir un coaching maintenant, cliquez sur **OUI**. Si non, cliquez sur **NON**."
      )
      .setColor("Orange");

    const row = new ActionRowBuilder<ButtonBuilder>();

    const yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId(`${ButtonId.COACHING}:yes`);

    const no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId(`${ButtonId.COACHING}:no`);

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static debAFaireEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Fiche Début de parcours introuvable")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Nous n'avons pas trouvé votre fiche début de parcours remplie. \n\nIl est demandé dans le mail de confirmation et de rappel de remplir cette fiche la veille de votre coaching.\n Aviez-vous rempli cette fiche?\n - Si oui cliquez sur **OUI**.\n - Si non, cliquez sur **NON**.\n\n Attention, si vous cliquez sur oui alors que vous n'avez pas rempli cette fiche en avance (quelle qu'en soit la raison), les coachs __**ne vous accepteront pas**__ aujourd'hui et se réservent le droit de **__ne plus vous accepter__** en coaching à l'avenir.\n\n Pour parler a une responsable et expliquer un éventuel problème avec la fiche, merci de cliquer sur le bouton **SUPPORT**"
      )
      .setColor("DarkRed")
      .setFooter({
        text: "Vous avez 10 minutes MAX pour répondre à ce message !",
      });

    const row = new ActionRowBuilder<ButtonBuilder>();

    let yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId(`${ButtonId.COACHING}:yes`);

    let no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId(`${ButtonId.COACHING}:no`);

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static sorryEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("🚫 | Désolé ...")
      .setColor("Red")
      .setDescription(
        "Nous ne pouvons pas vous accepter. Merci de réserver une autre séance sur [Résacril](http://resacril.iut-tlse3.fr/) et d'écrire un mail à **__cril.langues@iut-tlse3.fr__**\n Cliquez sur le bouton Support pour parler directement à une responsable."
      );

    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static ficheAFaireEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("⁉️ | Dernière fiche coaching introuvable")
      .setThumbnail(GRADUATION_CAP_THUMBNAIL)
      .setDescription(
        "Nous n'avons pas trouvé votre dernière fiche de coaching.\n Vous deviez remplir cette fiche au fur et à mesure de votre séance.\n Aviez-vous rempli cette fiche?\n Si oui cliquez sur **OUI**. Si non, cliquez sur **NON**.\n Attention, si vous cliquez sur oui alors que vous n'avez pas rempli cette fiche en avance (quelle qu'en soit la raison), les coachs __**ne vous accepteront pas**__ aujourd'hui et se réservent le droit de **__ne plus vous accepter__** en coaching à l'avenir.\n Pour parler a une responsable et expliquer un éventuel problème avec la fiche, merci de cliquer sur le bouton **SUPPORT**"
      )
      .setColor("DarkRed");

    const row = new ActionRowBuilder<ButtonBuilder>();

    let yes_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setLabel("Oui")
      .setEmoji("✅")
      .setCustomId(`${ButtonId.COACHING}:yes`);

    let no_button = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Non")
      .setEmoji("❌")
      .setCustomId(`${ButtonId.COACHING}:no`);

    row.addComponents(yes_button, no_button, SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static channelUnlockedEmbedIn(channelId): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("🏁 | Channel débloqué !")
      .setDescription(
        `Parfait!\n Rendez-vous dans le channel <#${channelId}> et **__dites bonjour__**.`
      )
      .setColor("Green");

    return { embeds: [embed], ephemeral: true };
  }

  static channelUnlockedEmbedOut(userId): MessageCreateOptions {
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
      allowedMentions: { users: [userId] },
    };
  }

  static lateEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("Retard")
      .setDescription(
        "Vous êtes en retard de plus de 15 min pour votre coaching, nous ne pouvons pas vous accepter. Merci d'écrire à cril.langues@iut-tlse3.fr pour justifier votre absence. Cliquez sur le bouton Support pour parler à une Responsable."
      )
      .setFooter({
        text: "Vous êtes autorisé de maximum 15 minutes de retard !",
      })
      .setColor("LightGrey");

    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static earlyEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("🚫 | Désolé ...")
      .setColor("Red")
      .setDescription(
        "Bonjour, vous êtes très en avance pour votre coaching !\n Merci de vous présenter à nouveau à l'heure de votre réservation.\n Pour parler directement à une responsable, cliquez sur support."
      );

    const row = new ActionRowBuilder<ButtonBuilder>();
    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static errorEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("🤖 | Une erreur est survenue !")
      .setDescription(
        "Une erreur est survenue. Merci de contacter un Responsable à l'aide du support !"
      )
      .setColor("Red");

    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }

  static tryAgainEmbed(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
      .setTitle("⏰ | A bientôt !")
      .setDescription(
        "Merci de revenir le jour de votre réservation.\n Cliquez ici pour aller sur résacril et réserver. [lien vers résacril](http://resacril.iut-tlse3.fr/)"
      )
      .setColor("DarkOrange");

    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(SUPPORT_BUTTON);

    return { embeds: [embed], components: [row], ephemeral: true };
  }
}
