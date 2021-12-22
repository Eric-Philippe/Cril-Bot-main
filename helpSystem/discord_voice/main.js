const Discord = require("discord.js");

const embedDS = require("./embedDS"); // Embed base

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
    this.msg = msg; // Original msg
    this.msg_embed = msg_embed; // Display embed
    this.user = user || msg.author; // Can be use by the author or a targeted command
    this.page = 0; // Current main page
    this.chapter = 0; // Current under page
    this.current_embed = null; // Before | New embed
    this.emote_array = null; // Emotes needed
    this.plateform = null; // APP | PHO | NAV
    this.problem = null; // FIND | HOW | SOUD
    this.__init__();
  }

  /**
   * Initiate all the variables needed
   */
  async __init__() {
    if (!this.msg_embed && this.user != this.msg.author) {
      this.msg.channel.send(`||<@${this.user.id}>||`);
    }
    let array_components = await embedDS.plateformEmbed(this.msg); // First Embed components
    this.current_embed = array_components[0]; // First element = Embed
    await array_components.shift(); // Remove the embed of the array => Only remains emote
    this.emote_array = array_components; // Emotes neeeded
    if (this.msg_embed) this.msg_embed.delete(); // Clean the old Embed
    this.msg_embed = await this.msg.channel.send({
      embeds: [this.current_embed],
    }); // Send the new Embed
    this.__updateReac__(); // Change reaction
    await this.reactionCollector(this.msg_embed, this.emote_array, this.user); // New Collector
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
      let point = await this.emoteSelector(reaction.emoji.name); // Act depending on the emote clicked
      if (point === 0) return; // Supress display case
      await this.__embedSelector__(); // Builder of the new currentEmbed
      await this.__editEmbed__(); // Change the old Embed by the new one
      if (this.emote_array.length === -1) return; // If no reaction  needed, no need of a reac collector
      this.reactionCollector(this.msg_embed, this.emote_array, this.user); // Reaction Collector
    });
  }

  /**
   *  Edit the embed with the new parameters
   */
  async __editEmbed__() {
    this.msg_embed = await this.msg_embed.edit({
      embeds: [this.current_embed],
    }); // Edit the new embed
    await this.__updateReac__(); // Edit the reaction
  }

  /**
   * Update the reaction of the new embed
   */
  async __updateReac__() {
    this.msg_embed.reactions.removeAll(); // Clear the new embed
    for (let i = 0; i < this.emote_array.length; i++) {
      // Loop all around the needed emotes
      await this.msg_embed.react(this.emote_array[i]);
    }
  }

  async __embedSelector__() {
    let array_components;
    // Selector of the Embed depending on the step
    switch (this.page) {
      case 1:
        array_components = await embedDS.whatUrProblemEmbed(
          this.msg,
          this.plateform
        );
        break;
      case 2:
        // Selector of the Embed depending on the under chapter
        switch (this.chapter) {
          case 0:
            array_components = await embedDS.FINDSolveEmbed(
              this.msg,
              this.plateform
            );
            break;
          case 1:
            array_components = await embedDS.HOWsolveEmbed(
              this.msg,
              this.plateform
            );
            break;
          case 2:
            array_components = await embedDS.SOUNDsolveEmbedFirst(
              this.msg,
              this.plateform
            );
            break;
          case 3:
            array_components = await embedDS.SOUNDsolveEmbedSec(
              this.msg,
              this.plateform
            );
            break;
          case 4:
            array_components = await embedDS.SOUNDsolveEmbedThird(
              this.msg,
              this.plateform
            );
            break;
        }
        break;
    }

    this.current_embed = array_components[0]; // First element => Embed
    // If we need emote
    if (array_components[1]) {
      array_components.shift(); // Delete embed from the array
      this.emote_array = array_components; // Emote only
    } else {
      this.emote_array = []; // Empty emote
    }
  }

  /**
   * Main Selector for the reacCollector
   *
   * @param {String} emojiName
   */
  emoteSelector(emojiName) {
    // Security | Filter of emote not wanted depending on the page
    if (this.page != 2) {
      // First selector of emote action
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
          this.chapter = 0;
          break;
        case "❓":
          this.problem = "HOW";
          this.chapter = 1;
          break;
        case "🔇":
          this.problem = "SOUND";
          this.chapter = 2;
          break;
      }
      this.page = this.page + 1;
    } else {
      // Second selector of emote action
      switch (emojiName) {
        case "↪️":
          // Clean
          try {
            this.msg_embed.delete();
            return 0;
          } catch (err) {
            console.log(err);
          }
          break;
        // Next chapter
        case "✅":
          this.chapter = this.chapter + 1;
          break;
      }
    }
  }
};
