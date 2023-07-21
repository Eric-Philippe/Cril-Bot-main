import { Client, Events } from "discord.js";

import Commands from "../Commands";
import { Command } from "../Command";

export default (client: Client) => {
  client.on(Events.InteractionCreate, (i) => {
    if (!i.isChatInputCommand()) return;

    const command: Command | undefined = Commands.find(
      (c) => c.data.name === i.commandName
    );

    if (!command) return;

    try {
      command.run(i);
    } catch (error) {
      console.error(error);
      i.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
};
