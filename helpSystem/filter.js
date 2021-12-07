const Discord = require("discord.js");

const { ROLES, CHANNELS } = require("../ressources.json"); // Stuff needed for the filter
const CoolDown_Hour = 1; // Time in hour between two help

const talkedRecently = new Set(); // CoolDown SET

/**
 * Filter the user for the chatBot
 *
 * @param {Discord.Message} msg
 * @param {Array} Answer
 *
 * @returns {Boolean} boolean
 */
const filter = async function (msg, answer) {
  // Check if good channel (Avoid Flood)
  if (
    msg.channel.id != CHANNELS.SUPPORT_CHANNEL &&
    !CHANNELS.ACTIVITIES_CHANNEL.includes(msg.channel.id)
  )
    return;
  if (msg.content.length < 10) return;
  let member = msg.member;
  let member_roles = member.roles.cache.toJSON();
  let isMod = member_roles.some((item) => ROLES.MOD_ROLES.includes(item.id));
  // Check if not Admin (No need)
  if (isMod) return;

  // Only launch FIND_ACTIVITY HELP in not support channel if the answers are close
  if (
    msg.channel.id != CHANNELS.SUPPORT_CHANNEL &&
    answer[2] != "FIND_ACTIVITY"
  ) {
    if (answer[1] > 6) return;
  }
  let user = msg.author;
  // CoolDown Filter
  if (talkedRecently.has(user.id)) return;
  // Add CoolDown then delete it after 1h
  talkedRecently.add(user.id);
  setTimeout(() => {
    talkedRecently.delete(user.id);
  }, 1000 * 60 * 60 * CoolDown_Hour);
  return true;
};

exports.filter = filter; // Export filter chatBot
