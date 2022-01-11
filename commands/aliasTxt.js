const Discord = require("discord.js");

const { ROLES, IMG, CHANNELS } = require("../ressources.json");

module.exports = class aliasTxt {
  /**
   * @param {Discord.Message} msg
   */
  static async newCreneaux(msg) {
    await msg.channel.send(`||<@&${ROLES.ETU}>||`);
    let embed = new Discord.MessageEmbed()
      .setTitle("De nouveaux créneaux sont disponibles !")
      .setColor("DARK_RED")
      .setDescription(
        "Hello \n" +
          "De nouveaux créneaux sont disponibles à la réservation sur Résacril, en activité interaction et en coaching, en anglais et en espagnol. \n" +
          "Comme d’habitude, vous avez le choix entre du présentiel et du distanciel, des discussions libres de tous niveaux, des discussions thématiques, des jeux… \n" +
          "Toutes les précisions sur le thème, le niveau et le lieu sont affichées sur Résacril au moment de la réservation. \n" +
          "Des créneaux sont susceptibles d’être ajoutés au fil de l’eau. \n\n" +
          "Retrouvez les principaux thèmes et jeux prévus dans l’affiche ci-dessous. \n\n" +
          `N’oubliez pas que vous pouvez prendre les rôles des thèmes qui vous intéressent pour être avertis de l’ouverture d’activités correspondantes ; <#847109554327126066> \n\n` +
          `En cas de question, <#${CHANNELS.SUPPORT_CHANNEL}> Support ou mail à \n __cril.langues@iut-tlse3.fr__ \n\n` +
          "A bientôt au CRIL!"
      )
      .setThumbnail(IMG.SCHEDULE_LOGO)
      .setTimestamp();

    await msg.channel.send({ embeds: [embed] });
    await msg.delete();
  }

  static async deb(msg) {
    await msg.channel.send(
      "Le but du coaching est de travailler vos objectifs en langue. Pour vous aider à définir cela, je vais vous demander de compléter la fiche début de parcours dans votre dossier Moodle CRIL. Revenez me le dire ici quand vous aurez terminé cela, ça devrait vous prendre environ 5 minutes."
    );
    await msg.delete();
  }

  static async debcomm(msg) {
    await msg.channel.send(
      "Revenez sur la fiche début de parcours dans votre dossier de suivi CRIL sur Moodle, dans le champ Conseil coachs nous vous avons donné des conseils de travail pour cette séance. Prenez-en connaissance et commencez à travailler. \n" +
        "__Les ressources mentionnées dans les conseils sont disponibles en cliquant sur le **symbole épingle** en haut de ce chat__. La séance dure 1h. Vous devez remplir la fiche coaching 1 au fur et à mesure de la séance : cela fait partie de votre heure de travail, mais si vous n’avez pas le temps de terminer, vous pouvez enregistrer et la modifier plus tard. Si vous avez des questions, besoin d’aide ou d’identifiants, revenez vers moi, je suis là pour vous répondre"
    );
    await msg.delete();
  }

  static async fcomm(msg) {
    await msg.channel.send(
      "Votre dernière fiche de coaching a été commentée avec un conseil, vous pouvez aller en prendre connaissance et continuer votre travail. Si vous avez besoin de plus de précisions, d'identifiants ou toute autre aide, revenez vers moi"
    );
    await msg.delete();
  }

  static async email(msg) {
    await msg.channel.send(
      "Bonjour, merci d'envoyer un mail à cril.langues@iut-tlse3.fr en expliquant votre problème, il sera traité par les responsables dès que possible. \n Bonne journée."
    );
  }
};
