const Discord = require("discord.js");

const AnswerZero = require("./answerLevelZero");

const { questionPicker } = require("./questionPicker");
const { filter } = require("./filter");

module.exports = class chatBot {
  constructor(msg) {
    this.msg = msg;
    this.channel = msg.channel;
    this.content = msg.content;
    this.answer_array;
    this.__init__(msg);
  }

  /**
   * Main Component of the ChatBot system
   * Launcher of the auto-answers
   *
   * @param {Discord.Message} msg
   */
  async __init__(msg) {
    let user_filter = await filter(msg);
    if (!user_filter) return; // Deny if WrongChannel, Admin, talkedRecently,
    this.answer_array = await questionPicker(msg.content);
    if (this.answer_array[0][1] > 20) return; // Deny if the answers found are too far from the question
    console.log(this.answer_array);
    this.__selector__(0);
  }

  __selector__(step) {
    switch (this.answer_array[step][2]) {
      case "FIND_MOODLE":
        AnswerZero.find_moodle(this.msg, true);
        break;
      case "FIND_RESACRIL":
        AnswerZero.find_ResaCril(this.msg, true);
        break;
      case "FIND_FICHE":
        AnswerZero.find_fiche(this.msg, true);
        break;
      case "VALIDATION_TIME_ACTIVITY":
        AnswerZero.find_Validation(this.msg, true);
        break;
      case "DELAY":
        break;
      case "PREVIOUS_ABSENCE":
        break;
      case "FIND_ACTIVITY":
        break;
      case "UNSUBSCRIBE":
        break;
      case "DISCORD_CONNECT":
        break;
    }
  }

  /**
   *
   * @param {Discord.Message} msg_user
   * @param {Discord.Message} msg_bot
   */
  static buttonCollector(msg_user, msg_bot) {
    const filter = (interaction) =>
      interaction.user.id === msg_user.author.id && interaction.isButton();
    const collector = msg_bot.createMessageComponentCollector({
      filter,
      max: 1,
      time: 1000 * 20,
      errors: ["time"],
    });

    collector.on("collect", async (i) => {
      switch (i.customId) {
        case "Happy":
          msg_user.reply("Merci d'avoir répondu !");
          break;
        case "Unhappy":
          msg_user.reply("Je m'occupe de vous. . .");
          break;
      }

      await i.deferUpdate();
    });

    collector.on("end", (collected, reason) => {
      console.log(reason);
    });
  }
};
