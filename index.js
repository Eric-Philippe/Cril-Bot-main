require("require-sql");

const { client } = require("./utils/client"); //Client object
const { con } = require("./utils/mysql");

const { TOKEN } = require("./token.json"); // ¨Private token
const { PREFIX } = require("./config.json"); // Prefix

const { cmdGrabber } = require("./commands/commandsGrabber"); // Manager / Launcher for the commands
const Entry = require("./entry/entry"); // Manager for the entry system

const { pollRequest } = require("./commands/poll");

/** Wake up on ready state */
client.on("ready", () => {
  console.log(`Logged into: ${client.user.tag}`);

  con.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected to database !");
  });
});

/** Wake up on message sent */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  if (msg.content.startsWith(PREFIX)) {
    cmdGrabber(msg);
  }
});

/** Wake up on reaction added */
client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await pollRequest(reaction);
});

/** Wake up on reaction removed */
client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
  let msg = await reaction.message.channel.messages.fetch(reaction.message.id);
  if (!msg.author.bot) return;
  await pollRequest(reaction);
});

/** Wake up on new member income */
client.on("guildMemberAdd", (member) => {
  if (member.user.bot) return;
  if (member.user.id === client.user.id) return;
  new Entry(member);
});

/** Login on token */
client.login(TOKEN);
