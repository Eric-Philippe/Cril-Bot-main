const Discord = require("discord.js");

const { PREFIX } = require("../config.json");
const { commands } = require("./commands");

const { ROLES, SUPER_ADMIN } = require("../ressources.json");

/**
 *  Command Launcher
 *
 * @param {Discord.Message} msg
 */
module.exports.cmdGrabber = async function (msg) {
  let cmd = msg.content.split(" ")[0].slice(PREFIX.length);
  let user = msg.mentions.users.first() || msg.author;

  try {
    let isAllowed = await permCheck(msg, commands[cmd].perm[0]);
    if (isAllowed) {
      commands[cmd].func(msg, false, user);
    } else {
      msg
        .reply("❌ | Vous n'avez pas la permission d'entrer cette commande !")
        .then((m) => {
          setTimeout(() => m.delete(), 10000);
        });
    }
  } catch (err) {
    if (err.name === "ReferenceError") {
      // Command Error
      console.log(err);
      msg.reply(
        "⚙️ | Erreur dans le programme, merci de contacter l'administration ! \n Autrement, merci de vous renseigner sur cette commande à l'aide la commande suivante : ``!help 'nom de la commande'``"
      );
    }
  }
  //msg.delete();
};

/**
 * Perm' Authorization
 *
 * @param {Discord.Message} msg
 * @param {Number} permLevel
 */
const permCheck = function (msg, permLevel) {
  let admin = msg.guild.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[0]);
  let tut = msg.guild.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[1]);
  let tut_ass = msg.guild.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[2]);

  switch (permLevel) {
    case 0:
      return true;
    case 1:
      if (
        msg.member.roles.cache.find(
          (r) => r === admin || r === tut || r === tut_ass
        )
      ) {
        return true;
      } else {
        return false;
      }
    case 2:
      if (msg.member.roles.cache.find((r) => r === admin)) {
        return true;
      } else {
        return false;
      }
    case 3:
      if (msg.author.id === SUPER_ADMIN[0]) {
        return true;
      } else {
        return false;
      }
  }
};
