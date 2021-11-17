const { test } = require("./test");

module.exports.commands = {
  test: {
    name: "test",
    alias: "ts",
    desc: "Commande de test",
    func: test,
    perm: [0],
  },
};
