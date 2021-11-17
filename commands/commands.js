const { test } = require("./test");

/**
 * Export of all the commands
 */
module.exports.commands = {
  test: {
    name: "test",
    alias: "ts",
    desc: "Commande de test",
    func: test,
    perm: [0],
  },
};
