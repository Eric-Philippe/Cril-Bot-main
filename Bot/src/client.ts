import { Client, Events, GatewayIntentBits } from "discord.js";

import { BOT_TOKEN } from "./config.bot";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.login(BOT_TOKEN);

export default client;
