let Discord = require("discord.js");

let { IMG_CRIL } = require("../ressource.json");
const { CHECK_EMOTE } = require("../../img/emote.json");

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
      .addField(
        "Résacril : ",
        "[Lien vers RésaCril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/739553949199106158/915933365767651358/unknown.png"
      )
      .setThumbnail(IMG_CRIL)
      .setDescription(
        "__Assurez-vous de connaitre le nom de l'activité__ pour passer à la suite. Vous trouvez le nom sur **Résacril**, dans le menu ``Recap. & Planning``"
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return [embedMain, `✅`];
  }

  static async menu_activity(msg) {
    let embedMenu = new Discord.MessageEmbed()
      .setTitle("Merci de séléctionner l'activité que vous allez faire.")
      .setColor("DARK_GOLD")
      .setDescription(
        `${CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondant à l'activité que vous allez faire`
      )
      .addField(
        "Activité : ",
        "**[1]** : 📖 - Discussion Libre \n **[2]** : 📔 - Discussion à thème \n **[3]** : 🔎 - Cluedo ou jeu",
        true
      )
      .addField(
        "Activité : ",
        "**[4]** : 🎙️ - Conférence ou Ask me Anything \n **[5]** : 🍿 - Autre atelier (cinéclub, CV, théâtre...)",
        true
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return [embedMenu, "📖", "📔", "🔎", "🎙️", "🍿"];
  }
};
