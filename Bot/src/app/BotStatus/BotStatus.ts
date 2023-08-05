import { GuildMember, PermissionFlagsBits } from "discord.js";

import client from "../../client";
import { BOT_GUILD_ID } from "../../config/config.bot";
const { STATUS } = require("../../../Status.json"); // All the template sentences

/**
 * Edit the status of the bot with personnalized users and setences randomly picked
 */
const statusEdit = async () => {
  let guild = client.guilds.cache.find((g) => g.id === BOT_GUILD_ID); // Find the Guild target
  if (!guild) return; // Error Handler

  // Pick a random sentence
  const sentence = STATUS[Math.floor(Math.random() * STATUS.length)];
  // Compte le nombre de $ dans la phrase
  const usersAmount = sentence[0].split("$").length - 1;
  const membersToFill: GuildMember[] = [];

  const members = await guild.members.fetch();
  for (let i = 0; i < usersAmount; i++) {
    let member: GuildMember;
    if (Math.random() < 0.85) {
      // Pick a random member with Mute Permissions
      member = members
        .filter(
          (m) =>
            m.permissions.has(PermissionFlagsBits.MuteMembers) && !m.user.bot
        )
        .random();
    } else {
      // Pick a random member who is connected
      member = members.filter((m) => !m.user.bot && m.user).random();
    }
    if (!member) continue; // Error Handler
    membersToFill.push(member);
  }

  if (membersToFill.length === 0) return statusEdit(); // Error Handler

  // Replace all the $ in the sentence by the members
  let status = sentence[0];
  for (let i = 0; i < usersAmount; i++) {
    status = status.replace("$", membersToFill[i].nickname);
  }

  // Set the status
  client.user.setActivity(status);

  setTimeout(() => {
    statusEdit();
  }, 1000 * 60 * 3);
};

export default statusEdit;
