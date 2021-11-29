const Discord = require("discord.js");

const question_mark =
  "https://cdn.discordapp.com/attachments/739553949199106158/914227536785989642/Ouf7Ajd.png";

const {
  GIF_FICHE,
  GIF_RESACRIL,
  IMG_MOODLE,
  IMG_CRIL,
  IMG_RESACRIL,
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
};
