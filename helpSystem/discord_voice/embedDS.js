const Discord = require("discord.js");

const { VOCALS, EMOTE, GIF, IMG } = require("../../ressources.json"); // All the added ressources needed
const D_COLOR = "#5865F2"; // Discord Main Color

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
        `${EMOTE.CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondante à la plateforme sur laquelle vous êtes sur Discord.`
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
        `${EMOTE.CHECK_EMOTE} | Merci de **__cliquer sur la réaction__** correspondante à votre soucis actuel.`
      )
      .addField(
        "Problème : ",
        "**[1]** : 🔎 - Je ne trouve pas le channel \n **[2]** : ❓ - Je ne sais pas comment me connecter \n **[3]** : 🔇 - Je n'entends rien",
        true
      );

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
          "Passez votre curseur sur la liste au milieu à gauche, puis descendez jusque dans le channel vocal désiré !";
        break;
      case "NAV":
        url = GIF.DISCORD_NAV;
        txt =
          "Passez votre curseur sur la liste au milieu à gauche, puis descendez jusque dans le channel vocal désiré !";
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

  /**
   * Return the HOW Solution embed
   * @param {Discord.Message} msg
   * @param {String} plateform
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async HOWsolveEmbed(msg, plateform) {
    let howEmbed = new Discord.MessageEmbed()
      .setTitle("Comment se connecter à un channel vocal ?")
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());
    let txt = `Cliquez sur le channel vocal (contenant l'emoji 🔈) \n Autrement, cliquez sur le channel suivant <#${VOCALS.JUST_CHATTING}> puis demandez à un administrateur de vous déplacer !`;
    if (plateform === "PHO") {
      txt =
        "Cliquez sur le channel vocal désiré, puis cliquez sur le bouton vert ``Rejoindre un salon vocal``";
    }

    howEmbed.setDescription(`${EMOTE.GEAR_EMOTE} | ${txt}`);

    return [howEmbed];
  }

  /**
   * Return the SOUND Solution embed [Muted]
   * @param {Discord.Message} msg
   * @param {String} plateform
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async SOUNDsolveEmbedFirst(msg, plateform) {
    let soundEmbed = new Discord.MessageEmbed()
      .setTitle("Comment régler un soucis de son !")
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`);

    let txt =
      "Êtes-vous bien démuté ? Sinon, cliquez à l'endroit que vous indique le gif !";

    let url;
    switch (plateform) {
      case "PHO":
        url = GIF.DISCORD_MUTED_ICON;
        break;
      case "APP":
        url = GIF.DISCORD_MUTED_ICON;
        break;
      case "NAV":
        url = GIF.DISCORD_MUTED_ICON;
        break;
    }

    soundEmbed.setDescription(
      `${EMOTE.GEAR_EMOTE} | ${txt} \n | Si votre problème est résolu, merci de cliquer sur '↪️', sinon, passez à la suite avec '✅' !`
    );
    soundEmbed.setImage(url);

    return [soundEmbed, "✅", "↪️"];
  }

  /**
   * Return the SOUND Solution embed [Plug DEVICE]
   * @param {Discord.Message} msg
   * @param {String} plateform
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async SOUNDsolveEmbedSec(msg, plateform) {
    let soundEmbed = new Discord.MessageEmbed()
      .setTitle("Comment régler un soucis de son !")
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`);

    let url, txt;

    switch (plateform) {
      case "PHO":
        txt =
          "Avez-vous connecté un appareil externe, des écouteurs, sans-fil ? Essayez en débranchant le tout et en utilisant uniquement le micro et le son de votre téléphone !";
        url = IMG.DISCORD_PLUGIN_JACK;
        break;
      case "APP":
        txt =
          "Avez-vous bien connecté des écouteurs sur l'ordinateur ? Sont-ils encore fonctionnels ?";
        url = GIF.DISCORD_PLUGIN_JACK;
        break;
      case "NAV":
        txt =
          "Avez-vous bien connecté des écouteurs sur l'ordinateur ? Sont-ils encore fonctionnels ? Avez-vous autorisé Discord à utiliser vos périphériques ? Sinon, relancez Discord";
        url = IMG.DISCORD_AUTH_SOUND;
        break;
    }

    soundEmbed.setDescription(
      `${EMOTE.GEAR_EMOTE} | ${txt} \n | Si votre problème est résolu, merci de cliquer sur '↪️', sinon, passez à la suite avec '✅' !`
    );
    soundEmbed.setImage(url);

    return [soundEmbed, "✅", "↪️"];
  }

  /**
   * Return the SOUND Solution embed [Parameters]
   * @param {Discord.Message} msg
   * @param {String} plateform
   * @returns {Array<Discord.MessageEmbed, String>} embed Template
   */
  static async SOUNDsolveEmbedThird(msg, plateform) {
    let soundEmbed = new Discord.MessageEmbed()
      .setTitle("Comment régler un soucis de son !")
      .setColor(D_COLOR)
      .setAuthor(`Demandé par ${msg.author.username}`);

    let url;
    let txt = "Assurez-vous d'avoir tout de parametré comme le montre le gif !";

    switch (plateform) {
      case "PHO":
        url = GIF.DISCORD_SETUP_PHONE;
        break;
      case "APP":
        url = GIF.DISCORD_SETUP_COMP;
        break;
      case "NAV":
        url = GIF.DISCORD_SETUP_COMP;
        break;
    }

    soundEmbed.setDescription(
      `${EMOTE.GEAR_EMOTE} | ${txt} \n | Si votre problème est résolu, merci de cliquer sur '↪️', sinon, merci de contacter un Responsable afin de gérer la situation !`
    );
    soundEmbed.setImage(url);

    return [soundEmbed, "↪️"];
  }
};
