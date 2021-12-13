const Discord = require("discord.js");

const { ROLES, IMG, GIF, IUT } = require("../ressources.json");

module.exports = class AnswerZero {
  /**
   *
   * @param {Discord.Message} msg
   * @param {Discord.MessageEmbed} embed
   * @param {Boolean} isHelp
   * @returns
   */
  static async __embedSend__(msg, embed, isHelp) {
    embed.addField(
      "📧 | En cas de doute contactez-nous par mail : ",
      "cril.langues@iut-tlse3.fr"
    );
    if (isHelp) {
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("Happy")
          .setLabel("Oui")
          .setStyle("SUCCESS")
          .setEmoji("✔️"),

        new Discord.MessageButton()
          .setCustomId("Unhappy")
          .setLabel("Non")
          .setStyle("DANGER")
          .setEmoji("❌")
      );

      embed.setFooter(
        `Cette réponse correspond-elle à votre demande ?`,
        IMG.QUESTION_LOGO
      );

      return await msg.channel.send({
        embeds: [embed],
        components: [row],
      });
    } else {
      msg.channel.send({ embeds: [embed] });
    }
  }

  /**
   * Return the Embed with Moodle's links
   *
   * @param {Discord.Message} msg
   * @param {isHelp} Boolean
   *
   * @returns {Discord.Message} Message
   */
  static async find_moodle(msg, isHelp) {
    let embedMoodle = new Discord.MessageEmbed()
      .setTitle("Lien vers moodle")
      .setColor("#f98012")
      .setURL(IUT.MOODLE_LINK)
      .setDescription(IUT.MOODLE_LINK)
      .setImage(IMG.ENGLISH_CRIL_LOGO)
      .setThumbnail(IMG.MOODLE_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, embedMoodle, isHelp);
  }

  /**
   * Return the Embed with RésaCril's link
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   *
   * @returns {Discord.Message} Message
   */
  static async find_ResaCril(msg, isHelp) {
    let resacrilEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers RésaCril")
      .setColor("#18b5a0")
      .setDescription(IUT.RESACRIL_LINK)
      .setImage(IMG.RESACRIL_MENU)
      .setThumbnail(IMG.CRIL_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, resacrilEmbed, isHelp);
  }

  /**
   * Return the Embed with Fiche's link
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   *
   * @returns {Discord.Message} Message
   */
  static async find_fiche(msg, isHelp) {
    let ficheEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers les fiches")
      .setColor("#18b5a0")
      .setDescription(IUT.MOODLE_LINK)
      .setImage(GIF.FICHES_MOODLE_GIF)
      .setThumbnail(IMG.MOODLE_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, ficheEmbed, isHelp);
  }
  /**
   * Return the Embed with Activity Time's link
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   *
   * @returns {Discord.Message} Message
   */
  static async find_Validation(msg, isHelp) {
    let validationEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers les validations")
      .setColor("#18b5a0")
      .setDescription(IUT.RESACRIL_LINK)
      .setImage(GIF.RESACRIL_GIF)
      .setThumbnail(IMG.CRIL_LOGO)
      .addField(
        "⏱️ | Temps d'attente pour une validation : ",
        "``" +
          "En général votre activité aura un statut sous une semaine." +
          "``"
      )
      .addField(
        "⚠️ | Attention : ",
        "``" +
          "Vérifiez que votre fiche a bien été enregistrée dans Moodle." +
          "``"
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, validationEmbed, isHelp);
  }

  /**
   *  Return the embed for delay
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   * @returns {Discord.Message} Message
   */
  static async delay(msg, isHelp) {
    let delayEmbed = new Discord.MessageEmbed()
      .setTitle("Désirez vous déclarer un retard ?")
      .setColor("#8a3851")
      .setDescription(
        "Votre validation entrainera une notification des responsables afin de signaler votre retard."
      )
      .setThumbnail(IMG.DELAY_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, delayEmbed, isHelp);
  }

  /**
   *  Return the embed for previous absences
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   * @returns {Discord.Message} Message
   */
  static async previous_absence(msg, isHelp) {
    let p_absenceEmbed = new Discord.MessageEmbed()
      .setTitle("Désirez-vous déclarer une absence passée ?")
      .setColor("#9fae71")
      .setDescription(
        "Votre validation entrainera une notification des responsables afin de signaler votre précédente absence."
      )
      .setThumbnail(IMG.DELAY_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, p_absenceEmbed, isHelp);
  }

  /**
   *  Return the embed for the activity finder assistance
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   * @returns {Discord.Message} Message
   */
  static async find_activity(msg, isHelp) {
    let activity_embed = new Discord.MessageEmbed()
      .setTitle(
        "Désirez-vous de l'aide pour vous guider pour trouver vos channels d'activités ?"
      )
      .setColor("#71aea6")
      .setDescription(
        "Cliquer sur le bouton vert 'oui' entrainera une ouverture d'une page d'aide afin de vous diriger vers votre activité."
      )
      .setThumbnail(IMG.DELAY_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, activity_embed, isHelp);
  }

  /**
   *  Return the embed for the unsubscribe ticket
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   * @returns {Discord.Message} Message
   */
  static async unsubscribe(msg, isHelp) {
    let unsubscribeEmbed = new Discord.MessageEmbed()
      .setTitle(
        "Désirez-vous vous désinscrire ou déclarer une absence à venir ?"
      )
      .setColor("#71aea6")
      .setDescription(
        "Cliquer sur le bouton vert 'oui' entrainera une ouverture d'un ticket afin de traiter votre demande."
      )
      .setThumbnail(IMG.DELAY_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, unsubscribeEmbed, isHelp);
  }

  /**
   *  Return the embed for the Discord Assistance
   *
   * @param {Discord.Message} msg
   * @param {Boolean} isHelp
   * @returns {Discord.Message} Message
   */
  static async discord_assist(msg, isHelp) {
    let discordEmbed = new Discord.MessageEmbed()
      .setTitle("Désirez-vous de l'aide pour vous connecter sur Discord ?")
      .setColor("#6365b0")
      .setDescription(
        "Cliquer sur le bouton vert 'oui' entrainera une page d'assistance afin de vous guider pour faire fonctionner votre Discord."
      )
      .setThumbnail(IMG.DISCORD_LOGO)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, discordEmbed, isHelp);
  }

  /**
   * Return the func for delayed student
   *
   * @param {Discord.Message} msg
   * @param {String} category
   */
  static async mention_reponsable_delay(msg) {
    let embedDelay = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(msg.content)
      .setThumbnail(msg.author.avatarURL())
      .setTimestamp()
      .setTitle(`${msg.author.username} connait un retard.`);

    msg.channel.send(`||<@&${ROLES.MOD_ROLES[0]}>||`);
    msg.channel.send({ embeds: [embedDelay] });
    msg.delete();
  }

  /**
   * Return the func for past absent student
   *
   * @param {Discord.Message} msg
   * @param {String} category
   */
  static async mention_reponsable_pastA(msg) {
    let embedPastA = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(msg.content)
      .setThumbnail(msg.author.avatarURL())
      .setTimestamp()
      .setTitle(`${msg.author.username} connait une absence passée !`);

    msg.channel.send(`||<@&${ROLES.MOD_ROLES[0]}>||`);
    msg.channel.send({ embeds: [embedPastA] });
    msg.delete();
  }
};
