const Discord = require("discord.js");

const {
  IMG,
  GIF,
  EMOTE,
  COLOR,
  IUT,
  ROLES,
  CHANNELS,
} = require("../ressources.json"); // Ressources required for the system

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
 * @param {Discord.GuildMember} member
 * @param {Number} page

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
    .addField(
      " | 1️⃣ : ",
      "Pas de pseudos - **Seuls** vos Nom, Prénom et Département de l’IUT sont acceptés"
    )
    .addField(
      " | 2️⃣ : ",
      "Présentez-vous par écrit sur le channel de votre activité / du coaching avant de commencer pour que l'équipe enregistre votre présence. **__C’est OBLIGATOIRE__**"
    )
    .addField(
      " | 3️⃣ : ",
      "Pas de retards **__de plus de 5 min__** (comme au CRIL en présentiel)"
    )
    .addField(
      " | 4️⃣ : ",
      "Vous ne pouvez participer à une activité / un coaching que si vous avez réservé via RésaCril au préalable"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};

/**
 *  Constructor of the third template page
 *
 * @param {Discord.GuildMember} member
 * @param {Number} page

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
    .addField(
      " | 5️⃣ : ",
      `Pas d'insultes ni de harcèlement quelle que soit la langue, ni dans les chat, ni en MP. \n => Si vous êtes victime d'insultes ou de harcèlement, contactez immédiatement un Responsable. Pas de propos discriminatoires (sexisme, racisme, etc).`
    )
    .addField(
      " | 6️⃣ : ",
      `Les décisions des Responsables et des Tuteurs font loi comme au CRIL en présentiel : un comportement inadéquat en activité, coaching ou dans les canaux Just Chatting fera l'objet d'une exclusion et d'une mention sur votre dossier Résacril, et vos enseignants et directeurs d'études seront mis au courant.`
    )
    .addField(
      " | 7️⃣ : ",
      `Confirmez la validation des règles en cochant l'émoji ci-dessous avant de confirmer votre lecture et votre approbation de l'application de ces règles.`
    )
    .addField(
      " | 8️⃣ : ",
      `Posez toutes vos questions dans le channel <#${CHANNELS.SUPPORT_CHANNEL}>  et pas dans un channel au hasard. \n => Vos demandes risquent de ne pas être traitées si elles ne sont pas au bon endroit`
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
    .setFooter(`${page + 1}/5`)
    .setTimestamp();

  return { embed, row, collector_require };
};

/**
 *  Constructor of the fourth template page
 *
 * @param {Discord.GuildMember} member
 * @param {Number} page

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
    .setDescription(IUT.YT_LINK)
    .setURL(IUT.YT_LINK)
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

/**
 *  Constructor of the first template DM
 *
 * @param {Discord.GuildMember} member
 * @param {Number}

 * @return {Template} The template object
 */
module.exports.DMEmbed = function (member) {
  let embed = new Discord.MessageEmbed()
    .setColor(COLOR.SECOND_COLOR[2])
    .setTitle(`Lien utiles !`)
    .addField("Lien vers RésaCril", IUT.RESACRIL_LINK)
    .addField("Lien vers Moodle Anglais", IUT.MOODLE_LINK_ANG)
    .addField("Lien vers Moodle Espagnol", IUT.MOODLE_LINK_ESP)
    .addField("Lien vers la chaine de tuto", IUT.YT_LINK)
    .addField("Email d'assistance : ", "cril.langues@iut-tlse3.fr")
    .addField(
      "Info",
      "Toutes ces infos sont disponibles plus précisément grâce à la commande ``!help``"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setTimestamp();

  return embed;
};

/**
 *  Constructor of the RULES template DM
 *
 * 
 * @param {Discord.Message} msg
 * @param {Number}

 * @return {Template} The template object
 */
module.exports.RulesEmbed = function (member) {
  let embed = new Discord.MessageEmbed()
    .setColor(COLOR.SECOND_COLOR[2])
    .setTitle(`Les règles`)
    .addField(
      " | 1️⃣ : ",
      "Pas de pseudos - **Seuls** vos Nom, Prénom et Département de l’IUT sont acceptés"
    )
    .addField(
      " | 2️⃣ : ",
      "Présentez-vous par écrit sur le channel de votre activité / du coaching avant de commencer pour que l'équipe enregistre votre présence. **__C’est OBLIGATOIRE__**"
    )
    .addField(
      " | 3️⃣ : ",
      "Pas de retards **__de plus de 5 min__** (comme au CRIL en présentiel)"
    )
    .addField(
      " | 4️⃣ : ",
      "Vous ne pouvez participer à une activité / un coaching que si vous avez réservé via RésaCril au préalable"
    )
    .addField(
      " | 5️⃣ : ",
      `Pas d'insultes ni de harcèlement quelle que soit la langue, ni dans les chat, ni en MP. \n => Si vous êtes victime d'insultes ou de harcèlement, contactez immédiatement un Responsable. Pas de propos discriminatoires (sexisme, racisme, etc).`
    )
    .addField(
      " | 6️⃣ : ",
      `Les décisions des Responsables et des Tuteurs font loi comme au CRIL en présentiel : un comportement inadéquat en activité, coaching ou dans les canaux Just Chatting fera l'objet d'une exclusion et d'une mention sur votre dossier Résacril, et vos enseignants et directeurs d'études seront mis au courant.`
    )
    .addField(
      " | 7️⃣ : ",
      `Posez toutes vos questions dans le channel <#${CHANNELS.SUPPORT_CHANNEL}>  et pas dans un channel au hasard. \n => Vos demandes risquent de ne pas être traitées si elles ne sont pas au bon endroit`
    )
    .addField(
      "Info",
      "Des infos supplémentaires sont disponibles plus précisément grâce à la commande ``!help``"
    )
    .setAuthor("Cril", member.guild.iconURL())
    .setThumbnail(IMG.RULES_LOGO)
    .setTimestamp();

  return embed;
};
