const Discord = require("discord.js");

const { insertSQL } = require("../SQL/INSERT/insertSQL");

/**
 * remindMe Class
 *
 */
module.exports = class createReminderObject {
  /**
   * @typedef {Object} ReminderObject
   * @property {Date} target_date
   * @property {Date} entry_date
   * @property {String} remind
   * @property {Array.<Discord.User>} users_id
   *
   */

  /**
   *
   * @param {Discord.Message} msg
   *
   * @return {ReminderObject} The object with all the reminder's information
   */
  static remindMe(msg) {
    let args = msg.content.split(" ");
    if (!args[1]) return msg.reply("Merci d'entrer une date !");
    if (!args[2]) return msg.reply("Merci d'entrer une heure !");
    if (!args[3]) return msg.reply("Merci d'entrer une raison !");

    let date = args[1];
    let date_array = date.split("/");

    if (!date_array[1]) return msg.reply("Merci d'entrer un mois !");
    let result_test = true;
    for (let i = 0; i < date_array.length; i++) {
      if (isNaN(date_array[i])) {
        result_test = false;
      }
    }
    let day = date_array[0];
    let splited_day = day.split("");
    let month = date_array[1];
    let splited_month = month.split("");
    let current_date = new Date();
    let current_year = current_date.getFullYear();
    let year = date_array[2] || current_year;

    if (!splited_day[1]) {
      day = "0" + splited_day[0];
    }

    if (!splited_month[1]) {
      month = "0" + splited_month[0];
    }

    let day_byMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (!result_test)
      return msg.reply("Merci d'entrer des valeurs numériques pour la date !");
    if (month > 12 || month < 1)
      return msg.reply("Merci d'entrer un mois valide !");
    if (day > day_byMonth[month - 1])
      return msg.reply("Merci d'entrer un jour valide !");
    if (year < current_year || year > current_year + 2)
      return msg.reply("Merci d'entre une année valide !");

    let time = args[2];
    let time_array = time.split("h") || time.split("H");

    if (!time_array[1]) return msg.reply("Merci d'entrer les minutes !");
    result_test = true;
    for (let i = 0; i < time_array.length; i++) {
      if (isNaN(time_array[i])) {
        result_test = false;
      }
    }
    if (!result_test)
      return msg.reply("Merci d'entrer des valeurs numériques pour l'heure !");

    let hour = time_array[0];
    let splited_hour = hour.split("");
    let minute = time_array[1];
    let splited_minute = minute.split("");

    if (!splited_hour[1]) {
      hour = "0" + splited_hour[0];
    }

    if (!splited_minute[1]) {
      minute = "0" + splited_minute[0];
    }

    if (hour > 23 || hour < 0)
      return msg.reply("Merci d'entrer une heure valide !");
    if (minute > 59 || minute < 0)
      return msg.reply("Merci d'entrer des minutes valides !");

    let target_date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

    if (target_date < current_date)
      return msg.reply("Merci d'entrer une date futur !");

    let remind = args.slice(3).join(" ");

    let users_id = [msg.author.id];

    insertSQL({ target_date, current_date, remind, users_id });
  }

  static remindYou() {}
};
