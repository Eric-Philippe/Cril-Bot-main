const Discord = require("discord.js");
const { con } = require("../utils/mysql");

const {
  roles,
  support_channel,
  activities_channel,
} = require("./ressource.json");
const CoolDown_Min = 2;

const talkedRecently = new Set();

/**
 * Filter the user for the chatBot
 *
 * @param {Discord.Message} msg
 * @param {String} category
 *
 * @returns {Boolean} boolean
 */
const filter = async function (msg, category) {
  if (
    msg.channel.id != support_channel &&
    !activities_channel.includes(msg.channel.id)
  )
    return;
  let member = msg.member;
  let member_roles = member.roles.cache.toJSON();
  let isMod = member_roles.some((item) => roles.includes(item.id));
  if (isMod) return;
  if (msg.channel.id != support_channel && category != "FIND_ACTIVITY") return;
  let user = msg.author;
  if (talkedRecently.has(user.id)) return;
  talkedRecently.add(user.id);
  setTimeout(() => {
    talkedRecently.delete(user.id);
  }, 1000 * 60 * CoolDown_Min);
  return true;
};

exports.filter = filter;
