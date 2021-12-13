const Discord = require("discord.js");

const {
  MENTION_TOPIC_CHANNEL,
  CHANNELS,
  ROLES,
  EMOTE,
} = require("./ressources.json");

const ArrayReac = ["📖", "⚔️", "🎮", "🏉", "📺", "🖥️"]; // Reaction listened

/**
 * Plugin Reaction Role Embed
 *
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
module.exports.reactionRole = async function (reaction, user) {
  if (!user) return;
  let member = await reaction.message.guild.members.cache.find(
    (mb) => mb.user.id === user.id
  ); // Find member by the user
  if (!member) return; // Error handler

  let index = ArrayReac.findIndex((e) => e === reaction.emoji.name); // Find the index of the reaction selection
  if (index === -1) return; // Throw if not found

  if (
    !reaction.message.author.bot ||
    reaction.message.channel.id != CHANNELS.REAC_ROLE
  )
    return; // Return if msg is not from a bot, and in another channel

  let ArrayRoles = []; // Roles linkeds

  let entries = Object.entries(MENTION_TOPIC_CHANNEL); // Ressources Object to Array
  entries.forEach((e) => ArrayRoles.push(e[1][1])); // All the topic roles (Bit of shortcut using another system ressources)

  // Find the targeted role
  let target_role = member.guild.roles.cache.find(
    (r) => r.id === ArrayRoles[index]
  );
  if (!target_role) return; // Error Handler

  let hasRole = member.roles.cache.find((r) => r === target_role); // Has role
  if (!hasRole) {
    //Check if user already got the role or not
    member.roles.add(target_role); // Add the new role
  } else {
    member.roles.remove(hasRole); // Remove the past role
  }
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.addReacRole = async function (msg) {
  let member = msg.member; // Member
  let isMod = await member.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[0]); // Role finder

  if (!isMod) return; // Perm check

  if (!msg.reference) return msg.delete(); // If there is a target msg (Reply)

  let id = msg.reference.messageId; // Targeted msg id
  let msg_target = await msg.channel.messages.fetch(id); // Find the message to work with
  if (!msg_target) return msg.delete(); // Clean Error

  for (const element in ArrayReac) {
    // Add all the reaction to the message
    await msg_target.react(ArrayReac[element]);
  }
};

/**
 * Plugin Draw Embed
 *
 * @param {Discord.Message} msg
 */
module.exports.addTS = async function (msg) {
  let member = msg.member; // Member
  let isMod = await member.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[0]); // Role finder
  let channel = msg.channel; // Cache the message

  if (!isMod) return; // Perm check

  if (!msg.reference) return msg.delete(); // If there is a target msg (Reply)

  const id = msg.reference.messageId; // Targeted msg id
  let msg_target = await msg.channel.messages.fetch(id); // Find the message to work with
  if (!msg_target) return msg.delete(); // Clean Error

  let args = msg.content.split(" "); //cmd [Amount, Solution] Time Desc rip tion

  var mySubString = msg.content.substring(
    msg.content.indexOf("[") + 1,
    msg.content.lastIndexOf("]")
  ); // Answer parameters

  let answers_info = mySubString.split(","); // [Amount, Solution]
  if (!answers_info[1]) return; // Error Handler

  let answers_amount = answers_info[0]; // Amount
  let answer_correct = answers_info[1]; // Number of the Solution

  if (isNaN(answers_amount)) return; // Type Error

  if (answer_correct < 1 || answer_correct > answers_amount) return; // Solution check

  if (!args[2]) return; // Hour parameter
  if (isNaN(args[2])) return; // Type hour argument check

  let time_hour = Number(args[2]); // Convert String into Number + clean variable
  if (time_hour < 1 || time_hour > 24) return; // Draw are occuring between 1 hour and 24h

  let choice_emote = []; // Emote listened

  for (let i = 1; i <= answers_amount; i++) {
    // Loop around the draw choices
    await msg_target.react(EMOTE.NB_EMOTE[i - 1]); // React in consequence
    await choice_emote.push(EMOTE.NB_EMOTE[i - 1]); // Update the choice emote listener
  }

  let correctEmote = EMOTE.NB_EMOTE[answer_correct - 1]; // Setup the good answer

  const filter = (reaction, user) => {
    // [Emote => EmoteListened]
    return choice_emote.includes(reaction.emoji.name);
  };

  const collector = await msg_target.createReactionCollector({
    filter,
    time: 1000 * 60 * 60 * time_hour, // Hour * Argument
  });

  await collector.on("collect", (reaction, full_user) => {
    if (full_user.bot) return; // Not listen to bot
    // Check if user already voted
    for (element of reaction.message.reactions.cache) {
      // Loop all around the reactions of the message
      if (element[0] != reaction.emoji.name) {
        // Not check the new vote
        reaction.message.reactions
          .resolve(element[0])
          .users.remove(full_user.id); // Remove the past vote
      }
    }
  });

  collector.on("end", async (collected, reason) => {
    let msg_target_updated = await channel.messages.fetch(id); // Find the message to work with
    let finalUsers = []; // Final winners array
    if (!msg_target_updated) return; // If msg get deleted during that lapse of time
    for (element of msg_target_updated.reactions.cache) {
      // Loop all around the final reactions
      if (element[0] === correctEmote) {
        // Only work with the users who finded the good answer
        let array_correctUsers = await element[1].users.cache.map((u) => u); // Map to Array
        for (u in array_correctUsers) {
          // Bot safe
          if (!array_correctUsers[u].bot) {
            await finalUsers.push(array_correctUsers[u]); // Final push to array
          }
        }
      }
    }

    if (finalUsers.length != 0) {
      // If at least one user voted the good answer
      let winner = finalUsers[Math.floor(Math.random() * finalUsers.length)]; // RANDOM PICK

      channel.send(
        `Le gagnant est ${winner} en ayant choisi la réponse ${correctEmote} ! Bravo :D`
      ); // Winner message annonce
    } else {
      channel.send("Personne n'a trouvé la bonne réponse !"); // Empty Message annonce
    }
  });
};
