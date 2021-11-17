const Discord = require("discord.js");

const { embed1 } = require("./entryEmbed");

const { CATEGORY, MAIN_COLOR } = require("../config.json");

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
    this.guild = member.guild;
    this.member = member;
    this.user = member.user;
    this.userInfo = [];
    this.page = 0;
    this.channel;
    this.display;
    this.__init__();
  }

  /**
   * Initiate the first information of the class
   */
  async __init__() {
    let firstname, secondname, school;
    this.userInfo.push(firstname, secondname, school);

    this.channel = await this.createChannel();
    this.display = await this.createMessageEntry(this.channel);
    this.buttonCollector(this.display);
  }

  /**
   *  Initiate the selector of the Entry system
   */
  async __initSelector__() {
    let currentEmbed;
    switch (this.page) {
      case 1:
        currentEmbed = embed1(
          this.msg,
          this.userInfo(0),
          this.userInfo(1),
          this.userInfo(2)
        );
        break;
      case 2:
        currentEmbed = embed2;
        break;
      case 3:
        currentEmbed = embed3;
        break;
      case 4:
        currentEmbed = embed4;
        break;
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
    );
    if (!category) return;
    let channel_name = this.user.username.replace(/\s/g, "-");

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
   *  Constructor of the Entry message ( the message will be updated through the process )
   *  The message contains Embed and ActionRow(Button)
   *
   * @param {Discord.Channel} channel
   * @returns {Discord.Message}
   */
  createMessageEntry(channel) {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("entryButton")
        .setLabel("Entrer")
        .setStyle("PRIMARY")
    );

    let embed = new Discord.MessageEmbed()
      .setColor(MAIN_COLOR)
      .setTitle(`Bienvenue ${this.user.tag} !`)
      .setDescription(
        "Bienvenue sur le serveur du Cril ! Tu suivra les étapes suivantes pour valider ton entrée dans ce dernier !"
      )
      .addField("Etape 1", "Entrée de ton prénom et de ton nom !")
      .addField("Etape 2", "Lecture du règlement")
      .addField(
        "Etape 3",
        "Amorce des premières manipulations nécessaire pour le Cril !"
      )
      .addField(".", "**.**")
      .addField(
        "Instruction : ",
        'Cliquez sur la réaction ``"✔️"`` pour passer à la suite.'
      )
      .setAuthor("Cril", this.guild.iconURL())
      .setThumbnail(this.user.avatarURL())
      .setTimestamp();

    let m = channel.send({
      ephemeral: true,
      embeds: [embed],
      components: [row],
    });

    return m;
  }

  /**
   * Collector for the Message Button
   *
   * @param {Discord.Message} msg
   */
  buttonCollector(msg) {
    const filter = (interaction) =>
      interaction.customId === "entryButton" &&
      interaction.user.id === this.user.id;
    const collector = msg.createMessageComponentCollector({
      filter,
      max: 1,
      time: 15_000,
    });
    collector.on("collect", (i) => {
      this.page = 1;
      this.__initSelector__();
      i.deferUpdate();
    });
    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`)
    );
  }
};
