const { test } = require("./test");

const { poll } = require("./poll");

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
    func: poll,
    perm: [1],
  },
};
