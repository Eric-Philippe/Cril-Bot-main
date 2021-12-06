const { test } = require("./test");
const Poll = require("./poll");
const Reminder = require("./remindMe");
const { resetSQL } = require("../SQL/RESET/resetSQL");
const Miscellanous = require("./miscellanous");
const AnswerZero = require("../helpSystem/answerLevelZero");

const help = function (msg) {
  new Help(msg);
};

/**
 * Export of all the commands
 */
const commands = {
  test: {
    name: "test",
    desc: "Commande de test",
    func: test,
    perm: [-1],
    help: "Test du bot",
    format: "test",
    exemple: ["test"],
  },

  help: {
    name: "help",
    desc: "Affiche la commande d'aide aux commandes",
    func: help,
    perm: [0],
    help: "Aide",
    format: "help <Nom Commande>",
    exemple: ["help", "help help"],
  },

  userinfo: {
    name: "userinfo",
    desc: "Affiche les infos de l'utilisateur cible",
    func: Miscellanous.userinfo,
    perm: [0],
    help: "Affiche les informations de l'utilisateur",
    format: "userinfo <@User>",
    exemple: ["userinfo", "userinfo @User"],
  },

  avatar: {
    name: "avatar",
    desc: "Affiche l'avatar de l'utilisateur",
    func: Miscellanous.getAvatar,
    perm: [0],
    help: "Affiche l'avatar de l'utilisateur",
    format: "avatar <@User>",
    exemple: ["avatar", "avatar @User"],
  },

  embed: {
    name: "embed",
    desc: "Créateur d'embed",
    func: Miscellanous.createEmbed,
    perm: [2],
    help: "Créer un cadre de couleur avec plusieurs paramètres",
    format: 'embed <"t Titre t"> <"img URL img"> [Contenu du cadre]',
    exemple: [
      "embed Salut Je suis un Cadre",
      'embed "t Je suis un Titre t" "img URL img" Salut je suis une description !',
    ],
  },

  dice: {
    name: "dice",
    desc: "Lancer un dé",
    func: Miscellanous.dice,
    perm: [0],
    help: "Lancer un dé",
    format: "dice <Nombre de Face>",
    exemple: ["dice", "dice 64"],
  },

  poll: {
    name: "poll",
    desc: "Lance un sondage",
    func: Poll.poll,
    perm: [1],
    help: "Créer un sondage",
    format:
      'poll ["Titre"] <"Proposition1"> <"Proposition2"> ... <"Proposition10">',
    exemple: [
      'poll "Je suis un sondage"',
      'poll "Je suis un super sondage" "Un peu" "beaucoup" "clairement"',
    ],
  },

  Moodle: {
    name: "Moodle",
    desc: "Envoie un lien Moodle",
    func: AnswerZero.find_moodle,
    perm: [1],
    help: "Affiche le lien vers Moodle",
    format: "Moodle <@User>",
    exemple: ["Moodle", "Moodle @User"],
  },

  remindme: {
    name: "remindme",
    desc: "Rappel",
    func: Reminder.remindMe,
    perm: [0],
    help: "Créer le rappel à une date donnée",
    format: "remindme [DD/MM/YYYY] [HHhMM] [Rappel]",
    exemple: ["remindme 13/05/2022 10h00 Activité Thématique"],
  },

  resetDB: {
    name: "resetDB",
    desc: "Reset de la base de donnée",
    func: resetSQL,
    perm: [3],
    help: "Reset la base donnée",
    format: "resetDB",
    exemple: ["NE PAS UTILISER"],
  },
};

module.exports.commands = commands; // Export all the command for the launcher

// ############# Help command #############
const Discord = require("discord.js");

const { IMG, ROLES } = require("../ressources.json"); // Import Help Logo

/**
 * Help Display
 */
class Help {
  /**
   *
   * @param {Discord.Message} msg
   */
  constructor(msg) {
    this.msg = msg; // Author Message
    this.channel = msg.channel; // Channel Author Message
    this.msgEmbed = null; // Display
    this.page = 1; // Current Page
    this.__init__();
  }

  async __init__() {
    let embed = await embed1(this.msg); // Initiate the first embed
    await this.channel.send({ embeds: [embed] }).then(async (m) => {
      // Send it
      await this.addReac(m); // Add the reaction for the navigation
      await this.reacCollector(m); // Launch the navigation
      this.msgEmbed = m; // Add the new message at the class
    });
  }

  /**
   *  Select the embed with the page
   *
   * @returns {Discord.MessageEmbed} Embed
   */
  __selector__() {
    switch (this.page) {
      case 1:
        return embed1(this.msg); // All users
      case 2:
        return embed2(this.msg); // Tuteurs
      case 3:
        return embed3(this.msg); // Responsables
    }
  }

  /**
   * Edit the help message with the new page
   */
  async __edit__() {
    let embed = this.__selector__(); // Get the new embed
    this.msgEmbed.edit({ embeds: [embed] }); // Change the past embed
    this.reacCollector(this.msgEmbed); // Initiate the new launcher
  }

