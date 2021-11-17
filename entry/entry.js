const Discord = require("discord.js");

const { CATEGORY, MAIN_COLOR } = require("../config.json");

module.exports = class Entry {
  /**
   *
   * @param {Discord.GuildMember} member
   */
  constructor(member) {
    this.guild = member.guild;
    this.member = member;
    this.user = member.user;
    this.page = 0;
    this.channel;
    this.display;
    this.__init__();
  }

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

  selfDestruction(channel) {}

  createMessageEntry(channel) {

    const row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setCustomId("button")
      .setLabel("Entrer")
      .setStyle("PRIMARY")
    )

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
      .addField("Instruction : ",  'Cliquez sur la réaction ``"✔️"`` pour passer à la suite.')
      .setAuthor("Cril", this.guild.iconURL())
      .setThumbnail(this.user.avatarURL())
      .setTimestamp();

    let m = channel.send({ ephemeral: true, embeds: [embed], components: [row] })

    return m;
  }

  async __init__() {
    this.channel = await this.createChannel();
    this.display = await this.createMessageEntry(this.channel);
    this.buttonCollector(this.display);
  }

  buttonCollector(msg) {
    const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === this.user.id;
    const collector = msg.createMessageComponentCollector({ filter, max: 1, time: 15_000 });
    collector.on('collect', i => {
      i.deferUpdate();
      msg.channel.send("Yey");
    });
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  }
};
