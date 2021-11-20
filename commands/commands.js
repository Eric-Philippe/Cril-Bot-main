const { test } = require("./test");

const Poll = require("./poll");
const Reminder = require("./remindMe");
const { resetSQL } = require("../SQL/RESET/resetSQL");

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

  poll: {
    name: "poll",
    desc: "Lance un sondage",
    func: Poll.poll,
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
