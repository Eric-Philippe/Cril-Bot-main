const Discord = require("discord.js");

// Import target function
const AnswerZero = require("./answerLevelZero");
const Find_Activty = require("./find_activity/find_activity");
const Unsubscribe = require("./unsubscribe/unsubscribe");
const DiscordVoiceSupport = require("./discord_voice/main");

// Helper import
const { questionPicker } = require("./questionPicker");
const { filter } = require("./filter");

const { ROLES } = require("../ressources.json");

/**
 * chatBot Help System
 */
module.exports = class chatBot {
  /**
   *  Constructor of the chatBot System
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
    this.answer_array = await questionPicker(msg.content); // Pick an array of three element to find the closest answer
    if (this.answer_array[0][1] > 70) return; // Deny if the answers found are too far from the question

    let user_filter = await filter(msg, this.answer_array[0]);
    if (!user_filter) return;
    // Deny if WrongChannel, Admin, talkedRecently,

    this.__selector__(this.step);
  }

  async __selector__(step) {
    let level = 0; // Default level of the question
    // Level 0 => Basic Answer
    // Level 1 => Basic Answer after confirmation
    // Level 2 => Full system for the answer
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
        this.func = Unsubscribe;
        level = 2;
        break;
      case "DISCORD_CONNECT":
        this.msg_embed = await AnswerZero.discord_assist(this.msg, true);
        this.func = DiscordVoiceSupport;
        level = 2;
        break;
    }

    if (!this.msg_embed) return; // Error Handler (time)
    this.buttonCollector(this.msg, this.msg_embed, level); // Collect if the user is satsified or not
  }

  /**
   *  Collect the satisfaction of the user about the answer given
   *
   * @param {Discord.Message} msg_user
   * @param {Discord.Message} msg_bot
   */
  buttonCollector(msg_user, msg_bot, level) {
    // [ButtonOnly, AuthorOnly]
    const filter = (interaction) =>
      interaction.user.id === msg_user.author.id && interaction.isButton();
    const collector = msg_bot.createMessageComponentCollector({
      filter,
      max: 1,
      time: 1000 * 60 * 2, // 2 minutes
      errors: ["time"],
    });

    collector.on("collect", async (i) => {
      switch (i.customId) {
        case "Happy": // Satisfied
          this.__launcher__(level);
          break;
        case "Unhappy": // Unsatisfied
          if (this.step === 2) {
            // Case of all the answer unsatisfied
            msg_user.reply(
              `Je n'ai plus de réponse à vous apporter, merci de contacter un <@&${ROLES.MOD_ROLES[0]}> !`
            );
          } else {
            // Change the current step to give an other solution
            this.step = this.step + 1;
            msg_user.reply("Je m'occupe de vous. . .").then((m) => {
              // Clean message
              setTimeout(() => {
                m.delete();
              }, 1000 * 3);
            });
            this.msg_embed.delete();
            this.__selector__(this.step); // Launch a new selection
          }
          break;
      }

      await i.deferUpdate();
    });
  }

  /**
   * Default function for basic answer
   *
   * @returns {Discord.Message}
   */
  default_func_validation() {
    return this.msg.reply("Merci d'avoir répondu !");
  }

  /**
   *  Launch the targeted function
   *
   * @param {Number} level
   * @returns {Function} Func
   */
  __launcher__(level) {
    try {
      if (level === 2) return new this.func(this.msg, this.msg_embed); // Level 2 => Class Launcher
      // Level 1 - 0 => function launcher
      this.func(this.msg);
    } catch (err) {
      console.log(err);
    }
  }
};
