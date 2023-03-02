const { TextChannel } = require("discord.js");

const { welcomeEmbed } = require("./coaching.embeds");
/**
 * @function generateEmbed
 * @description Generate the desk embed for the coaching channel
 * @param {TextChannel} channel
 */
const generateEmbed = (channel) => {
  channel.send(welcomeEmbed());
};

module.exports = generateEmbed;
