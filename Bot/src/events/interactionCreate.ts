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
import Desk from "../app/HelpDesk/Desk";
import Support from "../app/HelpDesk/Support";
import Buttons from "../StaticButtons";
import { StaticButton } from "../models/StaticButton";

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
        }).catch();
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
        }).catch();
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
      // If the button is from a message that has been sent from the bot
      if (i.message.author.id != client.user?.id) return;

      if (
        i.customId.startsWith(ButtonId.MCQ_ANSWER) ||
        i.customId.includes(":yes") ||
        i.customId.includes(":no")
      )
        return;

      const button: StaticButton | undefined = Buttons.find((b) =>
        b.validator.check(i.customId)
      );

      if (!button) {
        setTimeout(() => {
          if (!i.replied)
            i.reply({
              content: "Bouton non reconnu",
              ephemeral: true,
            }).catch();
        }, 1000);

        return;
      }

      try {
        button.run(i);
      } catch (error) {
        console.error(error);
        i.reply({
          content: "There was an error while executing this button command !",
          ephemeral: true,
        }).catch();
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
        case ModalId.HELP_MODAL:
          Support.needMoreHelpModalSubmit(i);
          break;
      }

      if (i.customId.startsWith("validation_")) Support.treatValidation(i);
    }
  });
};
