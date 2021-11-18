const { client } = require("./utils/client"); //Client object

const { TOKEN } = require("./token.json"); // ¨Private token
const { PREFIX } = require("./config.json"); // Prefix

const { cmdGrabber } = require("./commands/commandsGrabber"); // Manager / Launcher for the commands
const Entry = require("./entry/entry"); // Manager for the entry system

const { poll, pollRequest } = require("./commands/poll");

/** Wake up on ready state */
client.on("ready", () => {
  console.log(`Logged into: ${client.user.tag}`);
});

/** Wake up on message sent */
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  if (msg.content.startsWith(PREFIX)) {
    cmdGrabber(msg);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  await pollRequest(reaction);
});
client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
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
