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
} = require("discord.js"); // Discord Needed Imports Only

const { client } = require("./utils/client"); // Client Import
/** =============== @MAIN_CATEGORY_SETUP =============== */
const helpCategoriesProperty = [
  { name: "générales", color: "#006b0e", emote: "🪁", permissions: true },
  {
    name: "tuteurs",
    color: "#c27100",
    emote: "🐦",
    permissions: PermissionFlagsBits.MentionEveryone,
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
  /**
   * Generate the commands objects array
   * @returns {Array.Object}
   */
  generateCommandsArray() {
    let arrPerm0 = [],
      arrPerm1 = [],
      arrPerm2 = [];
    for (let command of client.commands) {
      if (!command[1].data.default_member_permissions) {
        arrPerm0.push({ name: command[0], cmdObj: command[1] });
      } else if (
        command[1].data.default_member_permissions ==
        PermissionFlagsBits.MentionEveryone
      ) {
        arrPerm1.push({ name: command[0], cmdObj: command[1] });
      } else if (
        command[1].data.default_member_permissions ==
        PermissionFlagsBits.BanMembers
      ) {
        arrPerm2.push({ name: command[0], cmdObj: command[1] });
      }
    }

    return [arrPerm0, arrPerm1, arrPerm2];
  }
  /**
   * Send the given embed and launchh the buttons collector
   */
  async sendEmbed() {
    // Send the embed in the interaction channel with the embed and components generated
    let msg = await this.i.channel.send({
      embeds: this.generateEmbed(),
      components: this.generateRows(),
    });

    this.msg = msg;
    // Launch the buttons collector
    this.buttonsCollector();
  }
  /**
   * Generate the embed
   * @returns {EmbedBuilder}
   */
  generateEmbed() {
    let categoryProperty = helpCategoriesProperty[this.category]; // Setup the category propertes
    // Build the embed
    let embed = new EmbedBuilder()
      .setTitle(
        `📚 Liste des commandes - ${categoryProperty.emote} ${categoryProperty.name} ${categoryProperty.emote}`
      )
      .setColor(categoryProperty.color)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/814908646138970122/1020297249235939409/OHNO.gif"
      )
      .setAuthor({ name: "Dirigez vous avec les différents boutons !" });
    let desc = ""; // The full list for the commands to add on the embed's description
    let command; // The current command

    // Loop through the commands array starting from the pointer
    // We're working here 5 commands at a time (Discord Components Row Limit)
    for (
      let i = this.pointer;
      i < this.pointer + 5 && i < this.commandsArray[this.category].length;
      i++
    ) {
      command = this.commandsArray[this.category][i]; // Current command setup
      desc += `**\n➦ ${command.cmdObj.desc.emote} ${capitalizeFLetter(
        command.name
      )}** \n- ${command.cmdObj.data.description}\n`; // Desc setup
    }
    // Instruction for the button's utilisation added at the end of the embed's description
    desc +=
      "\n\n📁 | Cliquez sur les boutons en gris afin de changer de catégorie de commande si vous en avez les permissions ! \n📄 | Cliquez sur les boutons bleus correspondant à l'emote de commande pour avoir des informations plus précises sur cette dernière !";
    embed.setDescription(desc);

    // Set the current page on the footer depending on the pointer
    embed.setFooter({
      text: `Page ${Math.floor(this.pointer / 5) + 1} / ${
        this.commandsArray[this.category].length % 5 == 0
          ? this.commandsArray[this.category].length / 5
          : Math.floor(this.commandsArray[this.category].length / 5) + 1
      }`,
    });
    // Return the completed embed
    return [embed];
  }
  /**
   * Generate the buttons for the help message
   * @returns {Array.ActionRowBuilder}
   */
  generateRows() {
    let cmdHelpButtonsRow = new ActionRowBuilder(); // Row for the command help cmd buttons
    let categoriesButtonsRow = new ActionRowBuilder(); // Row for the categories buttons
    // Loop through the commands array starting from the pointer
    // We're working here 5 commands at a time (Discord Components Row Limit)
    for (
      let i = this.pointer;
      i < this.pointer + 5 && i < this.commandsArray[this.category].length;
      i++
    ) {
      // Create a new button for reaching the commande specific help message
      cmdHelpButtonsRow.addComponents(
        new ButtonBuilder()
          .setCustomId(String(i))
          .setEmoji(this.commandsArray[this.category][i].cmdObj.desc.emote)
          .setStyle(ButtonStyle.Primary)
      );
    }

    // Loop through the categories array
    for (let category of helpCategoriesProperty) {
      // Create a new button for reaching a new category
      let myButton = new ButtonBuilder()
        .setCustomId(category.name)
        .setEmoji(category.emote)
        .setStyle(ButtonStyle.Secondary);
      if (!hasPerm(this.i.member, category.permissions))
        myButton.setDisabled(true);
      categoriesButtonsRow.addComponents(myButton);
    }

    // If we have more than 5 commands, we add the navigation buttons
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

    // In the case we have the navigation buttons, we return the 3 rows
    if (!directionsButtonsRow) return [cmdHelpButtonsRow, categoriesButtonsRow];
    return [cmdHelpButtonsRow, categoriesButtonsRow, directionsButtonsRow];
  }
  /**
   * Pages navigation Manager
   * @param {String} direction
   */
  movesPage(direction) {
    switch (direction) {
      case "next":
        // If we're not on the last page, we add 5 to the pointer
        // Else we set the pointer to 0
        this.pointer =
          this.pointer + 5 >= this.commandsArray[this.category].length
            ? 0
            : this.pointer + 5;
        break;
      case "previous":
        // If we're on the first page, we set the pointer to the last page
        // Else we remove 5 to the pointer
        this.pointer =
          this.pointer - 5 < 0
            ? this.commandsArray[this.category].length -
              (this.commandsArray[this.category].length % 5 == 0
                ? 5
                : this.commandsArray[this.category].length % 5)
            : this.pointer - 5;

        break;
    }
  }
  /**
   * Basic Discord Buttons Collector
   */
  buttonsCollector() {
    // Collector setup
    const collector = this.msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15 * 60 * 1000, // 15 min
    });
    // On button click
    collector.on("collect", (i) => {
      if (this.i.user.id === i.user.id) {
        // If the button is a navigation button
        if (i.customId === "next" || i.customId === "previous") {
          this.movesPage(i.customId);
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
          // If the button is a category button
          // General commands
        } else if (i.customId === "générales") {
          this.categoryChanged = true;
          this.category = 0;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
          // Tutors commands
        } else if (i.customId === "tuteurs") {
          this.categoryChanged = true;
          this.category = 1;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
          // Admin commands
        } else if (i.customId === "administrateurs") {
          this.categoryChanged = true;
          this.category = 2;
          this.pointer = 0;
          this.msg.edit({
            embeds: this.generateEmbed(),
            components: this.generateRows(),
          });
        } else {
          // If the button is a command help button
          this.genereteCmdHelpEmbed(i.customId);
        }
        i.deferUpdate(); // We don't want to reply to the button click
        collector.stop(); // End the current collector
        this.buttonsCollector(); // Start a new one
      }
    });
  }
  /**
   * Generate a second help message for a specific command
   * @param {String} customId
   */
  async genereteCmdHelpEmbed(customId) {
    let cmd = this.commandsArray[this.category][customId]; // target the asked command
    // Embed Builder
    let embed = new EmbedBuilder()
      .setTitle(
        `Informations sur la commande ${cmd.name} ${cmd.cmdObj.desc.emote}`
      )
      .setColor("DarkGold")
      .setDescription("```" + cmd.cmdObj.desc.desc + "```");
    // Description Builder
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
    // If the command as been targeted without having a n-1 command asked
    if (!this.secondMessage) {
      this.secondMessage = await this.i.followUp({ embeds: [embed] });
      this.currentSecondMsgIndex = customId;
    } else {
      // If the command isn't the same as the n-1 command and that we've changed the category recently
      if (this.currentSecondMsgIndex !== customId || this.categoryChanged) {
        this.categoryChanged = false;
        this.secondMessage.edit({ embeds: [embed] });
        this.currentSecondMsgIndex = customId;
        // If the command targeted is the same as the current one
      } else {
        this.secondMessage.delete();
        this.secondMessage = null;
        this.currentSecondMsgIndex = null;
      }
    }
  }
};
/**
 * Check if the member has the permission to use the command
 * @param {GuildMember} member
 * @param {bigint} perm
 * @returns {Boolean}
 */
const hasPerm = (member, perm) => {
  if (perm === true) return true;
  return member.permissions.has(perm);
};
/**
 * Put a capital letter at the beginning of a string
 * @param {String} str
 * @returns {String}
 */
const capitalizeFLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
