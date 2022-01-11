const Discord = require("discord.js");

const { packEmbed } = require("../answerLevelZero");
const embedFA = require("./embedFA");
/**
 * Activity Finder Class
 */
module.exports = class Find_Activity {
  /**
   *
   * @param {Discord.Message} msg
   * @param {Discord.Message} msg_embed
   * @param {Discord.User} user
   */
  constructor(msg, msg_embed, user) {
    this.msg = msg;
    this.msg_embed = msg_embed;
    this.user = user || msg.author; // Can be use by the author or a targeted command
    this.current_embed = null; // Mother Embed
    this.array_component = null; // Stuff needed wich comes with the embed
    this.complement_embed = null; // Additionnal Embed
    this.page = 0; // Current page
    this.__init__();
  }

  /**
   * Initiate the array componenents, the embedMessage and the reaction that comes with
   */
  async __init__() {
    if (!this.msg_embed && this.user != this.msg.author) {
      this.msg.channel.send(`||<@${this.user.id}>||`);
    }
    this.array_component = await embedFA.main_page(this.msg); // Initiate the first Embed
    if (this.msg_embed) this.msg_embed.delete(); // Clear the past msg_embed (Picker parent)
    this.msg_embed = await this.msg.channel.send({
      embeds: [this.array_component[0]],
    }); // Add the new Embed
    this.__updateReac__(this.msg_embed); // Add the reactions
  }

  /**
   * Redirect the correct embed depending on the page
   */
  async __selector__() {
    switch (this.page) {
      case 0:
        this.array_component = await embedFA.main_page(this.msg);
        break;
      case 1:
        this.array_component = await embedFA.menu_activity(this.msg);
        break;
      //Under Pages
      case 1.1:
        this.array_component = await embedFA.fd_embed(this.msg);
        break;
      case 1.2:
        this.array_component = await embedFA.theme_discEmbed(this.msg);
        break;
      case 1.3:
        this.array_component = await embedFA.games_Embed(this.msg);
        break;
      case 1.4:
        this.array_component = await embedFA.stream_Embed(this.msg);
        break;
      case 1.5:
        this.array_component = await embedFA.coach_Embed(this.msg);
        this.complement_embed = await packEmbed(this.msg);
        break;
    }

    this.current_embed = this.array_component[0]; // First Element is the new Embed

    this.__editEmbed__(); // Change the past Embed
  }

  /**
   * Reaction Collector
   */
  async __reactionCollector() {
    let emote_array = ["✅", "🙋", "🦸", "🃏", "🎮", "🎓", "❌"]; // Reaction processed

    const filter = (reaction, user) => {
      return (
        // [AuthorId Only, EmojiArrayOnly]
        user.id === this.user.id && emote_array.includes(reaction.emoji.name)
      );
    };

    const collector = this.msg_embed.createReactionCollector({
      filter,
      time: 1000 * 60 * 10, // 10 minutes
      max: 1,
    });

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "❌") {
        // Go back to the first page
        this.page = 1;
        if (this.complement_embed) {
          this.complement_embed.delete();
          this.complement_embed = null;
        }
      } else if (this.page === 1) {
        // Selector of all the under pages
        switch (reaction.emoji.name) {
          case "🙋":
            this.page = 1.1; // Free Discussion
            break;
          case "🦸":
            this.page = 1.2; // Thematic Discussion
            break;
          case "🃏":
            this.page = 1.3; // Games
            break;
          case "🎮":
            this.page = 1.4; // Stream
            break;
          case "🎓":
            this.page = 1.5; // Coaching
            break;
        }
      } else if (reaction.emoji.name === "✅") {
        this.page = 1; // Go to page 0 to 1
      }

      this.__selector__();
    });

    collector.on("end", (collected, reason) => {
      // Auto clear the message if not used
      if (this.page === 0 || this.page === "1") {
        if (reason === "time") {
          if (this.msg_embed) this.msg_embed.delete();
        }
      }
    });
  }

  /**
   * Edit the past Embed with the new one
   */
  __editEmbed__() {
    this.msg_embed.edit({
      embeds: [this.current_embed],
      component: null,
    });
    this.__updateReac__(this.msg_embed); // Update all the reaction
  }

  /**
   *  Update all the past reaction for the new ones
   *
   * @param {Discord.Message} msg
   */
  __updateReac__(msg) {
    msg.reactions.removeAll();
    for (let i = 1; i < this.array_component.length; i++) {
      // Loop all around the reaction of the components
      // After 1 (0 is the embed)
      msg.react(this.array_component[i]); // Add the element reaction
    }
    this.__reactionCollector(); // Send to the Collector back
  }
};
