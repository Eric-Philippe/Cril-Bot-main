const Discord = require("discord.js");

const embedDS = require("./embedDS");

/**
 * Discord VoiceChannel support
 */
module.exports = class DiscordVoiceSupport {
  /**
   * @param {Discord.Message} msg
   * @param {Discord.Message} msg_embed
   * @param {Discord.User} user
   */
  constructor(msg, msg_embed, user) {
    this.msg = msg;
    this.msg_embed = msg_embed;
    this.user = user || msg.author;
    this.page = 0;
    this.current_embed = null;
    this.emote_array = null;
    this.plateform = null; // APP | PHO | NAV
    this.problem = null; // FIND | HOW | SOUD
    this.__init__();
  }

  async __init__() {
    let array_components = await embedDS.plateformEmbed(this.msg);
    this.current_embed = array_components[0];
    await array_components.shift();
    this.emote_array = array_components;
    this.msg_embed.delete();
    this.msg_embed = await this.msg.channel.send({
      embeds: [this.current_embed],
    });
    this.__updateReac__();
    await this.reactionCollector(this.msg_embed, this.emote_array, this.user);
  }

  /**
   * General Collector
   *
   * @param {Discord.Message} msg
   * @param {Array<String>} emoteArray
   * @param {Discord.User} userP
   */
  reactionCollector(msg, emoteArray, userP) {
    const filter = (reaction, user) => {
      return (
        // [Author.id Only, emoteArrayOnly]
        user.id === userP.id && emoteArray.includes(reaction.emoji.name)
      );
    };

    const collector = msg.createReactionCollector({
      filter,
      time: 1000 * 60 * 10,
      max: 1,
    });

    collector.on("collect", async (reaction, user) => {
      await this.emoteSelector(reaction.emoji.name);
      await this.__embedSelector__();
      this.__editEmbed__();
      this.reactionCollector(this.msg_embed);
    });
  }

  /**
   *  Edit the embed with the new parameters
   */
  async __editEmbed__() {
    this.msg_embed = await this.msg_embed.edit({
      embeds: [this.current_embed],
    });
    await this.__updateReac__();
    this.reactionCollector();
  }

  /**
   * Update the reaction of the new embed
   */
  async __updateReac__() {
    this.msg_embed.reactions.removeAll();
    for (let i = 0; i < this.emote_array.length; i++) {
      await this.msg_embed.react(this.emote_array[i]);
    }
  }

  __embedSelector__() {
    console.log(this.page);
    let array_components;
    switch (this.page) {
      case 1:
        array_components = embedDS.whatUrProblemEmbed(this.msg);
        break;
    }

    this.current_embed = array_components[0];
    if (array_components[1]) {
      array_components.shift();
      this.emote_array = array_components;
    }
    this.emote_array = [];
  }

  /**
   * Main Selector for the reacCollector
   *
   * @param {String} emojiName
   */
  emoteSelector(emojiName) {
    switch (emojiName) {
      case "📱":
        this.plateform = "PHO";
        break;
      case "🖥️":
        this.plateform = "APP";
        break;
      case "🌐":
        this.plateform = "NAV";
        break;
      case "🔎":
        this.problem = "FIND";
        break;
      case "❓":
        this.problem = "HOW";
        break;
      case "🔇":
        this.problem = "SOUND";
        break;
    }

    this.page = this.page + 1;
  }
};
