const Discord = require("discord.js");

const AnswerZero = require("./answerLevelZero");
const Find_Activty = require("./find_activity/find_activity");

const { questionPicker } = require("./questionPicker");
const { filter } = require("./filter");

module.exports = class chatBot {
  /**
   *
   * @param {Discord.Message} msg
   */
  constructor(msg) {
    this.msg = msg;
    this.channel = msg.channel;
    /**
     *  The Embed message
     *
     * @type {Discord.MessageEmbed}
     * @public
     */
    this.msg_embed = msg.msg_embed;

    /**
     *  The function linked to a specific answer leveled
     *
     * @type {Function}
     * @public
     */
    this.func = this.default_func_validation;

    /**
     * The answer array return by the questionPicker
     *
     * @type {Array<Array<String, Number, String>>}
     * @public
     */
    this.answer_array;
    this.step = 0;
    this.__init__(msg);
  }

  /**
   * Main Component of the ChatBot system
   * Launcher of the auto-answers
   *
   * @param {Discord.Message} msg
   */
  async __init__(msg) {
    this.answer_array = await questionPicker(msg.content);
    if (this.answer_array[0][1] > 20) return; // Deny if the answers found are too far from the question

    let user_filter = await filter(msg, this.answer_array[0][2]);
    if (!user_filter) return; // Deny if WrongChannel, Admin, talkedRecently,

    this.__selector__(this.step);
  }

  async __selector__(step) {
    let level = 0;
    console.log(this.answer_array);
    switch (this.answer_array[step][2]) {
      case "FIND_MOODLE":
        this.msg_embed = await AnswerZero.find_moodle(this.msg, true);
        break;
      case "FIND_RESACRIL":
        this.msg_embed = await AnswerZero.find_ResaCril(this.msg, true);
        break;
      case "FIND_FICHE":
        this.msg_embed = await AnswerZero.find_fiche(this.msg, true);
        break;
      case "VALIDATION_TIME_ACTIVITY":
        this.msg_embed = await AnswerZero.find_Validation(this.msg, true);
        break;
      case "DELAY":
        this.msg_embed = await AnswerZero.delay(this.msg, true);
        this.func = AnswerZero.mention_reponsable_delay;
        level = 1;
        break;
      case "PREVIOUS_ABSENCE":
        this.msg_embed = await AnswerZero.previous_absence(this.msg, true);
        this.func = AnswerZero.mention_reponsable_pastA;
        level = 1;
        break;
      case "FIND_ACTIVITY":
        this.msg_embed = await AnswerZero.find_activity(this.msg, true);
        this.func = Find_Activty;
        level = 2;
        break;
      case "UNSUBSCRIBE":
        this.msg_embed = await AnswerZero.unsubscribe(this.msg, true);
        level = 2;
        break;
      case "DISCORD_CONNECT":
        this.msg_embed = await AnswerZero.discord_assist(this.msg, true);
        level = 2;
        break;
    }

    if (!this.msg_embed) return;
    this.buttonCollector(this.msg, this.msg_embed, level);
  }

  /**
   *
   * @param {Discord.Message} msg_user
   * @param {Discord.Message} msg_bot
   */
  buttonCollector(msg_user, msg_bot, level) {
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
          this.__launcher__(level);
          break;
        case "Unhappy":
          if (this.step === 2) {
            msg_user.reply(
              "Je n'ai plus de réponse à vous apporter, merci de contacter un @Responsable !"
            );
          } else {
            this.step = this.step + 1;
            msg_user.reply("Je m'occupe de vous. . .").then((m) => {
              i.de;
              setTimeout(() => {
                m.delete();
              }, 1000 * 3);
            });
            this.msg_embed.delete();
            this.__selector__(this.step);
          }
          break;
      }

      await i.deferUpdate();
    });

    collector.on("end", (collected, reason) => {});
  }

  default_func_validation() {
    return this.msg.reply("Merci d'avoir répondu !");
  }

  __launcher__(level) {
    try {
      if (level === 2) return new this.func(this.msg, this.msg_embed);
      this.func(this.msg);
    } catch (err) {
      console.log(err);
    }
  }
};
