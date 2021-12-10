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

  console.log("CC");

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

  msg.delete(); // Clean
};

/**
 * Plugin Draw Embed
 *
 * @param {Discord.Message} msg
 */
module.exports.addTS = async function (msg) {
  let member = msg.member; // Member
  let isMod = await member.roles.cache.find((r) => r.id === ROLES.MOD_ROLES[0]); // Role finder

  if (!isMod) return; // Perm check

  if (!msg.reference) return msg.delete(); // If there is a target msg (Reply)

  const id = msg.reference.messageId; // Targeted msg id
  let msg_target = await msg.channel.messages.fetch(id); // Find the message to work with
  if (!msg_target) return msg.delete(); // Clean Error

  let args = msg.content.split(" "); //cmd [Amount, Solution] Time Desc rip tion

  var mySubString = msg.content.substring(
    msg.content.indexOf("[") + 1,
    msg.content.lastIndexOf("]")
  );
  console.log(mySubString); // Amount, Solution

  let answers_info = mySubString.split(",");
  if (!answers_info[1]) return;

  let answers_amount = answers_info[0];
  let answer_correct = answers_info[1];

  if (isNaN(answers_amount)) return;

  if (answer_correct < 1 || answer_correct > answers_amount) return;

  if (!args[2]) return;
  if (isNaN(args[2])) return;

  let time_hour = Number(args[2]);
  if (time_hour < 1 || time_hour > 24) return;

  let choice_emote = [];

  for (let i = 1; i <= answers_amount; i++) {
    await msg_target.react(EMOTE.NB_EMOTE[i - 1]);
    await choice_emote.push(EMOTE.NB_EMOTE[i - 1]);
  }

  let correctEmote = EMOTE.NB_EMOTE[answer_correct - 1];

  const filter = (reaction, user) => {
    return choice_emote.includes(reaction.emoji.name);
  };

  const collector = await msg_target.createReactionCollector({
    filter,
    time: 1000 * 60 * 60 * time_hour,
  });

  await collector.on("collect", (reaction, full_user) => {
    if (full_user.bot) return;
    for (element of reaction.message.reactions.cache) {
      if (element[0] != reaction.emoji.name) {
        reaction.message.reactions
          .resolve(element[0])
          .users.remove(full_user.id);
      }
    }
  });

  collector.on("end", async (collected, reason) => {
    let msg_target_updated = await msg.channel.messages.fetch(id); // Find the message to work with
    let finalUsers = [];
    if (!msg_target_updated) return;
    for (element of msg_target_updated.reactions.cache) {
      if (element[0] === correctEmote) {
        let array_correctUsers = await element[1].users.cache.map((u) => u);
        for (u in array_correctUsers) {
          if (!array_correctUsers[u].bot) {
            await finalUsers.push(array_correctUsers[u]);
          }
        }
      }
    }

    if (finalUsers.length != 0) {
      let winner = finalUsers[Math.floor(Math.random() * finalUsers.length)];

      msg.channel.send(
        `Le gagnant est ${winner} en ayant choisi la réponse ${correctEmote} ! Bravo :D`
      );
    } else {
      msg.channel.send("Personne n'a trouvé la bonne réponse !");
    }
  });
};
