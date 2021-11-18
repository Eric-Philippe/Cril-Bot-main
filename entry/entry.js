const Discord = require("discord.js");

const { template0, template1 } = require("./entryTemplate");

const { CATEGORY, DEPARTMENT } = require("../config.json");

/**
 * @Class Entry system fir incoming user on the server
 * @author: Zaorhion
 */
module.exports = class Entry {
  /**
   *  System constructor for GuildMember Add
   *
   * @constructor
   * @param {Discord.GuildMember} member
   */
  constructor(member) {
    this.member = member; //Member
    this.guild = member.guild; //Member Guild
    this.user = member.user; //User object from Member
    this.userInfo = []; //Array for the first second name and Department user

    this.page = 0; //Step of the Entry
    this.underPage = 0; // Under step for the first page

    /** Collector variable */
    this.buttonCollec;
    this.reactionCollec;
    this.messageCollec;

    this.channel; //Channel Entry
    this.msg; //Msg Entry
    this.__init__();
  }

  /**
   * Initiate the first information of the class
   */
  async __init__() {
    let firstname, secondname, school;
    this.userInfo.push(firstname, secondname, school);

    this.channel = await this.createChannel();

    let embed = new Discord.MessageEmbed().setTitle("Initialisation . . .");
    this.msg = await this.channel.send({ embeds: [embed] });

    this.__initSelector__();
  }

  /**
   *  Initiate the selector of the Entry system
   */
  async __initSelector__() {
    let template;

    switch (this.page) {
      case 0: // Init Page
        template = await template0(this.member);
        break;
      case 1: //User Info Page
        let titleArray = ["Prénom", "Nom de Famille", "Département"];
        template = await template1(
          this.msg,
          this.userInfo[0],
          this.userInfo[1],
          this.userInfo[2],
          titleArray[this.underPage]
        );
        break;
    }

    await this.resetCollector(); // Close all the collector

    await this.updateMessageEmbed(this.msg, template); //Display the updated page

    /** Selection of the differents collector needed for the page */
    if (template.collector_require.includes(0)) {
      this.buttonCollector(this.msg);
    }
    if (template.collector_require.includes(1)) {
      this.reactionCollector(this.msg);
    }
    if (template.collector_require.includes(2)) {
      this.messageCollector(this.msg);
    }
  }

  /**
   * Creator of the user's entry channel
   *
   * @returns {Discord.Channel}
   */
  async createChannel() {
    let category = this.guild.channels.cache.find(
      (c) => c.type === "GUILD_CATEGORY" && c.id === CATEGORY.entry
    ); // Parent Category

    if (!category) return;

    let channel_name = this.user.username.replace(/\s/g, "-"); //"User name" => "user-name"

    // Creator of the main channel
    let new_channel = await this.guild.channels.create(channel_name, {
      type: "text",
      permissionOverwrites: [
        {
          id: this.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: this.user.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
      ],
    });

    new_channel.setParent(category.id);

    return new_channel;
  }

  /**
   * Collector for the Message Button
   *
   * @param {Discord.Message} msg
   */
  buttonCollector(msg) {
    const filter = (interaction) =>
      interaction.user.id === this.user.id && interaction.isButton();
    const collector = msg.createMessageComponentCollector({
      filter,
      max: 1,
      time: 20000,
      errors: ["time"],
    });

    this.buttonCollec = collector;

    collector.on("collect", (i) => {
      switch (i.customId) {
        case "entryButton": // Validation
          this.page = 1;
          break;
        /** Allow to go all around the pages */
        case "nextUnderButton": // Next under step
          if (this.underPage === 2) {
            this.underPage = 0;
          } else {
            this.underPage = this.underPage + 1;
          }
          break;
        case "beforeUnderButton": // Before under step
          if (this.underPage === 0) {
            this.underPage = 2;
          } else {
            this.underPage = this.underPage - 1;
          }
          break;
      }

      this.__initSelector__(); // General update of the main page

      i.deferUpdate();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        this.autoDestruction();
      }
    });
  }

  /**
   * Reaction collector
   *
   * @param {Discord.Message} msg
   */
  reactionCollector(msg) {
    const reacArray = []; //

    const filter = (reaction, user) => {
      return (
        reacArray.includes(reaction.emoji.name) && user.id === this.user.id
      );
    };

    const collector = msg.createReactionCollector({
      filter,
      max: 1,
      time: 150000,
      errors: ["time"],
    });

    this.reactionCollec = collector;

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        this.autoDestruction();
      }
    });
  }

  /**
   * Message collector
   *
   * @param {Discord.Message} msg
   */
  messageCollector(msg) {
    const filter = (m) => {
      var re =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
      // Firstname : 2 <= Length < 15 and classic alphabet + accent
      if (this.underPage === 0) {
        if (
          m.content.length < 15 &&
          2 <= m.content.length &&
          re.test(m.content)
        ) {
          return true;
        }
        // Secondname : 2 <= Length < 20 and classic alphabet + accent
      } else if (this.underPage === 1) {
        if (
          m.content.length < 20 &&
          2 <= m.content.length &&
          re.test(m.content)
        ) {
          return true;
        }
        // Department : Int -> Choice
      } else if (this.underPage === 2) {
        if (!isNaN(Number(m.content))) {
          return true;
        }
      }
    };

    const collector = msg.channel.createMessageCollector({
      filter,
      max: 1,
      time: 1500000,
      errors: ["time"],
    });

    this.messageCollec = collector;

    collector.on("collect", (m) => {
      switch (this.underPage) {
        case 0:
          this.userInfo[0] = m.content; // Firstname
          break;
        case 1:
          this.userInfo[1] = m.content.toUpperCase(); // UperCase Secondname
          break;
        case 2:
          this.userInfo[2] = DEPARTMENT[Number(m.content) - 1]; // Choice
          break;
      }

      m.delete(); // Clear the channel from the last message

      this.__initSelector__();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        this.autoDestruction();
      }
    });
  }

  /**
   * Update the selected embed
   *
   * @param {Discord.Message} msg
   * @param {Discord.MessageEmbed} embed
   * @param {Discord.MessageActionRow} interaction
   */
  updateMessageEmbed(msg, template) {
    msg.edit({
      ephemeral: true,
      embeds: [template.embed],
      components: [template.row],
    });
  }

  async autoDestruction() {
    try {
      await this.channel.delete();
      await this.user.send("Message de renvoi passif");
      await this.member.kick("timeOut");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Reset and Clear all the collector
   * Also avoid duplicate Input
   */
  resetCollector() {
    if (this.buttonCollec) {
      this.buttonCollec.stop();
      this.buttonCollec = undefined;
    }
    if (this.reactionCollec) {
      this.reactionCollec.stop();
      this.reactionCollec = undefined;
    }
    if (this.messageCollec) {
      this.messageCollec.stop();
      this.messageCollec = undefined;
    }
  }
};
