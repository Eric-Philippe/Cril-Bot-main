const Discord = require("discord.js");

const { MENTION_TOPIC_CHANNEL, CHANNELS, ROLES } = require("./ressources.json");

const ArrayReac = ["📖", "⚔️", "🎮", "🏉", "📺", "🖥️"]; // Reaction listened

/**
 *
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
module.exports.reactionRole = async function (reaction, user) {
  let member = await reaction.message.guild.members.cache.find(
    (mb) => mb.user.id === user.id
  ); // Find member by the user
  if (!member) return; // Error handler

  let index = ArrayReac.findIndex((e) => e === reaction.emoji.name); // Find the index of the reaction selection
  if (index === -1) return; // Throw if not found

  if (
    !reaction.message.author.bot ||
    reaction.message.channel.id != CHANNELS.REAC_ROLE
  )
    return; // Return if msg is not from a bot, and in another channel

  let ArrayRoles = []; // Roles linkeds

  let entries = Object.entries(MENTION_TOPIC_CHANNEL); // Ressources Object to Array
  entries.forEach((e) => ArrayRoles.push(e[1][1])); // All the topic roles (Bit of shortcut using another system ressources)

  // Find the targeted role
  let target_role = member.guild.roles.cache.find(
    (r) => r.id === ArrayRoles[index]
  );
  if (!target_role) return; // Error Handler

  let hasRole = member.roles.cache.find((r) => r === target_role); // Has role
  if (!hasRole) {
    //Check if user already got the role or not
    member.roles.add(target_role); // Add the new role
  } else {
    member.roles.remove(hasRole); // Remove the past role
  }
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.addReacRole = async function (msg) {
  let member = msg.member; // Member
  let isMod = await member.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[0]); // Role finder

  if (!isMod) return; // Perm check

  if (!msg.reference) return msg.delete(); // If there is a target msg (Reply)

  let id = msg.reference.messageId; // Targeted msg id
  let msg_target = await msg.channel.messages.fetch(id); // Find the message to work with
  if (!msg_target) return msg.delete(); // Clean Error

  for (const element in ArrayReac) {
    // Add all the reaction to the message
    await msg_target.react(ArrayReac[element]);
  }

  msg.delete(); // Clean
};
