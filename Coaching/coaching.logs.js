const { User } = require("discord.js");
const fs = require("fs");

module.exports = class CoachingLog {
  constructor() {
    this.filename = "coaching.log";
    this.folderFromRoot = "Coaching/";
    this.path = this.folderFromRoot + this.filename;
  }
  /**
   * @param {String} message
   * @param {User} user
   */
  log(message, user) {
    // Date dd/mm/yyyy hh:mm:ss
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dateFormated = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    const messageFormated = `[${dateFormated}] ${user.username}#${user.discriminator} : ${message} | ID: {${user.id}}\n`;
    this.write(messageFormated);
  }

  write(message) {
    fs.appendFile(this.path, message, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
