const Discord = require("discord.js");
var XMLHttpRequest = require("xhr2");

const { TENOR_TOKEN } = require("../token.json");
const Tenor = require("tenorjs").client({
  Key: TENOR_TOKEN,
  Filter: "medium",
  Locale: "en_US",
  MediaFilter: "basic",
  DateFormat: "DD/MM/YYYY - H:mm:ss A",
});

const moment = require("moment");
const { COLOR } = require("../ressources.json");

module.exports = class Miscellanous {
  /**
   * Dice function
   *
   * @param {Discord.Message} msg
   */
  static dice(msg) {
    let args = msg.content.split(" "); // Split between Space
    let max = 6; // Default max dice range
    if (args[1]) {
      // User dice faces input
      if (!isNaN(args[1])) {
        // Number input
        if (args[1] > 0) {
          // Valid Number
          max = args[1];
        }
      }
    }
    let result = Miscellanous.getRandomInt(max, 1); // Get random number

    let embed = new Discord.MessageEmbed() // Embed constructor
      .setTitle("🎲 | Rolling dice")
      .setColor(COLOR.MAIN_COLOR)
      .addField("📉 - Résultat : ", "``" + String(result) + "``");

    msg.channel.send({ embeds: [embed] });
  }

  /**
   * Dive the informations about specific users
   *
   * @param {Discord.Message} msg
   */
  static userinfo(msg) {
    const member = msg.mentions.members.first() || msg.member; // Member targeted
    const user = member.user; // Member to User
    let embed = new Discord.MessageEmbed() // Embed constrcutor
      .setTitle(`Informations à propos de ${user.tag}`)
      .setColor(COLOR.MAIN_COLOR)
      .setThumbnail(user.avatarURL())
      .addField("Pseudo : ", user.username, true)
      .addField("ID : ", user.id, true)
      .addField(
        "Compte créé le : ",
        moment.utc(user.createdAt).format("DD/MM/YYYY")
      )
      .addField(
        "A rejoint le serveur le : ",
        moment.utc(member.joinedAt).format("DD/MM/YYYY")
      )
      .addField(
        "Roles",
        `${
          member.roles.cache
            .filter((r) => r.id !== msg.guild.id)
            .map((roles) => `\`${roles.name}\``)
            .join(" **|** ") || "Pas de Rôle"
        }`,
        true
      )
      .setFooter(`Demandé par : ${msg.author.tag}`, msg.author.avatarURL())
      .setTimestamp();

    msg.channel.send({ embeds: [embed] }); // Send message
  }

  /**
   *  Creator embed from Discord
   * !embed "t Titre t" "img valid URL img"
   *
   * @param {Discord.Message} msg
   */
  static async createEmbed(msg) {
    let balised_title = msg.content.match(/"t(.*?)t"/g); // Find match with the Title balise
    if (balised_title)
      balised_title = balised_title.map(function (val) {
        return val.replace(/t"/g, "").slice(2); // Clear the balise and extract the argument Title
      });

    let title = undefined;
    if (balised_title) title = balised_title[0]; // First element of the map
    let title_length = title ? title.length + 5 : 0; // Size of the (no) existing title

    let balised_img = msg.content.match(/"img(.*?)img"/g); // Find match with Image balise
    if (balised_img)
      balised_img = balised_img.map(function (val) {
        return val.replace(/img"/g, "").slice(4); // Clear the balise and extract the argument Image
      });

    let img = undefined;
    if (balised_img) img = balised_img[0]; // First element of the map
    let img_length = img ? img.length + 9 : 0; // URL size

    let cmd = msg.content.split(" ")[0]; // Cmd argument

    let desc = msg.content.slice(cmd.length + img_length + title_length); // Embed Description
    if (!desc)
      return msg.reply("Merci de rédiger du contenu pour votre embed !"); // Error Handler

    let embed = new Discord.MessageEmbed() // Embed constructor
      .setColor(COLOR.MAIN_COLOR)
      .setDescription(desc)
      .setFooter("Le cril", msg.guild.iconURL());
    if (title) embed.setTitle(title);
    if (img) {
      // URL vérification
      if (Miscellanous.checkURL(img)) embed.setImage(img);
    }

    await msg.channel.send({ embeds: [embed] });
    await msg.delete(); // Clear
  }

  /**
   * Display the avatar of the targeted user
   *
   * @param {Discord.Message} msg
   */
  static getAvatar(msg) {
    const member = msg.mentions.members.first() || msg.member; // Member targeted
    const user = member.user; // Member -> User

    let embed = new Discord.MessageEmbed() // Embed constructor
      .setTitle(`Avatar de ${user.tag}`)
      .setColor(COLOR.MAIN_COLOR)
      .setImage(user.avatarURL())
      .setFooter(`Demandé par : ${msg.author.tag}`, msg.author.avatarURL())
      .setTimestamp();

    msg.channel.send({ embeds: [embed] }); // Send the embed
  }

  /**
   * Return a gorgeous embed with coffee
   *
   * @param {Discord.Message} msg
   */
  static coffee(msg) {
    let i = Miscellanous.getRandomInt(4, 1); // Get random Int betwee, 1 and 3 (include)
    let name = "coffee"; // Default research name
    // Change a bit the search depend on the int
    switch (i) {
      case 2:
        name = "coffee time";
        break;
      case 3:
        name = "need coffee";
        break;
    }
    Tenor.Search.Random(name, "1").then(async (Results) => {
      // Search random gif
      let embed = new Discord.MessageEmbed() // Embed Constructor
        .setImage(Results[0].media[0].gif.url)
        .setColor("#6f4e37")
        .setTitle("A coffee for you <3");
      msg.channel.send({ embeds: [embed] }); // Send the embed
    });
  }

  /**
   * Return a number int beetween 0 and max param
   *
   * @param {Number} max
   * @param {Number} min
   * @returns {Number} Number
   */
  static getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Return true if URL is valid
   *
   * @param {String} url
   *
   * @returns {Boolean} Boolean
   */
  static async checkURL(url) {
    var request = new XMLHttpRequest(); // Create new request to test the URL
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
      if (request.status == 200) {
        return true;
      } else {
        return false;
      }
    };
  }
};
