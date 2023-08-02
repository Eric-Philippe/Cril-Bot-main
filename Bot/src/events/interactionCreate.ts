import { Client, Events, GuildMember } from "discord.js";

import Commands from "../Commands";
import { Command } from "../models/Command";
import { ButtonId } from "../res/ButtonID";
import { PollsManager } from "../app/Poll/PollManager";
import { TossesManager } from "../app/Toss/TossesManager";
import { ContextMenu } from "../models/ContextMenu";
import ContextMenuCommands from "../ContextMenusCommands";
import Entry from "../app/Entry/Entry";
import { ModalId } from "../res/ModalID";
import Coaching from "../app/Coaching/Coaching";

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

    if (i.isUserContextMenuCommand() || i.isMessageContextMenuCommand()) {
      const command: ContextMenu | undefined = ContextMenuCommands.find(
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
        case i.customId == ButtonId.ENTRY_RENAME:
          Entry.init(i, i.member as GuildMember);
          break;
        case i.customId == ButtonId.LAUNCH_CODE_MODAL:
          Entry.askCodeModalIHM(i);
          break;
        case i.customId == ButtonId.DONT_HAVE_CODE:
          Entry.askCodeCancelIHM(i);
          break;
        case i.customId == ButtonId.START_QUIZZ:
          Entry.launchMCQ(i);
          break;
        case i.customId == ButtonId.COACHING + ":start":
          new Coaching(i);
          break;
      }
    }

    if (i.isModalSubmit()) {
      switch (i.customId) {
        case ModalId.ENTRY_RENAME:
          Entry.renameData(i);
          break;
        case ModalId.CODE_SUBMIT:
          Entry.askCodeData(i);
          break;
      }
    }
  });
};
