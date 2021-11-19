const { test } = require("./test");

const Poll = require("./poll");

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
};
