const { client } = require("./utils/client");

const { TOKEN } = require("./token.json");
const { PREFIX } = require("./config.json");

const { cmdGrabber } = require("./commands/commandsGrabber");
const Entry = require("./entry/entry");
const Discord = require("discord.js");

client.on("ready", () => {
  console.log(`Logged into: ${client.user.tag}`);
});

//Msg Event
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  if (msg.content.startsWith(PREFIX)) {
    cmdGrabber(msg);
  }
});

client.on("guildMemberAdd", (member) => {
  if (member.user.bot) return;
  if (member.user.id === client.user.id) return;
  new Entry(member);
});

client.on('interactionCreate', async interaction => {

})

client.login(TOKEN);
