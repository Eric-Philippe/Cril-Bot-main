import { Client, GatewayIntentBits, Partials } from "discord.js";

import { BOT_TOKEN } from "./config/config.bot";

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
  partials: [Partials.Message, Partials.Channel],
});

client.login(BOT_TOKEN);

export default client;
