const Discord = require("discord.js");

const embedFA = require("./embedFA");
/**
 * Activity Finder Class
 */
module.exports = class Find_Activity {
  /**
   *
   * @param {Discord.Message} msg
   * @param {Discord.Message} msg_embed
   */
  constructor(msg, msg_embed) {
    this.msg = msg;
    this.msg_embed = msg_embed;
    this.current_embed = null;
    this.array_component = null;
    this.activity = null;
    this.page = 0;
    this.__init__();
  }
  async __init__() {
    this.array_component = await embedFA.main_page(this.msg);
    if (this.msg_embed) this.msg_embed.delete();
    this.msg_embed = await this.msg.channel.send({
      embeds: [this.array_component[0]],
    });
    this.__updateReac__(this.msg_embed);
  }

  async __selector__() {
    switch (this.page) {
      case 0:
        this.array_component = await embedFA.main_page(this.msg);
        break;
      case 1:
        this.array_component = await embedFA.menu_activity(this.msg);
        break;
    }

    this.current_embed = this.array_component[0];

    this.__editEmbed__();
  }

  async __reactionCollector() {
    const filter = (reaction, user) => {
      return user.id === this.msg.author.id;
    };

    const collector = this.msg_embed.createReactionCollector({
      filter,
      time: 1000 * 60 * 10,
      max: 1,
    });

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "✅":
          if (this.page === 0) this.page = 1;
          break;
        case "📖":
          this.activity = "FREE_DISCUSSION";
          break;
        case "📔":
          this.activity = "";
          break;
        case "🔎":
          break;
        case "🎙️":
          break;
        case "🍿":
          break;
      }

      this.__selector__();
    });

    collector.on("end", (collected) => {
      console.log(collected);
    });
  }

  __editEmbed__() {
    this.msg_embed.edit({
      embeds: [this.current_embed],
      component: null,
    });
    this.__updateReac__(this.msg_embed);
  }

  __updateReac__(msg) {
    msg.reactions.removeAll();
    for (let i = 1; i < this.array_component.length; i++) {
      msg.react(this.array_component[i]);
    }
    this.__reactionCollector();
  }
};
