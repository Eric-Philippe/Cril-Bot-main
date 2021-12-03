const Discord = require("discord.js");

const { ROLES, CHANNELS } = require("../ressources.json");
const CoolDown_Min = 2;

const talkedRecently = new Set();

/**
 * Filter the user for the chatBot
 *
 * @param {Discord.Message} msg
 * @param {Array} Answer
 *
 * @returns {Boolean} boolean
 */
const filter = async function (msg, answer) {
  if (
    msg.channel.id != CHANNELS.SUPPORT_CHANNEL &&
    !CHANNELS.ACTIVITIES_CHANNEL.includes(msg.channel.id)
  )
    return;
  let member = msg.member;
  let member_roles = member.roles.cache.toJSON();
  let isMod = member_roles.some((item) => ROLES.MOD_ROLES.includes(item.id));
  if (isMod) return;
  if (
    msg.channel.id != CHANNELS.SUPPORT_CHANNEL &&
    answer[2] != "FIND_ACTIVITY"
  ) {
    if (answer[1] > 6) return;
  }
  let user = msg.author;
  if (talkedRecently.has(user.id)) return;
  talkedRecently.add(user.id);
  setTimeout(() => {
    talkedRecently.delete(user.id);
  }, 1000 * 60 * CoolDown_Min);
  return true;
};

exports.filter = filter;
