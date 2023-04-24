/**
 * @typedef {Object} Activity
 * @property {String} type
 * @property {String} activity
 * @property {String} time
 * @property {String} place
 * @property {String} language
 * @property {String} level
 * @property {String} firstname
 * @property {String} lastname
 * @property {String} group
 * @property {String} observation
 * @property {String} eng_level
 * @property {String} esp_level
 * @property {String} presence
 * @property {String} coach
 */

const DEPARTMENTS = [
  "GEAR",
  "GMP",
  "GEAP",
  "GCCD",
  "INFOCOM",
  "MEPH",
  "GCGP",
  "INFO",
  "GEII",
  "TECH DE CO",
  "CASTRES CHIMIE",
];
module.exports = class JsonService {
  constructor() {
    this.refreshActivities();
    this.JSONActivities = require("../SpreadSheet/Activities.json");
    /** @type {String} */
    this.today = null;
    /** @type {Activity[]} */
    this.activities = null;
    /** @type {Boolean} ableToWork */
    this.ableToWork = false;
  }

  /**
   * Read the last activities.json file and return the activities for the current day
   * This method allows to get a refreshed version of the activities.json file without having to restart the bot
   */
  refreshActivities() {
    delete require.cache[require.resolve("../SpreadSheet/Activities.json")];
    this.JSONActivities = require("../SpreadSheet/Activities.json");
  }

  /**
   * @returns {Boolean} if the app is ready to run
   */
  init() {
    this.today = new Date().toLocaleDateString("en-GB").replace(/\//g, "");
    if (!this.JSONActivities[this.today]) return false;
    this.activities = this.JSONActivities[this.today];
    this.ableToWork = true;
    return true;
  }
  /**
   * Get all the activities that has the type "Coaching"
   * @returns {Activity[]}
   */
  getCoachingActivities() {
    if (!this.ableToWork) throw new Error("Not able to work");
    return this.activities.filter((activity) => activity.type === "Coaching");
  }
  /**
   * Compare a given username, with a specific activity
   * @param {String} username
   * @param {Activity[]} activities
   * @returns {(Activity|Boolean)} return the activity if the username match, false otherwise
   * @Example isActivityForUser("John DOE INFO", {firstname: "John", lastname: "Doe"; group: "BUT 1A INFORMATIQUE"})
   * if the activity group include the username group, it will return true
   */
  isActivityForUser(username, activities) {
    if (!this.ableToWork) return false;
    // If the username can't be cut in at least 3 parts, it's not a valid username
    if (username.split(" ").length < 3) return false;
    // The last part of the username is the group
    const group = username.split(" ").pop();
    username = username.replace(group, "").trim();
    // The name can be composed of multiple words also as the lastname
    // So the only way to recognize the lastname is to take the part that is compltely uppercase
    const lastname = username
      .split(" ")
      .filter((word) => JsonService.isWordFullyUppercase(word))
      .join(" ");
    // The firstname is the part before the lastname
    const firstname = username.replace(lastname, "").trim();

    for (const activity of activities) {
      if (
        this.isSimilar(activity.firstname, firstname) &&
        this.isSimilar(activity.lastname, lastname)
      ) {
        return activity;
      }
    }
    return false;
  }
  /**
   *@param {String} username
   */
  static getDepartment(username) {
    // If we find one of the department at the end of the username, we return it
    for (const department of DEPARTMENTS) {
      if (username.toLowerCase().endsWith(department.toLowerCase()))
        return department;
    }
    return false;
  }
  /**
   * Give the found firstname and lastname for a given username
   * @param {String} username
   * @returns {{firstname: String, lastname: String}}
   */
  static getFirstnameAndLastname(username) {
    // If the username can't be cut in at least 3 parts, it's not a valid username
    if (username.split(" ").length < 3) return false;
    const department = JsonService.getDepartment(username);
    // Remopve the department from the username
    let usernameWithoutDepartment = username;
    if (department)
      usernameWithoutDepartment = username.replace(department, "").trim();
    // Now it starts like "John DOE", so the UpperCase part is the lastname
    const lastname = usernameWithoutDepartment
      .split(" ")
      .filter((word) => JsonService.isWordFullyUppercase(word))
      .join(" ");
    // The firstname is the part before the lastname
    const firstname = usernameWithoutDepartment.replace(lastname, "").trim();
    return { firstname, lastname };
  }
  /**
   * Check if a word is fully uppercase
   * @param {String} word
   * @returns
   */
  static isWordFullyUppercase(word) {
    return word === word.toUpperCase();
  }
  /**
   * Check if two words are similar, not case sensitive, not accent sensitive, and may allow some light typos
   * @param {String} word1
   * @param {String} word2
   * @returns {Boolean}
   */
  isSimilar(word1, word2) {
    return (
      word1
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "") ==
      word2
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
    );
  }

  /**
   * Check if the given time is in the past, allowing a 15 minutes delay
   * @param {String} time hh:mm
   * @returns {Boolean}
   */
  isLate(time) {
    const [hour, minute] = time.split(":");
    const now = new Date();
    const activityTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute
    );
    activityTime.setMinutes(activityTime.getMinutes() + 15);

    return now > activityTime;
  }

  /**
   * Check if the given time is too early, allowing a 1h advance
   * @param {String} time hh:mm
   * @returns {Boolean}
   */
  isEarly(time) {
    const [hour, minute] = time.split(":");
    const now = new Date();
    const activityTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute
    );
    activityTime.setMinutes(activityTime.getMinutes() - 60);

    return now < activityTime;
  }
};
