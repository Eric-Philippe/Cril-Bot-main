const Discord = require("discord.js");

let { VOCALS, EMOTE, GIF } = require("../../ressources.json");
const D_COLOR = "#5865F2";

module.exports = class embedDS {
  /**
   * Return the plateform embed
   *
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async plateformEmbed(msg) {
    let embedPlateform = new Discord.MessageEmbed()
      .setTitle("Merci de choisir la plateforme sur laquelle vous êtes !")
      .setColor(D_COLOR)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondant à la plateforme sur laquelle vous êtes sur Discord.`
      )
      .addField(
        "Plateformes : ",
        "**[1]** : 📱 - Téléphone / Tablette \n **[2]** : 🖥️ - Ordinateur => Application \n **[3]** : 🌐 - Ordinateur => Navigateur Internet",
        true
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return [embedPlateform, "📱", "🖥️", "🌐"];
  }

  /**
   * Return the WUP embed
   * @param {Discord.Message} msg
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async whatUrProblemEmbed(msg) {
    let wupEmbed = new Discord.MessageEmbed()
      .setTitle("Quel est votre soucis ?")
      .setColor(D_COLOR)
      .setDescription(
        `${EMOTE.CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondant à votre soucis actuel.`
      )
      .addField(
        "Problème : ",
        "**[1]** : 🔎 - Je ne trouve pas le channel \n **[2]** : ❓ - Je ne sais pas comment me connecter \n **[3]** : 🔇 - Je n'entends rien",
        true
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    return [wupEmbed, "🔎", "❓", "🔇"];
  }

  /**
   * Return the FIND Solution embed
   * @param {Discord.Message} msg
   * @param {String} plateform
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async FINDSolveEmbed(msg, plateform) {
    let fsEmbed = new Discord.MessageEmbed()
      .setTitle(
        "Merci de suivre le gif ci-dessous afin de comprendre la manipulation"
      )
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    let url, txt;
    switch (plateform) {
      case "PHO":
        url = GIF.DISCORD_PHONE;
        txt =
          "Cliquez en haut à gauche sur les trois barres, puis descendez jusque dans le channel vocal désiré !";
        break;
      case "APP":
        url = GIF.DISCORD_APP;
        txt =
          "Passez votre curseur sur la liste au milieu à gauche, puis descendez jusque dans le channel  vocal désiré !";
        break;
      case "NAV":
        url = GIF.DISCORD_NAV;
        txt =
          "Passez votre curseur sur la liste au milieu à gauche, puis descendez jusque dans le channel  vocal désiré !";
        break;
    }

    fsEmbed.setDescription(
      `${EMOTE.GEAR_EMOTE} | ${txt} \n ${EMOTE.CHECK_EMOTE} | Entrez la commande` +
        "``" +
        "FindChannel" +
        "``" +
        " afin d'obtenir des liens cliquables directement vers les channels désirés !"
    );
    fsEmbed.setImage(url);
    fsEmbed.setFooter("Cliquez sur le gif pour le voir en plus grand !");

    return [fsEmbed];
  }

  static async HOWsolveEmbed(msg, plateform) {
    let howEmbed = new Discord.MessageEmbed()
      .setTitle("Comment se connecter à un channel vocal ?")
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());
    let txt;
    switch (plateform) {
      case "PHO":
        txt =
          "Cliquez sur le channel vocal désiré, puis cliquez sur le bouton vert ``Rejoindre un salon vocal``";
        break;
      case "APP":
        txt = "Cliquez sur le channel vocal (contenant l'emoji 🔈)";
        break;
      case "NAV":
        txt = "Cliquez sur le channel vocal (contenant l'emoji 🔈)";
        break;
    }

    howEmbed.setDescription(
      `${EMOTE.GEAR_EMOTE} | ${txt} \n Autrement, cliquez sur le channel suivant <#${VOCALS.JUST_CHATTING}> puis demandez à un administrateur de vous déplacer !`
    );

    return [howEmbed];
  }
};
