const Discord = require("discord.js");

let { SERVER, CHANNELS, IMG, EMOTE, IUT } = require("../../ressources.json");
const ACA = CHANNELS.ACTIVITIES_CHANNELS_ANG;
const ACE = CHANNELS.ACTIVITIES_CHANNELS_ESP;

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

  /**
   *  Return the menu activity with all the reaction needed
   *
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, string>} Private Template
   */
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

  /**
   * Return the free activities Embed
   *
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String} Private Template
   */
  static async fd_embed(msg) {
    let freeDisEmbed = new Discord.MessageEmbed()
      .setTitle(
        "Voici les channels correspondants à votre activité. Choissisez celui **__corespondant au niveau__** de cette dernière !"
      )
      .setColor("DARK_GOLD")
      .setImage(IMG.CHANNEL_FD_EXEMPLE)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Cliquez sur la partie en __surbrillance bleue__ avec **l'icone '#'** pour accéder au channel désiré \n  Cliquez sur la partie en __surbrillance bleue__ avec **l'icone '🔊'** pour accéder au channel vocal désiré`
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL())
      .addField(
        "🇬🇧 | Anglais : ",
        `\n **[⭐ Débutant]** : \n <#${ACA.FREE_BEG[0]}> \n <#${ACA.FREE_BEG[1]}> \n\n` +
          `**[⭐⭐ Intérmédiaire]** : \n <#${ACA.FREE_INT[0]}> \n <#${ACA.FREE_INT[1]}> \n\n` +
          `**[⭐⭐⭐ Avancé]** : \n <#${ACA.FREE_HARD[0]}> \n <#${ACA.FREE_HARD[1]}> \n\n` +
          `**[🙋 Tous niveaux 1]** : \n <#${ACA.FREE_ALL1[0]}> \n <#${ACA.FREE_ALL1[1]}> \n\n` +
          `**[🙋 Tous niveaux 2]** : \n <#${ACA.FREE_ALL2[0]}> \n <#${ACA.FREE_ALL2[1]}> \n\n`,

        true
      )
      .addField(
        "🇪🇸 | Espagnol : ",
        `\n **[⭐ Débutant]** : \n <#${ACE.FREE_BEG[0]}> \n <#${ACE.FREE_BEG[1]}> \n\n` +
          `**[⭐⭐ Intérmédiaire]** : \n <#${ACE.FREE_INT[0]}> \n <#${ACE.FREE_INT[1]}> \n\n` +
          `**[⭐⭐⭐ Avancé]** : \n <#${ACE.FREE_HARD[0]}> \n <#${ACE.FREE_HARD[1]}> \n\n` +
          `**[🙋 Tous niveaux 1]** : \n <#${ACE.FREE_ALL[0]}> \n <#${ACE.FREE_ALL[1]}>`,

        true
      )
      .setFooter(
        "Pour ceux sur téléphone, merci de chercher les noms correspondants sur les channels à votre gauche."
      );
    return [freeDisEmbed, "❌"];
  }

  /**
   * Return the thematic Discussion Embed
   *
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>}
   */
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
        `\n **[🦸 Thématique]** : \n <#${ACE.THEME[0]}> \n <#${ACE.THEME[1]}> \n\n`,
        true
      )
      .addField(
        "🇬🇧 | Anglais : ",
        `\n **[🦸 Thématique]** : \n <#${ACA.THEME[0]}> \n <#${ACA.THEME[1]}>`,
        true
      );

    return [themeDiscEmbed, "❌"];
  }

  /**
   * Return the games channel display Embed
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>}
   */
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
        "🇬🇧 | Anglais : ",
        `\n **[🃏 Jeux]** : \n <#${ACA.GAME1[0]}> \n <#${ACA.GAME1[1]}> \n\n` +
          `**[🃏 Jeux2]** : \n <#${ACA.GAME2[0]}> \n <#${ACA.GAME2[1]}> \n\n`,
        true
      )
      .addField(
        "🇪🇸 | Espagnol : ",
        `\n **[🃏 Jeux]** : \n <#${ACE.GAME[0]}> \n <#${ACE.GAME[1]}>`,
        true
      );
    return [gamesEmbed, "❌"];
  }

  /**
   * Return the stream channel display Embed
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>}
   */
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
        `\n **[🎮 Conférences-Stream]** : \n <#${ACE.STREAM[0]}> \n <#${ACE.STREAM[1]}> \n\n`,
        true
      )
      .addField(
        "🇬🇧 | Anglais : ",
        `\n **[🎮 Conférences-Stream]** : \n <#${ACA.STREAM[0]}> \n <#${ACA.STREAM[1]}>`,
        true
      );

    return [streamEmbed, "❌"];
  }

  /**
   * Return the coaching channel display Embed
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>}
   */
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
        `\n **[🎓 Première Séance Coaching]** : \n <#${ACA.COACHING1[0]}> \n\n`,
        true
      )
      .addField(
        "📌 Habitué(e) : ",
        `\n **[🎓 Guidage Coaching A]** : \n <#${ACA.COACHING2[0]}> \n\n ` +
          `**[🎓 Guidage Coaching B]** : \n <#${ACA.COACHING3[0]}> \n `,
        true
      );

    return [coachEmbed, "❌"];
  }
};
