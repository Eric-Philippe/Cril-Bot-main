const Discord = require("discord.js");
/**
 *
 * @param {Set} set
 * @param {Discord.Message} msg
 * @param {number} time
 */
module.exports.coolDown = function (set, msg, time) {
  if (set.has(msg.author.id)) {
    msg.channel
      .send(
        `Merci d'attendre ${time} secondes avant de rentrer à nouveau une commande ! ${msg.author} !`
      )
      .then((m) => {
        setTimeout(() => {
          m.delete;
          msg.delete;
        }, 20000);
      });
  } else {
    set.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(msg.author.id);
    }, time * 1000);
  }
};
