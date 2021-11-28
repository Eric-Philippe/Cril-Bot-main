const { test } = require("./test");

const Poll = require("./poll");
const Reminder = require("./remindMe");
const { resetSQL } = require("../SQL/RESET/resetSQL");
const Miscellanous = require("./miscellanous");
const AnswerZero = require("../helpSystem/answerLevelZero");

/**
 * Export of all the commands
 */
module.exports.commands = {
  test: {
    name: "test",
    desc: "Commande de test",
    func: test,
    perm: [0],
  },

  userinfo: {
    name: "userinfo",
    desc: "Affiche les infos de l'utilisateur cible",
    func: Miscellanous.userinfo,
    perm: [0],
  },

  avatar: {
    name: "avatar",
    desc: "Affiche l'avatar de l'utilisateur",
    func: Miscellanous.getAvatar,
    perm: [0],
  },

  embed: {
    name: "embed",
    desc: "Créateur d'embed",
    func: Miscellanous.createEmbed,
    perm: [2],
  },

  dice: {
    name: "dice",
    desc: "Lancer un dé",
    func: Miscellanous.dice,
    perm: [0],
  },

  poll: {
    name: "poll",
    desc: "Lance un sondage",
    func: Poll.poll,
    perm: [1],
  },

  Moodle: {
    name: "Moodle",
    desc: "Envoie un lien Moodle",
    func: AnswerZero.find_moodle,
    perm: [1],
  },

  remindme: {
    name: "remindme",
    desc: "Rappel",
    func: Reminder.remindMe,
    perm: [0],
  },

  resetDB: {
    name: "resetDB",
    desc: "Reset de la base de donnée",
    func: resetSQL,
    perm: [3],
  },
};
