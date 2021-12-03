let Discord = require("discord.js");

let { SERVER, CHANNELS, IMG, EMOTE, IUT } = require("../../ressources.json");

module.exports = class embedFA {
  /**
   * Return the first embed
   *
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>} embed Temp
   */
  static async main_page(msg) {
    let embedMain = new Discord.MessageEmbed()

      .setTitle("D'abord, assurez-vous du nom de l'activité sur RésaCril")
      .setColor("DARK_GOLD")
      .addField("Résacril : ", `[Lien vers RésaCril](${IUT.RESACRIL_LINK})`)
      .setImage(IMG.ACTIVTY_NAME)
      .setThumbnail(IMG.CRIL_LOGO)
      .setDescription(
        `__° Assurez-vous de connaitre le nom de l'activité__ pour passer à la suite. \n ° Vous trouverez le nom sur [**__Résacril__**](${IUT.RESACRIL_LINK}), dans le menu __Recap. & Planning__. \n ° Assurez-vous de la même manière d'être bien en distanciel et non en présentiel !`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .setFooter(
        `Une fois votre activité retrouvée sur Résacril, merci de passer à la suite !`
      );

    return [embedMain, `✅`];
  }

  static async menu_activity(msg) {
    let embedMenu = new Discord.MessageEmbed()
      .setTitle("Merci de séléctionner l'activité que vous allez faire.")
      .setColor("DARK_GOLD")
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondant à l'activité que vous allez faire`
      )
      .addField(
        "Activité : ",
        "**[1]** : 🙋 - Discussion Libre \n **[2]** : 🦸 - Discussion à thème \n **[3]** : 🃏 - Cluedo ou jeu",
        true
      )
      .addField(
        "Activité : ",
        "**[4]** : 🎮 - Conférence ou Ask me Anything \n **[5]** : 🎓 - Coaching",
        true
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return [embedMenu, "🙋", "🦸", "🃏", "🎮", "🎓"];
  }

  static async fd_embed(msg) {
    let freeDisEmbed = new Discord.MessageEmbed()
      .setTitle(
        "Voici les channels correspondants à votre activité. Choissisez celui **__corespondant au niveau__** de cette dernière !"
      )
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_FD_EXEMPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur le lien de l'activité correspondante ! \n Afin d'accéder au vocal de l'activité, **__trouver le channel homonyme__** (qui a le même nom) que celui textuel sur votre gauche !`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🇬🇧 | Anglais : ",
        `[⭐ Débutant](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ANG[0])}) \n` +
          `[⭐⭐ Intérmédiaire](${vc_link(
            CHANNELS.ACTIVITIES_CHANNEL_ANG[1]
          )}) \n` +
          `[⭐⭐⭐ Avancé](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ANG[2])}) \n` +
          `[🙋 Tous niveaux 1](${vc_link(
            CHANNELS.ACTIVITIES_CHANNEL_ANG[3]
          )}) \n` +
          `[🙋 Tous niveaux 2](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ANG[4])})`,

        true
      )
      .addField(
        "🇪🇸 | Espagnol : ",
        `[⭐ Débutant](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ESP[0])}) \n` +
          `[⭐⭐ Intérmédiaire](${vc_link(
            CHANNELS.ACTIVITIES_CHANNEL_ESP[1]
          )}) \n` +
          `[⭐⭐⭐ Avancé](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ESP[2])}) \n` +
          `[🙋 Tous niveaux 1](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ESP[3])})`,

        true
      );
    return [freeDisEmbed, "❌"];
  }

  static async theme_discEmbed(msg) {
    let themeDiscEmbed = new Discord.MessageEmbed()
      .setTitle("Voici les channels correspondants à votre activité.")
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_TD_EXEMPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur le lien de l'activité correspondante ! \n Afin d'accéder au vocal de l'activité, **__trouver le channel homonyme__** (qui a le même nom) que celui textuel sur votre gauche !`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🇪🇸 | Espagnol : ",
        `[🦸 Thématique](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ESP[5])})`,
        true
      )
      .addField(
        "🇬🇧 | Anglais : ",
        `[🦸 Thématique](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ANG[5])})`,
        true
      );

    return [themeDiscEmbed, "❌"];
  }

  static async games_Embed(msg) {
    let gamesEmbed = new Discord.MessageEmbed()
      .setTitle("Voici les channels correspondants à votre activité.")
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_GAMES_EXEMPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur le lien de l'activité correspondante ! \n Afin d'accéder au vocal de l'activité, **__trouver le channel homonyme__** (qui a le même nom) que celui textuel sur votre gauche !`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🇪🇸 | Espagnol : ",
        `[🃏 Jeux](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ESP[6])})`,
        true
      )
      .addField(
        "🇬🇧 | Anglais : ",
        `[🃏 Jeux](${vc_link(CHANNELS.ACTIVITIES_CHANNEL_ANG[6])})`,
        true
      );

    return [gamesEmbed, "❌"];
  }

  static async stream_Embed(msg) {
    let streamEmbed = new Discord.MessageEmbed()
      .setTitle("Voici les channels correspondants à votre activité.")
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_STREAM_EXMEPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur le lien de l'activité correspondante ! \n Afin d'accéder au vocal de l'activité, **__trouver le channel homonyme__** (qui a le même nom) que celui textuel sur votre gauche !`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🇪🇸 | Espagnol : ",
        `[🎮 Conférences-Stream](${vc_link(
          CHANNELS.ACTIVITIES_CHANNEL_ESP[7]
        )})`,
        true
      )
      .addField(
        "🇬🇧 | Anglais : ",
        `[🎮 Conférences-Stream](${vc_link(
          CHANNELS.ACTIVITIES_CHANNEL_ANG[7]
        )})`,
        true
      );

    return [streamEmbed, "❌"];
  }

  static async coach_Embed(msg) {
    let coachEmbed = new Discord.MessageEmbed()
      .setTitle("Voici les channels correspondants à votre activité.")
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_COACH_EXEMPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur le lien de l'activité correspondante ! \n S'il s'agit de votre **__première séance__**, merci de séléctionner le channel correspondant ainsi que de vous assurer que votre [__fiche début de parcours__](${IUT.MOODLE_LINK}) est bien complétée. \n Assurez-vous également de lire les messages épinglés en haut à droite ! \n`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🥇 Première fois : ",
        `[🎓 Première Séance Coaching](${vc_link(
          CHANNELS.ACTIVITIES_CHANNEL_ESP[8]
        )})`,
        true
      )
      .addField(
        "📌 Habitué(e) : ",
        `[🎓 Guidage Coaching A](${vc_link(
          CHANNELS.ACTIVITIES_CHANNEL_ANG[9]
        )}) \n ` +
          `[🎓 Guidage Coaching B](${vc_link(
            CHANNELS.ACTIVITIES_CHANNEL_ANG[10]
          )}) \n `,
        true
      );

    return [coachEmbed, "❌"];
  }
};

/**
 * Return valid VoiceChat URL
 *
 * @param {String} id
 * @returns {String} link
 */
const vc_link = function (id) {
  return `https://discordapp.com/channels/${SERVER.ID}/${id}`;
};
