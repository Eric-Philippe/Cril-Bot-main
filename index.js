const { client } = require("./utils/client");

const { TOKEN } = require("./token.json");

const { cmdGrabber } = require("./commands/commandsGrabber");

client.on("ready", () => {
  console.log(`Logged into: ${client.user.tag}`);
});

//Msg Event
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;
  cmdGrabber(msg);
});

client.login(TOKEN);
