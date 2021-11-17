const Discord = require("discord.js");

const { client } = require("../utils/client");
const { PREFIX } = require("../config.json");
const { commands } = require("./commands");

/**
 *
 * @param {Discord.Message} msg
 * @param {Discord.Client} client
 * @param {String} cmd
 */
module.exports.cmdGrabber = function (msg) {
  let cmd = msg.content.split(" ")[0].slice(PREFIX.length);

  try {
    commands[cmd].func(msg, client);
  } catch (err) {
    if (err.name === "ReferenceError") {
      msg.reply(
        "⚙️ | Erreur dans le programme, merci de contacter l'administration !"
      );
    } else {
      msg.reply(
        "❌ | Merci d'entrer une commande valide ! : ``La commande n'existe pas !``"
      );
    }
  }
};
