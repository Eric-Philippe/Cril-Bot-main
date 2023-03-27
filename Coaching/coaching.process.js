const { ComponentType, ButtonInteraction, GuildMember } = require("discord.js");

const CoachingLog = require("./coaching.logs");

// Set of userid
const coolDownUser = new Set();

// Time for cooldown
const COOLDOWN = 2 * 60 * 1000;

const {
  coachingChoice,
  verificationCoaching,
  errorEmbed,
  tryAgainEmbed,
  lateEmbed,
  ficheAFaireEmbed,
  debAFaireEmbed,
  sorryEmbed,
  channelUnlockedEmbedIn,
  channelUnlockedEmbedOut,
  coolDownEmbed,
  earlyEmbed,
} = require("./coaching.embeds");

const JsonService = require("./json.service");
/** ====== @CONSTANT_DEFINITION ====== */
const CHANNEL_FIRST_ID = "1080779658154496040";
const CHANNEL_SECOND_ID = "1080779695555088394";
const CHANNEL_THIRD_ID = "1080779729315053578";
const CHANNEL_PLUS_ID = "1080070860972507156";

const KEYWORD_DEB_A_FAIRE = [
  "deb a faire",
  "deb pas faite",
  "fiche deb a faire",
  "debut de parcours a faire",
];
const KEYWORD_DEB_COMMENCE = [
  "deb comm",
  "deb commentee",
  "fiche deb comm",
  "deb comm a reguider",
];
const KEYWORD_FICHE_A_FAIRE = [
  "fiche a faire",
  "fiche pas faite",
  "fiche $ a faire",
];
const KEYWORD_FICHE_ONE_COMM = [
  "fiche 1 comm",
  "fiche 1 commentee",
  "fiche 1 comm a reguider",
  "fiche 1 faite",
];
const KEYWORD_FICHE_TWO_COMM = [
  "fiche 2 comm",
  "fiche 2 commentee",
  "fiche 2 faite",
  "fiche 2 comm a reguider",
  "fiche 2 faite",
];
const KEYWORD_FICHE_N_COMM = [
  "fiche $ comm",
  "fiche $ commentee",
  "fiche $ comm a reguider",
  "fiche $ faite",
  "fiche $ comm heure en plus",
];
const KEYWORDS_COACHING = [
  { index: 0, keywords: KEYWORD_DEB_A_FAIRE },
  { index: 1, keywords: KEYWORD_DEB_COMMENCE },
  { index: 2, keywords: KEYWORD_FICHE_A_FAIRE },
  { index: 3, keywords: KEYWORD_FICHE_ONE_COMM },
  { index: 4, keywords: KEYWORD_FICHE_TWO_COMM },
  { index: 5, keywords: KEYWORD_FICHE_N_COMM },
];

const TWO_HOUR = 2 * 60 * 60 * 1000;
const FIVE_MINUTE = 5 * 60 * 1000;
/**
 * @class CoachingProcess
 * @description This class is used to manage the coaching process
 */
