const { PermissionsBitField } = require("discord.js");

const { client } = require("./client"); //Client object

const { guildID } = require("../config");
const { ELEMENT } = require("./status.json"); // All the template sentences

/**
 * Edit the status of the bot with personnalized users and setences randomly picked
 */
const statusEdit = function () {
  let guild = client.guilds.cache.find((g) => g.id === guildID); // Find the Guild target
  if (!guild) return; // Error Handler

  let sentence = ELEMENT[getRandomInt(ELEMENT.length)]; // Pick a random sentence
  let usersAmount = sentence[1];
  let usersPicked = [];
  let tempUser;

  for (let i = 0; i < usersAmount; i++) {
    // Pick a permed user with 75% chance
    if (getRandomInt(101) <= 75) {
      tempUser = guild.members.cache.filter(
        (m) => m.permissions.has(PermissionsBitField.Flags.CreateInstantInvite) // Permed user array
      );
    } else {
      tempUser = guild.members.cache.filter((m) => m.presence != "offline"); // Online user array
    }

    tempUser = tempUser.random(); // Pick a random user
    usersPicked.push(tempUser); // push the user in the array
  }

  // Replace all the "?" in the given sentence replacing them with the users picked
  for (let i = 0; i < usersPicked.length; i++) {
    let userName = usersPicked[i].nickname
      ? usersPicked[i].nickname
      : usersPicked[i].user.username;
    sentence[0] = sentence[0].replace("$", userName);
  }

  client.user.setActivity(sentence[0]); // Set the activity

  // Loop all the 50 seconds
  setTimeout(() => {
    statusEdit();
  }, 1000 * 50);
};

// Classic random int picker
const getRandomInt = function (max) {
  // max - 1
  return Math.floor(Math.random() * max);
};

module.exports.statusEdit = statusEdit; // Export
