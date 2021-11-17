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
      .addField("", "")
      .addField('Cliquez sur la réaction ``"✔️"`` pour passer à la suite.')
      .setAuthor("Cril", this.guild.iconURL())
      .setThumbnail(this.user.avatarURL())
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }

  async __init__() {
    this.channel = await this.createChannel();
    this.createMessageEntry(this.channel).then((m) => {
      this.display = m;
      m.react("✔️");
    });
  }

  emoteCollector(msg) {
    const filter = (reaction, user) => {
      return reaction.emoji.name === "✔️" && user.id === this.user.id;
    };

    const collector = msg.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      console.log(reaction.emoji.name);
    });

    collector.on("end", (collected) => {
      console.log(collected.size);
    });
  }
};