module.exports = class CoachingProcess {
  /**
   * @constructor CoachingProcess
   * @param {ButtonInteraction} interaction
   * @param {GuildMember} member
   */
  constructor(interaction, member) {
    /** @type {ButtonInteraction} */
    this.interaction = interaction;
    /** @type {GuildMember} */
    this.member = member;
    /** @type {String} */
    this.id = member.user.id;
    /** @type {import("./json.service").Activity} */
    this.activity = null;
    /** @type {CoachingLog} */
    this.logger = new CoachingLog();
    this.init();
  }
  /**
   * @function init
   * @description Init the process and tells the caller
   */
  init() {
    if (coolDownUser.has(this.id)) return this.AlreadyClicked();
    coolDownUser.add(this.id);
    // Check if the JsonService is able to work
    const jsonService = new JsonService();
    // If not, just supress the process and skip the verification
    if (!jsonService.init()) return this.DetermineWhichCoaching();

    // If the JsonService is able to work, we check if the user has a coaching
    const activities = jsonService.getCoachingActivities();
    let callback = jsonService.isActivityForUser(
      this.member.nickname || this.member.user.username,
      activities
    );
    // If not, the user may not finnaly have a coaching
    if (!callback) return this.UserNotFoundInCoaching();

    // If the user has a coaching, we save the activity
    this.activity = callback;

    // Check if the user is late
    if (jsonService.isLate(this.activity.time)) {
      this.logger.log("Late", this.member.user);
      return this.interaction.reply(lateEmbed());
    }

    if (jsonService.isEarly(this.activity.time)) {
      this.logger.log("Early", this.member.user);
      return this.interaction.reply(earlyEmbed());
    }

    // If the user is not late, we ask the process to determine Which coaching the user has following the activity saved
    this.DetermineWhichCoaching(this.activity);
  }

  /**
   * @function AlreadyClicked
   * @description The user has already clicked on the button
   */
  async AlreadyClicked() {
    this.logger.log("AlreadyClicked", this.member.user);
    await this.interaction.reply(coolDownEmbed());
    setTimeout(() => {
      coolDownUser.delete(this.id);
    }, COOLDOWN);
  }

  /**
   * @function DetermineWhichCoaching
   * @description Process to determine Which coaching the user has
   * @param {Activity} activity Can provide an activity to skip the first step
   */
  async DetermineWhichCoaching(activity = null) {
    // Refer to the KEYWORDS_COACHING constant to see the keywords
    let coachingIndex = -1;

    // If not activity is provided, we ask the user Which coaching he has
    if (!activity) coachingIndex = await this.AskWhichCoaching();
    else coachingIndex = await this.WhichCoachingFromText(activity.coach);
    if (coachingIndex === -1) coachingIndex = await this.AskWhichCoaching();

    // Unlock the channel corresponding to the index
    this.UnlockChannel(coachingIndex);
  }

  /**
   * @function AskWhichCoaching
   * @description Ask the user Which coaching he has
   * @returns {Promise<Number>} The index of the coaching corresponding on the button pressed
   */
  async AskWhichCoaching() {
    // Promise based function
    return new Promise(async (resolve) => {
      // Display the embed with the buttons
      await this.interaction.reply(coachingChoice());

      // Fetch the response
      let response = await this.interaction.fetchReply();
      if (!response) return;

      // Create a collector to listen to the user's response
      let filter = (i) => i.user.id === this.id;
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: FIVE_MINUTE,
      });

      // Listen to the user's response
      collector.on("collect", (interaction) => {
        this.interaction = interaction;
        if (interaction.customId === "coaching:first") {
          resolve(1);
        } else if (interaction.customId === "coaching:second") {
          resolve(3);
        } else if (interaction.customId === "coaching:third") {
          resolve(4);
        } else if (interaction.customId === "coaching:plus") {
          resolve(5);
        }
      });
    });
  }

  /**
   * @function UnlockChannel
   * @description Unlock the channel corresponding to the given index
   * @param {Number} index
   */
  UnlockChannel(index) {
    var channelId = null;

    // Determine the link between the index and the channel
    switch (index) {
      case 0:
        return this.DebAFaire();
      case 1:
        channelId = CHANNEL_FIRST_ID;
        break;
      case 2:
        return this.FicheAFaire();
      case 3:
        channelId = CHANNEL_SECOND_ID;
        break;
      case 4:
        channelId = CHANNEL_THIRD_ID;
        break;
      case 5:
        channelId = CHANNEL_PLUS_ID;
        break;
    }
    if (!channelId) return;

    // Fetch the determined channel
    let guild = this.interaction.guild;
    let channel = guild.channels.cache.find((c) => c.id == channelId);
    if (!channel) return this.interaction.reply(errorEmbed());

    // Give the View permission to the user and remove the SendMessages permission after 2 hours
    channel.permissionOverwrites.edit(this.id, { ViewChannel: true });

    // Send the embed to the user
    this.interaction.reply(channelUnlockedEmbedIn(channel.id));
    channel.send(channelUnlockedEmbedOut(this.id));

    // Remove the SendMessages permission after 2 hours
    setTimeout(() => {
      channel.permissionOverwrites.edit(this.id, { SendMessages: false });
    }, TWO_HOUR);
  }

  /**
   * @function WhichCoachingFromText
   * @description Determine Which coaching is the user from the keywords constant
   * @param {String} txtCoaching
   * @return {Number} The index of the coaching, -1 if not found
   */
  WhichCoachingFromText(txtCoaching) {
    // If no text is provided, return -1
    if (txtCoaching === "") return -1;

    // First, format the text to remove accents and convert to lowercase
    let normalizedText = txtCoaching
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // remove accents
    let formatedTextCoaching = normalizedText.toLowerCase(); // convert to lowercase

    // Then, check if the text contains one of the keywords
    for (const keywordObj of KEYWORDS_COACHING) {
      if (this.isInKeywordsArray(formatedTextCoaching, keywordObj.keywords)) {
        return keywordObj.index;
      }
    }

    return -1;
  }

  /**
   * @function isInKeywordsArray
   * @description Check if the given text is contained in the given keywords array
   * @param {String} txt
   * @param {String[]} keywords
   * @returns {Boolean} True if the text is contained in the keywords array, false otherwise
   */
  isInKeywordsArray(txt, keywords) {
    // Loop through the keywords array
    for (const keyword of keywords) {
      // If a sentence contains a $, it means we accept at that place any word
      if (keyword.includes("$")) {
        let keywordSplitted = keyword.split("$");
        if (
          txt.includes(keywordSplitted[0]) &&
          txt.includes(keywordSplitted[1])
        )
          return true;
        // Else, we check if the text contains the keyword
      } else if (txt.includes(keyword)) return true;
    }

    return false;
  }

  /**
   * @function DebAFaire
   * @description Process When the Fiche Debut de parcours is not done
   */
  async DebAFaire() {
    // Display the embed
    this.interaction.reply(debAFaireEmbed());

    // Fetch the response
    let response = await this.interaction.fetchReply();

    // Create a collector to listen to the user's response
    const collectorYesNo = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: FIVE_MINUTE,
    });

    // Listen to the user's response
    collectorYesNo.on("collect", (i) => {
      if (i.user.id === this.interaction.user.id) {
        this.interaction = i;
        if (i.customId === "coaching:yes") {
          // If the user tells us he has a coaching, we ask him Which coaching he has
          this.AskWhichCoaching().then((coachingIndex) => {
            // Unlock the channel corresponding to the index
            this.UnlockChannel(coachingIndex);
          });
        } else if (i.customId === "coaching:no") {
          i.reply(sorryEmbed());
        }
      }
    });
  }

  /**
   * @function FicheAFaire
   * @description Process When the Fiche is not done
   */
  async FicheAFaire() {
    // Display the embed
    this.interaction.reply(ficheAFaireEmbed());

    // Fetch the response
    let response = await this.interaction.fetchReply();

    // Create a collector to listen to the user's response
    const collectorYesNo = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: FIVE_MINUTE,
    });

    // Listen to the user's response
    collectorYesNo.on("collect", (i) => {
      if (i.user.id === this.interaction.user.id) {
        this.interaction = i;
        if (i.customId === "coaching:yes") {
          // If the user tells us he has a coaching, we ask him Which coaching he has
          this.AskWhichCoaching().then((coachingIndex) => {
            // Unlock the channel corresponding to the index
            this.UnlockChannel(coachingIndex);
          });
        } else if (i.customId === "coaching:no") {
          i.reply(sorryEmbed());
        }
      }
    });
  }

  /**
   * @function UserNotFoundInCoaching
   * @description In the case of a user not found in the coaching, we ask him if anyway he has a coaching
   */
  async UserNotFoundInCoaching() {
    let name = this.member.user.username;
    if (this.interaction.member.nickname) {
      if (this.interaction.user.username.split(" ").length < 3) return false;
      const group = username.split(" ").pop();
      username = username.replace(group, "").trim();
      const lastname = username
        .split(" ")
        .filter((word) => this.isWordFullyUppercase(word))
        .join(" ");

      // The firstname is the part before the lastname
      const firstname = username.replace(lastname, "").trim();
      name = firstname + " " + lastname;
    }
    this.logger.log(`User {${name}} not found in coaching`, this.member.user);
    // Display the embed
    await this.interaction.reply(verificationCoaching());

    // Fetch the response
    let response = await this.interaction.fetchReply();

    // Create a collector to listen to the user's response
    const collectorYesNo = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: FIVE_MINUTE,
    });

    // Listen to the user's response
    collectorYesNo.on("collect", (i) => {
      if (i.user.id === this.interaction.user.id) {
        this.interaction = i;
        if (i.customId === "coaching:yes") {
          // If the user tells us he has a coaching, we ask him Which coaching he has
          this.DetermineWhichCoaching();
        } else if (i.customId === "coaching:no") {
          this.interaction.reply(tryAgainEmbed());
        }
      }
    });
  }
};
