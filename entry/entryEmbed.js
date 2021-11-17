const Discord = require("discord.js");

const { SECOND_COLOR } = require("../config.json");

/**
 *  Constructor of the first embed page
 *
 * @param {Discord.Message} msg
 * @param {String} firstname
 * @param {String} secondname
 * @param {String} SCHOOL
 * @returns {Discord.MessageEmbed}
 */
const embed1 = function (msg, firstname, secondname, SCHOOL) {
  let firstname_ = firstname || "Non renseigné";
  let secondname_ = secondname || "Non renseigné";
  let SCHOOL_ = SCHOOL || "Non renseigné";

  let embed = new Discord.MessageEmbed()
    .setTitle("Présentation : ")
    .setColor(SECOND_COLOR[0])
    .setAuthor("Cril", msg.guild.iconURL())
    .setThumbnail(msg.author.avatarURL())
    .setDescription(
      "Merci d'entrer votre prénom, votre nom puis votre département"
    )
    .addField("Prénom", ```${firstname_}```, true)
    .addField("Nom", ```${secondname_}```, true)
    .addField("Département", ```${SCHOOL_}```, true)
    .setTimestamp();

  return embed;
};

export { embed1 };
