const Discord = require("discord.js"); // Main packet
const moment = require("moment"); // Time Format

const { CATEGORY, ROLES } = require("../../ressources.json"); // Stuff needed

/**
 * Unsubscriber Class
 */
module.exports = class Unsubscribe {
  /**
   *
   * @param {Discord.Message} msg
   * @param {Discord.Message} msg_embed
   */
  constructor(msg, msg_embed) {
    this.msg = msg;
    this.user = msg.author;
    this.msg_embed = msg_embed;
    this.channel = msg.channel;
    this.state = 0;
    this.__builder__();
  }

  async __builder__() {
    // Create Channel Ticket
    this.new_channel = await this.createChannel();
    // Clean Previous stage Embexd
    this.msg_embed.delete();
    // Send all info' Message
    this.msg_embed = await this.initChannel(this.new_channel);
    // Build precise info' Embed to the user
    let userEmbed = new Discord.MessageEmbed()
      .setDescription(
        `📣 | Votre demande de désinscription a bien été demandée. Afin de pouvoir échanger avec les responsables, cette dernière est atteignable depuis ce ` +
          `[__channel__](https://discordapp.com/channels/${this.msg.guild.id}/${this.new_channel.id})`
      )
      .setColor("FUCHSIA")
      .setTimestamp();
    // Send the Embed to the user
    await this.user.send({ embeds: [userEmbed] });
    // Inform then clean everything
    this.channel
      .send("📣 | Votre demande de désinscription a bien été demandée !")
      .then((m) => {
        setTimeout(() => {
          m.delete();
        }, 1000 * 5);
      });

    // Add reaction to new Message
    await this.addReac(this.msg_embed);
    // Collect and run the Choice of Responsable
    this.__reactionCollector(this.msg_embed);
  }

  /**
   * Creator of the user's unsub channel
   *
   * @returns {Discord.Channel}
   */
  async createChannel() {
    let category = this.msg.guild.channels.cache.find(
      (c) => c.type === "GUILD_CATEGORY" && c.id === CATEGORY.UNSUB
    ); // Parent Category

    if (!category) return;

    let channel_name = this.user.username.replace(/\s/g, "-") + "-unsub"; //"User name" => "user-name"

    //** @type  */
    let new_channel = await this.msg.guild.channels.create(channel_name, {
      type: "text",
    });

    // Set the category of the new channel
    new_channel.setParent(category.id);

    new_channel.overwritePermissions([
      {
        id: this.msg.guild.roles.everyone,
        deny: ["VIEW_CHANNEL"],
      },
      {
        id: this.user.id,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
      },
    ]);

    return new_channel;
  }

  /**
   * Init the ticket Channel
   *
   * @param {Discord.Channel} channel
   */
  async initChannel(channel) {
    // Give an approximation if user is used to Discord or not
    let recent =
      this.user.createdAt.getFullYear === new Date().getFullYear()
        ? "Récent"
        : "Ancien";

    // Embed constructor
    let unsubEmbed = new Discord.MessageEmbed()
      .setTitle(`${this.user.username} demande une désinscription !`)
      .setColor("FUCHSIA")
      .setDescription("📣 | **Message d'origine :** \n " + this.msg.content)
      .setTimestamp()
      .addField("⏱️ | Ancienneté du compte ", "``" + recent + "``", true)
      .addField(
        "🗺️ | Rejoint le serveur le : ",
        moment.utc(this.msg.member.joinedAt).format("DD/MM/YYYY"),
        true
      )
      .setThumbnail(this.user.avatarURL());

    await channel.send(`<@&${ROLES.MOD_ROLES[0]}>` + `<@${this.user.id}>`);
    return channel.send({ embeds: [unsubEmbed] });
  }

  /**
   *  Add the mod reac
   *
   * @param {Discord.Message} msg
   */
  async addReac(msg) {
    await msg.react("✅");
    await msg.react("❎");
  }

  /**
   *
   * @param {Discord.Message} msg
   */
  async __reactionCollector(msg) {
    let emote_array_name = ["✅", "❎"];
    let responsable_role = await msg.guild.roles.cache.find(
      (r) => r.id === ROLES.MOD_ROLES[0]
    );
    let responsables_id = responsable_role.members.map((m) => m.user.id);

    const filter = (reaction, user) => {
      return (
        emote_array_name.includes(reaction.emoji.name) &&
        responsables_id.includes(user.id)
      );
    };

    const collector = msg.createReactionCollector({
      filter,
      time: 1000 * 60 * 60 * 2,
      max: 1,
    });

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case emote_array_name[0]:
          this.state = 1;
          break;
        case emote_array_name[1]:
          this.state = 2;
          break;
      }

      this.clear(this.state);
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        this.clear(this.state);
      }
    });
  }

  clear(state) {
    if (this.new_channel) this.new_channel.delete();
    let final_state;

    switch (state) {
      case 0:
        final_state = "Délais dépassé";
        break;
      case 1:
        final_state = "Validée";
        break;
      case 2:
        final_state = "Refusée";
        break;
    }

    let finalEmbed = new Discord.MessageEmbed()
      .setTitle(
        "Votre demande de désinscription vient de prendre un nouveau statut !"
      )
      .setColor("FUCHSIA")
      .addField(
        "📣 | Statut final de votre demande : ",
        "``" + final_state + "``"
      )
      .setFooter(
        "En cas de quelconque doute, merci de contacter un responsable par DM ou par mail !"
      );

    this.user.send({ embeds: [finalEmbed] });
  }
};
