const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js"); // Discord.js basic import
const { TOKEN, tipsChannel } = require("./config"); // Token import
const TIPS = require("./crilTips.json").TIPS; // Array of tips import

console.log("Start of the snippet"); // Start of the snippet
client.login(TOKEN); // Login to the bot

// Client Builder
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});
// Whenever the client is ready
client.on("ready", async () => {
  console.log("Ready"); // Ready Balise
  // Get the tips channel
  let channel = await client.channels.cache.get(tipsChannel);
  // If the channel is not found
  if (!channel) return client.destroy();
  // If the array of tips is empty
  if (TIPS.length <= 0) return client.destroy();
  // New Embed
  let embed = new EmbedBuilder()
    .setTitle("Nouveau Tips !")
    .setColor("Blurple")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1021024837625446491/OHNO.png"
    )
    .setFooter({ text: "cril.langues@iut-tlse.fr" })
    // Get a random tip
    .setDescription(TIPS[Math.floor(Math.random() * TIPS.length)]);
  // Send the embed tip
  await channel.send({ embeds: [embed] });
  // Destroy the client
  await client.destroy();

  console.log("End of the snippet"); // End of the snippet
  // Leave the process
  process.exit();
});
