const Discord = require("discord.js");

const { MAIN_COLOR, SECOND_COLOR } = require("../config.json");
const { rules_img, gifTemplate1 } = require("../img/embedImg.json");
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
  let firstname_ = firstname || "Non renseigné";
  let secondname_ = secondname || "Non renseigné";
  let SCHOOL_ = SCHOOL || "Non renseigné";

  const collector_require = [0, 2]; // Button collector - Message collector

  let txt_instruction;
  switch (title) {
    case "Prénom":
      txt_instruction =
        "Merci d'__entrer__ puis d'__envoyer__ votre prénom **dans le chat** en bas !";
      break;
    case "Nom de Famille":
      txt_instruction =
        "Merci d'__entrer__ puis d'__envoyer__ votre nom de famille **dans le chat** en bas !";
      break;
    case "Département":
      txt_instruction =
        "Merci d'__entrer__ puis d'__envoyer__ le numéro correspondant à votre département d'étude **dans le chat** en bas";
      break;
  }

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
      .setCustomId("entryButton")
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
      `<a:check_rainbow:912332999410999346> ${txt_instruction} \n Changer de champs grâce au boutons en bas !`
    )
    .addField("Prénom", "``" + firstname_ + "``", true)
    .addField("Nom", "``" + secondname_ + "``", true)
    .addField("Département", "``" + SCHOOL_ + "``", true)
    .setImage(gifTemplate1)
    .setTimestamp();

  if (title === "Département") {
    embed.addField("INFO : ", "Entrez ``1``", true);
    embed.addField("BIO : ", "Entrez ``2``", true);
    embed.addField("CHIM : ", "Entrez ``3``", true);
    embed.addField("CIV : ", "Entrez ``4``", true);
    embed.addField("GE2I : ", "Entrez ``5``", true);
    embed.addField("GMP : ", "Entrez ``6``", true);
    embed.addField("GCCD : ", "Entrez ``7``", true);
    embed.addField("MP : ", "Entrez ``8``", true);
    embed.addField("GEAP : ", "Entrez ``9``", true);
    embed.addField("GEAR : ", "Entrez ``10``", true);
    embed.addField("⚙️ | Merci d'entrer une valeur", "Numérique");
  }

  return { embed, row, collector_require };
};

/**
 *  Constructor of the second template page
 *
 * @param {Discord.Message} msg
 * @param {Number}

 * @return {Template} The template object
 */
module.exports.template2 = function (member, page) {
  const collector_require = [0]; // Button collector

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("entryButton")
      .setLabel("Entrer")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  let embed = new Discord.MessageEmbed()
    .setColor(SECOND_COLOR[2])
    .setTitle(`Les règles !`)
    .setDescription("Lorem Ipsum")
    .addField("Règle 1", "Trucs chiants")
    .addField("Règle 2", "Trucs chiants")
    .addField("Règle 3", "Trucs chiants")
    .addField("Règle 4", "Trucs chiants")
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(rules_img)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};

/**
 *  Constructor of the third template page
 *
 * @param {Discord.Message} msg
 * @param {Number}

 * @return {Template} The template object
 */
module.exports.template3 = function (member, page) {
  const collector_require = [0, 1]; // Button collector

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("entryButton")
      .setLabel("Entrer")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  let embed = new Discord.MessageEmbed()
    .setColor(SECOND_COLOR[2])
    .setTitle(`Les règles !`)
    .setDescription(
      "Cliquez sur la réaction pour valider le consentement à l'application de ces règles."
    )
    .addField("Règle 5", "Trucs chiants")
    .addField("Règle 6", "Trucs chiants")
    .addField("Règle 7", "Trucs chiants")
    .addField("Règle 8", "Trucs chiants")
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(rules_img)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};

/**
 *  Constructor of the fourth template page
 *
 * @param {Discord.Message} msg
 * @param {Number}

 * @return {Template} The template object
 */
module.exports.template4 = function (member, page) {
  const collector_require = [0]; // Button collector

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("entryButton")
      .setLabel("Entrer sur le serveur")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  let embed = new Discord.MessageEmbed()
    .setColor(SECOND_COLOR[2])
    .setTitle(`Premières manipulation !`)
    .setDescription("https://www.youtube.com/watch?v=SZmADlOhkQk")
    .setURL("https://www.youtube.com/watch?v=SZmADlOhkQk")
    .addField(
      "Info",
      "Toutes ces infos sont disponibles plus précisément grâce à la commande ``!help``"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(rules_img)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};
