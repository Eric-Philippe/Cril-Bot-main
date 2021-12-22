const Discord = require("discord.js");

const { RulesEmbed } = require("../entry/entryTemplate");
const Find_Activity = require("./find_activity/find_activity");
const DiscordVoiceSupport = require("./discord_voice/main");

const { IUT } = require("../ressources.json");
module.exports = class manualLauncherHelp {
  /**
   * Launch the FindActivity class in Manual Mode
   *
   * @param {Discord.Message} msg
   * @param {Boolean} something
   * @param {Discord.User} user
   */
  static findChannel(msg, something, user) {
    new Find_Activity(msg, something, user);
  }

  /**
   * Launch the Discord Assistance class in Manual Mode
   *
   * @param {Discord.Message} msg
   * @param {Boolean} something
   * @param {Discord.User} user
   */
  static discord_assistance(msg, something, user) {
    new DiscordVoiceSupport(msg, something, user);
  }

  /**
   * Send the Rules Embed
   *
   * @param {Discord.Message} msg

   */
  static async rules_embed(msg) {
    let embed = await RulesEmbed(msg.member);
    await msg.channel.send({ embeds: [embed] });
  }
};
