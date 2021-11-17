const Discord = require("discord.js");

const { MAIN_COLOR, SECOND_COLOR } = require("../config.json");
/**
 *
 * @typedef {Object} Template
 * @property {Discord.MessageEmbed} embed -- The embed message
 * @property {Discord.MessageActionRow} row -- The button(s) interactions
 * @property {Array.<number>} collector_require -- The collector(s) needed
 */

/**
 *  Constructor of the base template page
 *
 * @param {Discord.GuildMember} member

 * @return {Template} The template object
 */
module.exports.template0 = function (member) {
  const collector_require = [0]; // Button collector

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("entryButton")
      .setLabel("Entrer")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  let embed = new Discord.MessageEmbed()
    .setColor(MAIN_COLOR)
    .setTitle(`Bienvenue ${member.user.tag} !`)
    .setDescription(
      "Bienvenue sur le serveur du Cril ! Tu suivra les étapes suivantes pour valider ton entrée dans ce dernier !"
    )
    .addField("Etape 1", "Entrée de ton prénom et de ton nom !")
    .addField("Etape 2", "Lecture du règlement")
    .addField(
      "Etape 3",
      "Amorce des premières manipulations nécessaire pour le Cril !"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(member.user.avatarURL())
    .setTimestamp();

  return { embed, row, collector_require };
};

/**
 *  Constructor of the first template page
 *
 * @param {Discord.Message} msg
 * @param {String} firstname
 * @param {String} secondname
 * @param {String} SCHOOL
 * @param {String} title
 * @return {Template} The template object
 */
module.exports.template1 = function (
  msg,
  firstname,
  secondname,
  SCHOOL,
  title
) {
  let firstname_ = firstname || "Nan";
  let secondname_ = secondname || "Nan";
  let SCHOOL_ = SCHOOL || "Nan";

  const collector_require = [0, 2]; // Button collector - Message collector

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("beforeUnderButton")
      .setLabel("Champ précédent")
      .setStyle("SECONDARY"),

    new Discord.MessageButton()
      .setCustomId("nextUnderButton")
      .setLabel("Champ suivant")
      .setStyle("SECONDARY"),

    new Discord.MessageButton()
      .setCustomId("validateButton")
      .setLabel("Valider")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  const embed = new Discord.MessageEmbed()
    .setTitle("Présentation : " + title)
    .setColor(SECOND_COLOR[0])
    .setAuthor("Cril", msg.guild.iconURL())
    .setThumbnail(msg.author.avatarURL())
    .setDescription(
      "Merci d'entrer votre prénom, votre nom puis votre département"
    )
    .addField("Prénom", "``" + firstname_ + "``", true)
    .addField("Nom", "``" + secondname_ + "``", true)
    .addField("Département", "``" + SCHOOL_ + "``", true)
    .setTimestamp();

  if (title === "Département") {
    embed.addField("INFO", "``1``", true);
    embed.addField("BIO", "``2``", true);
    embed.addField("CHIM", "``3``", true);
    embed.addField("CIV", "``4``", true);
    embed.addField("GE2I", "``5``", true);
    embed.addField("GMP", "``6``", true);
    embed.addField("GCCD", "``7``", true);
    embed.addField("MP", "``8``", true);
    embed.addField("GEAP", "``9``", true);
    embed.addField("GEAR", "``10``", true);
    embed.addField("⚙️ | Merci d'entrer une valeur", "Numérique");
  }

  return { embed, row, collector_require };
};
