import { Client, Events } from "discord.js";

import Commands from "../Commands";
import { Command } from "../Command";
import { ButtonId } from "../res/ButtonID";
import { PollsManager } from "../middlewares/Poll/PollManager";
import { TossesManager } from "../middlewares/Toss/TossesManager";

export default (client: Client) => {
  client.on(Events.InteractionCreate, (i) => {
    if (i.isChatInputCommand()) {
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
    }

    if (i.isAutocomplete()) {
      const command: Command | undefined = Commands.find(
        (c) => c.data.name === i.commandName
      );

      if (!command) return;

      try {
        command.autocomplete(i);
      } catch (error) {
        console.error(error);
      }
    }

    if (i.isButton()) {
      switch (true) {
        case i.customId.startsWith(ButtonId.POLL):
          PollsManager.updatePoll(i);
          break;
        case i.customId == ButtonId.TOSS_PARTICIPATE:
          TossesManager.newParticipation(i, i.message.id, i.user.id);
          break;
        case i.customId == ButtonId.TOSS_END:
          TossesManager.endToss(i, i.message.id);
      }
    }
  });
};
