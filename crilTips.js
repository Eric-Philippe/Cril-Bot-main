console.log("Start of the snippet");

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { TOKEN, tipsChannel } = require("./config");
const TIPS = require("./crilTips.json").TIPS;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log("Ready");
  let channel = await client.channels.cache.get(tipsChannel);
  if (!channel) return client.destroy();
  if (TIPS.length <= 0) return client.destroy();
  let embed = new EmbedBuilder()
    .setTitle("Nouveau Tips !")
    .setColor("Blurple")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1021024837625446491/OHNO.png"
    )
    .setFooter({ text: "cril.langues@iut-tlse.fr" })
    .setDescription(TIPS[Math.floor(Math.random() * TIPS.length)]);

  await channel.send({ embeds: [embed] });

  await client.destroy();

  console.log("End of the snippet");

  process.exit();
});

client.login(TOKEN);
