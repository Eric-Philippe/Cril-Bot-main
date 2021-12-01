const Discord = require("discord.js");

const question_mark =
  "https://cdn.discordapp.com/attachments/739553949199106158/914227536785989642/Ouf7Ajd.png";

const {
  GIF_FICHE,
  GIF_RESACRIL,
  IMG_MOODLE,
  IMG_CRIL,
  IMG_RESACRIL,
  IMG_LATE,
  DISCORD_IMG,
} = require("./ressource.json");

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
        question_mark
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
    let link = "https://moodle.iut-tlse3.fr/login/index.php";

    let embedMoodle = new Discord.MessageEmbed()
      .setTitle("Lien vers moodle")
      .setColor("#f98012")
      .setURL(link)
      .setDescription(link)
      .setImage(
        "https://moodle.iut-tlse3.fr/pluginfile.php/102032/course/overviewfiles/Imagea.png"
      )
      .setThumbnail(IMG_MOODLE)
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
    let link =
      "http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/";
    let resacrilEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers RésaCril")
      .setColor("#18b5a0")
      .setDescription(link)
      .setImage(IMG_RESACRIL)
      .setThumbnail(IMG_CRIL)
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
    let link = "https://moodle.iut-tlse3.fr/login/index.php";

    let ficheEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers les fiches")
      .setColor("#18b5a0")
      .setDescription(link)
      .setImage(GIF_FICHE)
      .setThumbnail(IMG_MOODLE)
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
    let link =
      "http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/";

    let validationEmbed = new Discord.MessageEmbed()
      .setTitle("Lien vers les validations")
      .setColor("#18b5a0")
      .setDescription(link)
      .setImage(GIF_RESACRIL)
      .setThumbnail(IMG_CRIL)
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
      .setThumbnail(IMG_LATE)
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
      .setThumbnail(IMG_LATE)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, p_absenceEmbed, isHelp);
  }

  /**
   *  Return the embed for the activity finder assistanc
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
        "Votre validation entrainera une ouverture d'une page d'aide afin de vous diriger pour votre activité."
      )
      .setThumbnail(IMG_LATE)
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
        "Votre validation entrainera une ouverture d'un ticket afin de traiter votre demande."
      )
      .setThumbnail(IMG_LATE)
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
        "Votre validation entrainera une page d'assistance afin de vous guider pour faire fonctionner votre Discord."
      )
      .setThumbnail(DISCORD_IMG)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return await AnswerZero.__embedSend__(msg, discordEmbed, isHelp);
  }
};
