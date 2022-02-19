const { client } = require("./utils/client"); //Client object
const { con } = require("./utils/mysql"); // Database Connexion

const { TOKEN } = require("./token.json"); // Private token
const { PREFIX } = require("./config.json"); // Prefix

// ############ Self Independant ##############
const Reminder = require("./commands/remindMe"); // RemindMe SelfIncrement
const { statusEdit } = require("./utils/status");

// ############ All Messages ##################
const { cmdGrabber } = require("./commands/commandsGrabber"); // Manager / Launcher for the commands
const chatBot = require("./helpSystem/chatBot"); // Chat Bot Help Support

// ############ Member Add Update #############
const Entry = require("./entry/entry"); // Manager for the entry system

// ############ Reaction Update ###############
const { pollRequest } = require("./commands/poll"); // Poll Update
const { reactionRole } = require("./pluginEmbed"); // ReactionRole Message

/** Wake up on ready state */
client.on("ready", async () => {
  console.log(`Logged into: ${client.user.tag}`);

  //statusEdit(); // Status auto update
  client.user.setActivity("Happy Birthday 🎂");

  con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected to database as ID : " + con.threadId);
    Reminder.remindCheck();
  });
});

/** Wake up on message sent */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  if (msg.content.startsWith(PREFIX)) {
    cmdGrabber(msg);
  } else {
    new chatBot(msg);
  }
});

/** Wake up on reaction added */
client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await reactionRole(reaction, user);
  await pollRequest(reaction, user, true);
});

/** Wake up on reaction removed */
client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await pollRequest(reaction, user, false);
});

/** Wake up on new member income */
client.on("guildMemberAdd", (member) => {
  if (member.user.bot) return;
  if (member.user.id === client.user.id) return;
  new Entry(member);
});

/** Login on token */
client.login(TOKEN);