  /**
   * Launcher of the navigation
   *
   * @param {Discord.Message} m
   */
  reacCollector(m) {
    let array_emote = ["📗", "📘", "📕", "⏮️", "⏭️"]; // Emote allowed to launch the next steps

    const filter = (reaction, user) => {
      // Filter [Emote, Author]
      return (
        array_emote.includes(reaction.emoji.name) &&
        user.id === this.msg.author.id
      );
    };

    const collector = m.createReactionCollector({
      filter,
      time: 1000 * 60, // 1 minute
      max: 1,
    });

    collector.on("collect", (reaction, user) => {
      // Navigation Selector depending on the emote
      switch (reaction.emoji.name) {
        case "📗":
          this.page = 1;
          break;
        case "📘":
          this.page = 2;
          break;
        case "📕":
          this.page = 3;
          break;
        case "⏮️": // Page - 1
          this.page = this.page === 1 ? 3 : this.page - 1;
          break;
        case "⏭️": // Page + 1
          this.page = this.page === 3 ? 1 : this.page + 1;
          break;
      }
      reaction.users.remove(user.id); // Soft Reset of the board
      this.__edit__(); // Change in consequence
    });
  }
  /**
   *  Add Reaction to a message
   *
   * @param {Discord.Message} m
   */
  async addReac(m) {
    // Add all reaction in order
    await m.react("📗");
    await m.react("📘");
    await m.react("📕");
    await m.react("⏮️");
    await m.react("⏭️");
  }
}

/**
 *
 * @param {Discord.Message} m
 * @returns
 */
const embed1 = function (m) {
  let embed = new Discord.MessageEmbed()
    .setTitle("Commandes Disponibles de niveau 1 (Tout le monde)")
    .setColor("GREEN")
    .setAuthor(Object.keys(commands).length + " commandes totales")
    .setThumbnail(IMG.HELP_LOGO)
    .setFooter(
      `Légende : <> => Facultatif | [] => Obligatoire                                           page 1/3`
    )
    .addField("Page 1 : ", "📗 - Commandes tout Utilisateur", true)
    .addField("Page 2 : ", "📘 - Commandes Tuteurs / Assistants", true)
    .addField("Page 3 : ", "📕 - Commandes Responsables", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("‎", "‎")

    .addField(
      "🔘 | Nom de la commande",
      "**``" +
        "Description commande" +
        "``** \n" +
        "``" +
        "format <Facultatif> [Obligatoire]" +
        "``"
    );

  let roles_array = ROLES.MOD_ROLES; // All the allowed role for this page
  roles_array.push(ROLES.ETU); // All the allowed role for this page
  let roles_user = [...m.member.roles.cache.keys()]; // Array with user's roles

  let isAllowed = roles_user.find((element) => roles_array.includes(element));

  let i = 0;
  if (isAllowed) {
    for (const property in commands) {
      if (commands[property]["perm"][0] === 0) {
        let cmd = commands[property];
        embed.addField(
          `🔘 | ${cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !");

  return embed;
};

const embed2 = function (m) {
  let embed = new Discord.MessageEmbed()
    .setTitle("Commandes Disponibles de niveau 2 (Assistants / Tuteurs)")
    .setColor("BLUE")
    .setAuthor(Object.keys(commands).length + " commandes totales")
    .setThumbnail(IMG.HELP_LOGO)
    .setFooter(
      `Légende : <> => Facultatif | [] => Obligatoire                                           page 2/3`
    )
    .addField("Page 1 : ", "📗 - Commandes tout Utilisateur", true)
    .addField("Page 2 : ", "📘 - Commandes Tuteurs / Assistants", true)
    .addField("Page 3 : ", "📕 - Commandes Responsables", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("‎", "‎")

    .addField(
      "🔘 | Nom de la commande",
      "**``" +
        "Description commande" +
        "``** \n" +
        "``" +
        "format <Facultatif> [Obligatoire]" +
        "``"
    );

  let roles_array = ROLES.MOD_ROLES; // All the allowed role for this page
  let roles_user = [...m.member.roles.cache.keys()]; // Array with user's roles

  let isAllowed = roles_user.find((element) => roles_array.includes(element));
  // Return id if finded, undefiened if not found

  let i = 0;
  if (isAllowed) {
    // Show all command avaible for this user
    for (const property in commands) {
      if (commands[property]["perm"][0] === 1) {
        let cmd = commands[property];
        embed.addField(
          `🔘 | ${cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !");

  return embed;
};

const embed3 = function (m) {
  let embed = new Discord.MessageEmbed()
    .setTitle("Commandes Disponibles de niveau 3 (Reponsables)")
    .setColor("RED")
    .setAuthor(Object.keys(commands).length + " commandes totales")
    .setThumbnail(IMG.HELP_LOGO)
    .setFooter(
      `Légende : <> => Facultatif | [] => Obligatoire                                           page 3/3`
    )
    .addField("Page 1 : ", "📗 - Commandes tout Utilisateur", true)
    .addField("Page 2 : ", "📘 - Commandes Tuteurs / Assistants", true)
    .addField("Page 3 : ", "📕 - Commandes Responsables", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("‎", "‎")

    .addField(
      "🔘 | Nom de la commande",
      "**``" +
        "Description commande" +
        "``** \n" +
        "``" +
        "format <Facultatif> [Obligatoire]" +
        "``"
    );

  let roles_array = [ROLES.MOD_ROLES[0]]; // All the allowed role for this page
  let roles_user = [...m.member.roles.cache.keys()]; // Array with user's roles

  let isAllowed = roles_user.find((element) => roles_array.includes(element));

  let i = 0;
  if (isAllowed) {
    for (const property in commands) {
      if (commands[property]["perm"][0] === 2) {
        let cmd = commands[property];
        embed.addField(
          `🔘 | ${cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !");

  return embed;
};

module.exports.help = help;
