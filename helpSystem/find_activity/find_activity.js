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
    console.log(this.page);
    switch (this.page) {
      case 0:
        this.array_component = await embedFA.main_page(this.msg);
        break;
      case 1:
        this.array_component = await embedFA.menu_activity(this.msg);
        break;
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
        break;
    }

    this.current_embed = this.array_component[0];

    this.__editEmbed__();
  }

  async __reactionCollector() {
    let emote_array = ["✅", "🙋", "🦸", "🃏", "🎮", "🎓", "❌"];

    const filter = (reaction, user) => {
      return (
        user.id === this.msg.author.id &&
        emote_array.includes(reaction.emoji.name)
      );
    };

    const collector = this.msg_embed.createReactionCollector({
      filter,
      time: 1000 * 60 * 10,
      max: 1,
    });

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "❌") {
        this.page = 1;
        console.log(this.page);
      } else if (this.page === 1) {
        switch (reaction.emoji.name) {
          case "🙋":
            this.page = 1.1;
            break;
          case "🦸":
            this.page = 1.2;
            break;
          case "🃏":
            this.page = 1.3;
            break;
          case "🎮":
            this.page = 1.4;
            break;
          case "🎓":
            this.page = 1.5;
            break;
        }
      } else if (reaction.emoji.name === "✅") {
        this.page = 1;
      }

      this.__selector__();
    });

    collector.on("end", (collected, reason) => {
      if (this.page === 0 || this.page === "1") {
        if (reason === "time") {
          this.msg_embed.delete();
        }
      }
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
