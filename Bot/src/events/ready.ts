import { Client, Events } from "discord.js";

export default (client: Client) => {
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });
};
