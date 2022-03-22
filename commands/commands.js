const { test } = require("./test");
const Poll = require("./poll");
const Miscellanous = require("./miscellanous");
const AnswerZero = require("../helpSystem/answerLevelZero");
const manualLauncherHelp = require("../helpSystem/manualLauncher");
const aliasTxt = require("./aliasTxt");
const { topicChannelMention } = require("./topicChannelMention");
const { addReacRole, addTS } = require("../pluginEmbed");

/**
 *  Launcher of the help command
 *
 * @param {Discord.Message} msg
 */
const help = function (msg) {
  let args = msg.content.split(" "); // Targeted cmd
  if (commands[`${args[1]}`]) {
    helpHelp(msg, commands[`${args[1]}`]); // Targeted help
  } else {
    // If does not exists, display them all
    new Help(msg);
  }
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
    format: "test",
    exemple: [["test", "Lance la commande de test"]],
  },

  help: {
    name: "help",
    desc: "Affiche la commande d'aide aux commandes",
    func: help,
    perm: [0],
    format: "help <Nom Commande>",
    exemple: [
      ["help", "Affiche les pages de toutes les commandes"],
      ["help userinfo", "Affiche l'aide sur la commande userinfo"],
    ],
  },

  userinfo: {
    name: "userinfo",
    desc: "Affiche les informations de l'utilisateur cible",
    func: Miscellanous.userinfo,
    perm: [0],
    format: "userinfo <@User>",
    exemple: [
      [
        "userinfo",
        "Affiche les informations utilisateur de l'auteur du message",
      ],
      ["userinfo @Skynet", "Affiche les informations de l'utilisateur Skynet"],
    ],
  },

  avatar: {
    name: "avatar",
    desc: "Affiche l'avatar de l'utilisateur",
    func: Miscellanous.getAvatar,
    perm: [0],
    format: "avatar <@User>",
    exemple: [
      ["avatar", "Affiche l'avatar de l'auteur du message"],
      ["avatar @Marie", "Affiche l'avatar de l'utilisateur Marie"],
    ],
  },

  dice: {
    name: "dice",
    desc: "Lancer un dé",
    func: Miscellanous.dice,
    perm: [0],
    format: "dice <Nombre de Face>",
    exemple: [
      ["dice", "Lance un dé à 6 faces"],
      ["dice 64", "Lancé un dé de 64 faces"],
    ],
  },

  coffee: {
    name: "coffee",
    desc: "Give power with coffee GIF",
    func: Miscellanous.coffee,
    perm: [1],
    format: "coffee",
    exemple: [["coffee", "Envoie un gif de café"]],
  },

  poll: {
    name: "poll",
    desc: "Lance un sondage",
    func: Poll.poll,
    perm: [1],
    format:
      'poll ["Titre"] <"Proposition1"> <"Proposition2"> ... <"Proposition10">',
    exemple: [
      [
        'poll "Je suis un sondage ?"',
        "Créer un sondage avec une question fermée sur le sujet 'Je suis un sondage ?'",
      ],
      [
        'poll "Je suis un super sondage" "Un peu" "beaucoup" "clairement"',
        "Créer un sondage avec comme propositions 'Un peu', 'beaucoup', 'clairement'",
      ],
    ],
  },

  Rules: {
    name: "Rules",
    desc: "Envoie le cadre avec toutes les règles du serveur",
    func: manualLauncherHelp.rules_embed,
    perm: [1],
    format: "Rules",
    exemple: [["Rules", "Envoie un cadre avec les règles du serveur"]],
  },

  Moodle: {
    name: "Moodle",
    desc: "Envoie un lien Moodle",
    func: AnswerZero.find_moodle,
    perm: [1],
    format: "Moodle <@User>",
    exemple: [["Moodle", "Envoie un cadre avec le lien vers Moodle"]],
  },

  Resacril: {
    name: "Resacril",
    desc: "Envoie un lien vers Résacril",
    func: AnswerZero.find_ResaCril,
    perm: [1],
    format: "Resacril <@User>",
    exemple: [["Resacril", "Envoie un cadre avec le lien vers Resacril"]],
  },

  Fiches: {
    name: "Fiches",
    desc: "Envoie un lien vers la création de fiche",
    func: AnswerZero.find_fiche,
    perm: [1],
    format: "Fiches <@User>",
    exemple: [
      ["Fiches", "Envoie un cadre avec le lien vers la création de fiche"],
    ],
  },

  Validation: {
    name: "Validation",
    desc: "Envoie un lien vers la validation RésaCril",
    func: AnswerZero.find_Validation,
    perm: [1],
    format: "Validation <@User>",
    exemple: [
      [
        "Validation",
        "Envoie un cadre avec le lien vers le récapitulatif de validation d'activité",
      ],
    ],
  },

  Pack: {
    name: "Pack",
    desc: "Envoie un lien vers les pack spécifiques Moodle",
    func: AnswerZero.packEmbed,
    perm: [1],
    format: "Pack <@User>",
    exemple: [
      ["Pack", "Envoie un cadre avec le lien vers tous les packs disponibles"],
    ],
  },

  FindActivity: {
    name: "FindActivity",
    desc: "Envoie la procédure pour trouver les channels d'activités",
    func: manualLauncherHelp.findChannel,
    perm: [1],
    format: "FindActivity <@User>",
    exemple: [
      [
        "FindActivity @Teluob",
        "Envoie la procédure auprès de l'utilisateur Teluob pour trouver son channel d'activité",
      ],
    ],
  },

  DiscordAs: {
    name: "DiscordAs",
    desc: "Envoie la procédure pour corriger les problèmes vocaux.",
    func: manualLauncherHelp.discord_assistance,
    perm: [1],
    format: "DiscordAs <@User>",
    exemple: [
      [
        "DiscordAs @Teluob",
        "Envoie la procédure auprès de l'utilisateur Teluob pour corriger ses problèmes de son",
      ],
    ],
  },

  deb: {
    name: "deb",
    desc: "Envoie la template de message de début de parcours à faire.",
    func: aliasTxt.deb,
    perm: [1],
    format: "deb",
    exemple: [["deb", "Envoie la template du début de parcours à faire."]],
  },

  debcomm: {
    name: "debcomm",
    desc: "Envoie la template de la fiche de début de coaching commentée.",
    func: aliasTxt.debcomm,
    perm: [1],
    format: "debcomm",
    exemple: [
      [
        "debcomm",
        "Envoie la template de la fiche de début de coaching commentée.",
      ],
    ],
  },

  fcomm: {
    name: "fcomm",
    desc: "Envoie la template de la dernière fiche de parcours commentée.",
    func: aliasTxt.fcomm,
    perm: [1],
    format: "fcomm",
    exemple: [
      ["fcomm", "Envoie la template de la dernière fiche coaching commentée."],
    ],
  },

  email: {
    name: "email",
    desc: "Envoie la template de mail.",
    func: aliasTxt.email,
    perm: [1],
    format: "email",
    exemple: [["email", "Envoie la template contenant le mail du Cril."]],
  },

  newCreneaux: {
    name: "newCreneaux",
    desc: "Mentionne les Etudiants puis envoie la template de message de nouveaux créneaux disponibles.",
    func: aliasTxt.newCreneaux,
    perm: [2],
    format: "newCreneaux",
    exemple: [
      [
        "newCreneaux",
        "Mentionne les Etudiants puis envoie la template de message de nouveaux créneaux disponibles.",
      ],
    ],
  },

  embed: {
    name: "embed",
    desc: "Créateur d'embed",
    func: Miscellanous.createEmbed,
    perm: [2],
    format: 'embed <"t Titre t"> <"img URL img"> [Contenu du cadre]',
    exemple: [
      ["embed Salut", "Envoi un embed avec pour description 'Salut'"],
      [
        'embed "t Je suis un Titre t" "img URL img" Salut je suis une description !',
        "Envoie un embed avec comme titre 'Je suis un titre', avec pour image l'URL' et comme description 'Salut je suis une description'",
      ],
    ],
  },

  addReacRole: {
    name: "addReacRole",
    desc: "Ajoute les réactions pour un message de RolesReaction (Requiert de rédiger la commande en réponse à l'embed cible)",
    func: addReacRole,
    perm: [2],
    format: "addReacRole (Répondre au message ciblé)",
    exemple: [
      [
        "addReacRole (Ciblé sur le cadre en réponse)",
        "Ajoute les réactions nécessaires au message répondu",
      ],
    ],
  },

  addTS: {
    name: "addTS",
    desc: "Créer un nouveau tirage au sort sur un embed (Requiert de rédiger la commande en réponse à l'embed cible)",
    func: addTS,
    perm: [2],
    format:
      "addTS [[Nombre Réponse,Numéro de la bonne réponse]] [Nombre d'heure]",
    exemple: [
      [
        "addTS [3,2] 5",
        "Ajoute un tirage au sort de 3 propositions, avec la réponse 2 comme solution, pendant 5h",
      ],
    ],
  },

  topic: {
    name: "topic",
    desc: "Mentionne le rôle correspondant au topic du channel",
    func: topicChannelMention,
    perm: [2],
    format: "topic [Contenu du message à envoyer]",
    exemple: [
      [
        'topic Vive les livres (Dans le channel "📚-books")',
        'Envoie "Vive les livres" avec la mention @bookworm',
      ],
    ],
  },
};

