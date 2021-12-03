const Discord = require("discord.js");

const { IMG, GIF, EMOTE, COLOR } = require("../ressources.json"); // Ressources required for the system

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
    .setColor(COLOR.MAIN_COLOR)
    .setTitle(`Bienvenue ${member.user.tag} !`)
    .setDescription(
      "Bienvenue sur le serveur du Cril ! Tu **suivra** les étapes suivantes pour valider ton entrée dans ce dernier !"
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
  title,
  step
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
    case "Département d'étude":
      txt_instruction =
        "Merci d'__entrer__ puis d'__envoyer__ le **numéro** correspondant à votre département d'étude **dans le chat** en bas";
      break;
  }

  const row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("beforeUnderButton")
      .setLabel("Champ précédent")
      .setStyle("SECONDARY"),

    new Discord.MessageButton()
      .setCustomId("entryButton")
      .setLabel("Valider")
      .setStyle("PRIMARY")
      .setEmoji("✔️")
  );

  const embed = new Discord.MessageEmbed()
    .setTitle("Présentation : " + title)
    .setColor(COLOR.SECOND_COLOR[0])
    .setAuthor("Cril", msg.guild.iconURL())
    .setThumbnail(msg.author.avatarURL())
    .setDescription(
      `${EMOTE.CHECK_EMOTE} ${txt_instruction} \n | Revenez sur le champs grâce précédent grâce au bouton en bas !`
    )
    .addField("Prénom", "``" + firstname_ + "``\n", true)
    .addField("Nom", "``" + secondname_ + "``\n", true)
    .addField("Département", "``" + SCHOOL_ + "``\n", true)
    .setImage(GIF.ENTRY_GIF)
    .setTimestamp()
    .setFooter(
      `Etape ${
        step + 1
      } / 3 : ${title} \n Cliquez sur valider une fois tous les champs renseignés !`
    );

  if (step === 2) {
    embed.addField(
      "Département : ",
      "**[1]** : 📕 - GEAR \n **[2]** : 🛠️ - GMP \n **[3]** : 📗 - GEAP \n  **[4]** : 🏗️ - GCCD \n  **[5]** : 💾 - INFOCOM \n  ",
      true
    );
    embed.addField(
      "Département : ",
      "**[6]** : 🔭 - MEPH \n **[7]** : 🔬 - GCGP \n **[8]** : 💻 - INFO \n  **[9]** : 💡 - GEII \n  **[10]** : 📈 - TECH DE CO \n  ",
      true
    );
    embed.addField(
      `${EMOTE.GEAR_EMOTE} | Instruction`,
      "Merci d'entrer une valeur __**Numérique**__"
    );
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
    .setColor(COLOR.SECOND_COLOR[2])
    .setTitle(`Les règles !`)
    .setDescription("Lorem Ipsum")
    .addField("Règle 1", "Trucs chiants")
    .addField("Règle 2", "Trucs chiants")
    .addField("Règle 3", "Trucs chiants")
    .addField("Règle 4", "Trucs chiants")
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
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
    .setColor(COLOR.SECOND_COLOR[2])
    .setTitle(`Les règles !`)
    .setDescription(
      "Cliquez sur la réaction pour valider le consentement à l'application de ces règles."
    )
    .addField("Règle 5", "Trucs chiants")
    .addField("Règle 6", "Trucs chiants")
    .addField("Règle 7", "Trucs chiants")
    .addField("Règle 8", "Trucs chiants")
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
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
    .setColor(COLOR.SECOND_COLOR[2])
    .setTitle(`Premières manipulation !`)
    .setDescription("https://www.youtube.com/watch?v=SZmADlOhkQk")
    .setURL("https://www.youtube.com/watch?v=SZmADlOhkQk")
    .addField(
      "Info",
      "Toutes ces infos sont disponibles plus précisément grâce à la commande ``!help``"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};
