const {
  EmbedBuilder,
  ButtonBuilder,
  ChatInputCommandInteraction,
  Collection,
  ActionRowBuilder,
  GuildMember,
  PermissionFlagsBits,
  ButtonStyle,
  Message,
  ComponentType,
} = require("discord.js");

const { client } = require("./utils/client");

const helpCategoriesProperty = [
  { name: "générales", color: "#006b0e", emote: "🪁", permissions: true },
  {
    name: "tuteurs",
    color: "#c27100",
    emote: "🐦",
    permissions: PermissionFlagsBits.KickMembers,
  },
  {
    name: "administrateurs",
    color: "#9900ff",
    emote: "✈️",
    permissions: PermissionFlagsBits.BanMembers,
  },
];
/** Help System Class */
module.exports = class HelpSystem {
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  constructor(interaction) {
    /**
     * Input Interaction
     * @type {ChatInputCommandInteraction}
     */
    this.i = interaction;
    /**
     * Category index
     * Where 0 = general, 1 = tutor, 2 = admin
     * @type {Number}
     */
    this.category = 0;
    /**
     * Pointer of the current elements of the page
     * @type {Number}
     */
    this.pointer = 0;
    /**
     * Array of the commands
     * @type {Array.Object}
     */
    this.commandsArray = this.generateCommandsArray();
    /**
     * The displayed message we're working with
     * @type {Message}
     */
    this.msg = undefined;
    /**
     * Second level of deeper help message
     * @type {Message}
     */
    this.secondMessage = undefined;
    /**
     * Index of the current deeper help message
     * @type {Number}
     */
    this.currentSecondMsgIndex = undefined;
    /**
     * Property that stored if the category has been changed recently
     * @type {Boolean}
     */
    this.categoryChanged = false;
    this.sendEmbed();
  }

  generateCommandsArray() {
    let arrPerm0 = [],
      arrPerm1 = [],
      arrPerm2 = [];
    for (let command of client.commands) {
      if (!command[1].data.default_member_permissions) {
        arrPerm0.push({ name: command[0], cmdObj: command[1] });
      } else if (command[1].data.default_member_permissions == 2) {
        arrPerm1.push({ name: command[0], cmdObj: command[1] });
      } else if (command[1].data.default_member_permissions == 4) {
        arrPerm2.push({ name: command[0], cmdObj: command[1] });
      }
    }

    return [arrPerm0, arrPerm1, arrPerm2];
  }

  async sendEmbed() {
    let msg = await this.i.channel.send({
      embeds: this.generateEmbed(),
      components: this.generateRows(),
    });

    this.msg = msg;
    this.buttonsCollector();
  }

  generateEmbed() {
    let categoryProperty = helpCategoriesProperty[this.category];
    let embed = new EmbedBuilder()
      .setTitle(
        `📚 Liste des commandes - ${categoryProperty.emote} ${categoryProperty.name} ${categoryProperty.emote}`
      )
      .setColor(categoryProperty.color)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/814908646138970122/1020297249235939409/OHNO.gif"
      )
      .setAuthor({ name: "Dirigez vous avec les différents boutons !" });

    let desc = "",
      command;

    for (
      let i = this.pointer;
      i < this.pointer + 5 && i < this.commandsArray[this.category].length;
      i++
    ) {
      command = this.commandsArray[this.category][i];
      desc += `**\n➦ ${command.cmdObj.desc.emote} ${capitalizeFLetter(
        command.name
      )}** \n- ${command.cmdObj.data.description}\n`;
    }

    desc +=
      "\n\n📁 | Cliquez sur les boutons en gris afin de changer de catergorie de commande si vous en avez les permissions ! \n📄 | Cliquez sur les boutons bleus correspondant à l'emote de commande pour avoir des informations plus précises sur cette dernière !";
    embed.setDescription(desc);

    // Set the current page on the footer depending on the pointer
    embed.setFooter({
      text: `Page ${Math.floor(this.pointer / 5) + 1} / ${
        Math.floor(this.commandsArray[this.category].length / 5) + 1
      }`,
    });

    return [embed];
  }

  generateRows() {
    let cmdHelpButtonsRow = new ActionRowBuilder();
    let categoriesButtonsRow = new ActionRowBuilder();

    for (
      let i = this.pointer;
      i < this.pointer + 5 && i < this.commandsArray[this.category].length;
      i++
    ) {
      cmdHelpButtonsRow.addComponents(
        new ButtonBuilder()
          .setCustomId(String(i))
          .setEmoji(this.commandsArray[this.category][i].cmdObj.desc.emote)
          .setStyle(ButtonStyle.Primary)
      );
    }

    for (let category of helpCategoriesProperty) {
      let myButton = new ButtonBuilder()
        .setCustomId(category.name)
        .setEmoji(category.emote)
        .setStyle(ButtonStyle.Secondary);
      if (!hasPerm(this.i.member, category.permissions))
        myButton.setDisabled(true);
      categoriesButtonsRow.addComponents(myButton);
    }

    if (this.commandsArray[this.category].length > 5) {
      var directionsButtonsRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("previous")
          .setEmoji("⏮️")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("next")
          .setEmoji("⏭️")
          .setStyle(ButtonStyle.Success)
      );
    }

    if (!directionsButtonsRow) return [cmdHelpButtonsRow, categoriesButtonsRow];
    return [cmdHelpButtonsRow, categoriesButtonsRow, directionsButtonsRow];
  }

  movesPage(direction) {
    switch (direction) {
      case "next":
        this.pointer =
          this.pointer + 5 > this.commandsArray[this.category].length
            ? 0
            : this.pointer + 5;
        break;
      case "previous":
        if (this.pointer - 5 < 0) {
          let rest = this.commandsArray[this.category].length % 5;
          this.pointer = this.commandsArray[this.category].length - rest;
        } else {
          this.pointer -= 5;
        }
        break;
    }
  }

  buttonsCollector() {
    const collector = this.msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15 * 60 * 1000,
    });

    collector.on("collect", (i) => {
      if (this.i.user.id === i.user.id) {
        if (i.customId === "next" || i.customId === "previous") {
          this.movesPage(i.customId);
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
        } else if (i.customId === "générales") {
          this.categoryChanged = true;
          this.category = 0;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
        } else if (i.customId === "tuteurs") {
          this.categoryChanged = true;
          this.category = 1;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
        } else if (i.customId === "administrateurs") {
          this.categoryChanged = true;
          this.category = 2;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
        } else {
          this.genereteCmdHelpEmbed(i.customId);
        }
        i.deferUpdate();
        collector.stop();
        this.buttonsCollector();
      }
    });
  }

  async genereteCmdHelpEmbed(customId) {
    let cmd = this.commandsArray[this.category][customId];
    let embed = new EmbedBuilder()
      .setTitle(
        `Informations sur la commande ${cmd.name} ${cmd.cmdObj.desc.emote}`
      )
      .setColor("DarkGold")
      .setDescription("```" + cmd.cmdObj.desc.desc + "```");

    let valueDesc = "";
    for (let exemple of cmd.cmdObj.desc.exemple) {
      valueDesc += "``" + exemple.cmd + "``\n" + exemple.desc + "\n\n";
    }

    embed.addFields(
      {
        name: "***Exemples : ***",
        value: valueDesc,
        inline: true,
      },
      {
        name: "***Usage***",
        value: "``" + cmd.cmdObj.desc.usage + "``",
        inline: true,
      }
    );

    if (!this.secondMessage) {
      this.secondMessage = await this.i.followUp({ embeds: [embed] });
      this.currentSecondMsgIndex = customId;
    } else {
      if (this.currentSecondMsgIndex !== customId || this.categoryChanged) {
        this.categoryChanged = false;
        this.secondMessage.edit({ embeds: [embed] });
        this.currentSecondMsgIndex = customId;
      } else {
        this.secondMessage.delete();
        this.secondMessage = null;
        this.currentSecondMsgIndex = null;
      }
    }
  }
};

/**
 *
 * @param {GuildMember} member
 * @param {bigint} perm
 * @returns
 */
const hasPerm = (member, perm) => {
  if (perm === true) return true;
  return member.permissions.has(perm);
};

const capitalizeFLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
