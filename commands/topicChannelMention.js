const Discord = require("discord.js");

const { MENTION_TOPIC_CHANNEL } = require("../ressources.json");

/**
 * Mention specific roles linked to a channel
 *
 * @param {Discord.Message} msg
 */
module.exports.topicChannelMention = async function (msg) {
  let entries = Object.entries(MENTION_TOPIC_CHANNEL); // Ressources Object to Array
  let entrie = entries.find((e) => e[1][0] === msg.channel.id); // Find the linked one

  if (!entrie) return; // Error Handler

  let mention_role = msg.guild.roles.cache.find((r) => r.id === entrie[1][1]); // Find the role to mention
  if (!mention_role) return; // Error Handler

  let args = msg.content.split(" "); // Check if there is content to send
  if (!args[1]) return; // Avoid empty mention

  let content = args.slice(1).join(" "); // Message content without cmd
  let embed = new Discord.MessageEmbed() // Embed constructor
    .setColor("BLURPLE")
    .setDescription(content);

  await msg.channel.send(`||<@&${mention_role.id}>||`); // Send the mention
  await msg.channel.send({ embeds: [embed] }); // Send the content embed
};
