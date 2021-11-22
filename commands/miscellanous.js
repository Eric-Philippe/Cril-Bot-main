const Discord = require("discord.js");
// npm install xhr2
var XMLHttpRequest = require("xhr2");

const moment = require("moment");
const { MAIN_COLOR } = require("../config.json");

module.exports = class Miscellanous {
  /**
   * Dice function
   *
   * @param {Discord.Message} msg
   */
  static dice(msg) {
    let args = msg.content.split(" ");
    let max = 6;
    if (args[1]) {
      if (!isNaN(args[1])) {
        if (args[1] > 0) {
          max = args[1];
        }
      }
    }
    let result = Miscellanous.getRandomInt(max, 1);

    let embed = new Discord.MessageEmbed()
      .setTitle("🎲 | Rolling dice")
      .setColor(MAIN_COLOR)
      .addField("📉 - Résultat : ", "``" + String(result) + "``");

    msg.reply({ embeds: [embed] });
  }

  /**
   * Dive the informations about specific users
   *
   * @param {Discord.Message} msg
   */
  static userinfo(msg) {
    const member = msg.mentions.members.first() || msg.member;
    const user = member.user;
    let embed = new Discord.MessageEmbed()
      .setTitle(`Informations à propos de ${user.tag}`)
      .setColor(MAIN_COLOR)
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
            .join(" **|** ") || "Pas de Roles"
        }`,
        true
      )
      .setFooter(`Demandé par : ${msg.author.tag}`, msg.author.avatarURL())
      .setTimestamp();

    msg.channel.send({ embeds: [embed] });
  }

  /**
   *  Creator embed from Discord
   * !embed "t Titre t" "d  d"
   *
   * @param {Discord.Message} msg
   */
  static createEmbed(msg) {
    let balised_title = msg.content.match(/"t(.*?)t"/g);
    if (balised_title)
      balised_title = balised_title.map(function (val) {
        return val.replace(/t"/g, "").slice(2);
      });

    let title = undefined;
    if (balised_title) title = balised_title[0];
    let title_length = title ? title.length + 5 : 0;

    let balised_img = msg.content.match(/"img(.*?)img"/g);
    if (balised_img)
      balised_img = balised_img.map(function (val) {
        return val.replace(/img"/g, "").slice(4);
      });

    let img = undefined;
    if (balised_img) img = balised_img[0];
    let img_length = img ? img.length + 9 : 0;

    let cmd = msg.content.split(" ")[0];

    let desc = msg.content.slice(cmd.length + img_length + title_length);
    if (!desc)
      return msg.reply("Merci de rédiger du contenu pour votre embed !");

    let embed = new Discord.MessageEmbed()
      .setColor(MAIN_COLOR)
      .setDescription(desc)
      .setFooter("Le cril", msg.guild.iconURL());
    if (title) embed.setTitle(title);
    if (img) {
      try {
        embed.setImage(img);
      } catch {
        console.log(err);
      }
    }

    msg.channel.send({ embeds: [embed] });
  }

  /**
   * Return a number int beetween 0 and max param
   *
   * @param {Number} max
   * @param {Number} min
   * @returns Number
   */
  static getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
};
