import { Client, GatewayIntentBits } from "discord.js";

import { BOT_TOKEN } from "./config.bot";

/**
 * Main Discord Client Instance
 */
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
