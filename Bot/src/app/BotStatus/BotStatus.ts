import {
  Collection,
  GuildMember,
  PermissionFlagsBits,
  PermissionsBitField,
  PresenceUpdateStatus,
} from "discord.js";

import client from "../../client";
import { BOT_GUILD_ID } from "../../config/config.bot";
const { STATUS } = require("./Status.json"); // All the template sentences

/**
 * Edit the status of the bot with personnalized users and setences randomly picked
 */
const statusEdit = () => {
  let guild = client.guilds.cache.find((g) => g.id === BOT_GUILD_ID); // Find the Guild target
  if (!guild) return; // Error Handler

  // Pick a random sentence
  let sentence = STATUS[Math.floor(Math.random() * STATUS.length)];
  let usersAmount = sentence[1];
  let usersPicked = [];
  let tempUsers: Collection<string, GuildMember>;
  let tempUser: GuildMember;

  for (let i = 0; i < usersAmount; i++) {
    // Pick a permed user with 75% chance
    if (Math.random() < 0.75) {
      // Only pick a member that has the permission to mute members
      tempUsers = guild.members.cache.filter((m) =>
        m.permissions.has(PermissionFlagsBits.MuteMembers)
      );
    } else {
      // Pick a member that is connected
      tempUsers = guild.members.cache.filter(
        (m) => m.presence && m.presence.status === PresenceUpdateStatus.Online
      );
    }

    // Pick a random user
    tempUser = tempUsers.random();
    usersPicked.push(tempUser); // push the user in the array
  }

  if (usersPicked.length != 0) {
    // Replace all the "?" in the given sentence replacing them with the users picked
    for (let i = 0; i < usersPicked.length; i++) {
      let userName = usersPicked[i].nickname
        ? usersPicked[i].nickname
        : usersPicked[i].user.username;
      sentence[0] = sentence[0].replace("$", userName);
    }

    client.user.setActivity(sentence[0]); // Set the activity
  }

  // Loop all the 50 seconds
  setTimeout(() => {
    statusEdit();
  }, 1000 * 60);
};

export default statusEdit;