module.exports.commands = commands; // Export all the command for the launcher

// ####################### Help command #########################
const Discord = require("discord.js");

const { IMG, ROLES } = require("../ressources.json"); // Import Help Logo
const { PREFIX } = require("../config.json"); // Prefix import

/**
 * Commands Navigation Display Class
 */
class Help {
  /**
   *  Constructor of the navigation
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

  /**
   * Initiate the first parameters of the source embed
   */
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
 *  Return the free commands Embed
 *
 * @param {Discord.Message} m
 * @returns {Discord.MessageEmbed} Embed
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
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
    .addField("‎", "‎") // Blank Fields

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

  let isAllowed = roles_user.find((element) => roles_array.includes(element)); // If user is allowed to have access to thoses cmd

  let i = 0; // Counter off cmd avaibles for the user
  if (isAllowed) {
    for (const property in commands) {
      // Loop on all the command of perm level 0
      if (commands[property]["perm"][0] === 0) {
        let cmd = commands[property];
        // Update the final embed
        embed.addField(
          `🔘 | ${PREFIX + cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !"); // Case if no cmd avaiable

  return embed;
};

/**
 * Return the tutor commands
 *
 * @param {Discord.Message} m
 * @returns {Discord.MessageEmbed} Embed
 */
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
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
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

  let i = 0; // Number of cmd avaiable
  if (isAllowed) {
    // Show all command avaible for this user
    for (const property in commands) {
      // Loop all around the commands of perm level 1
      if (commands[property]["perm"][0] === 1) {
        let cmd = commands[property];
        // Update the final Embed
        embed.addField(
          `🔘 | ${PREFIX + cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !"); // Case of no cmd avaiable

  return embed;
};

/**
 * Return the Admin commands Embed
 *
 * @param {Discord.Message} m
 * @returns {Discord.MessageEmbed} Embed
 */
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
    .addField("Page précédente : ", "⏮️ - Reculer d'une page", true)
    .addField("Page suivante : ", "⏭️ -  Avancer d'une page", true)
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

  let isAllowed = roles_user.find((element) => roles_array.includes(element)); // Perm level satisfaction

  let i = 0; // Number of cmd avaiable
  if (isAllowed) {
    for (const property in commands) {
      // Loop all around the commands of perm level 2
      if (commands[property]["perm"][0] === 2) {
        let cmd = commands[property];
        // Update the final Embed
        embed.addField(
          `🔘 | ${PREFIX + cmd["name"]}`,
          "**``" + cmd["desc"] + "``** \n" + "``" + cmd["format"] + "``"
        );
        i++;
      }
    }
  }

  if (i === 0) embed.setDescription("Aucune commande accessible !"); // Case of no cmd avaiable

  return embed;
};

/**
 *  Help about all the command
 *
 * @param {Discord.Message} msg
 * @param {Object} cmd
 */
const helpHelp = function (msg, cmd) {
  let embedHelp = new Discord.MessageEmbed() // Embed Help Creator
    .setAuthor("🔎 | Cril Aide")
    .setTitle(`Aide de la commande ${cmd.name}`) // Name of the targeted cmd
    .setThumbnail(IMG.HELP_LOGO) //Gif Help Logo from @Tatsumaki bot
    .setColor("RED")
    .setDescription("```" + cmd.desc + "```") // Description of the cmd
    .setFooter(
      `Légende : [] => Paramètres Obligatoires - <> => Paramètres Facultatifs`,
      msg.member.guild.iconURL()
    )
    .addField("Format : ", "``" + cmd.format + "``"); // Formaat of the cmd
  for (const element in cmd.exemple) {
    // Display all the exemples avaibles with their result
    embedHelp.addField(
      "Exemple : ",
      "``" +
        "🔘| " +
        PREFIX +
        cmd.exemple[element][0] + // Input exemple
        "``" +
        "\n **-**" +
        cmd.exemple[element][1], // Output exemple
      true
    );
  }

  msg.channel.send({ embeds: [embedHelp] }); // Send the embed
};

module.exports.help = help; // Export the parent launcher
