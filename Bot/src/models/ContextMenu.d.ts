import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from "discord.js";

/**
 * @description This interface is used to define a ContextMenu
 * @param data The data of the command
 * @param run The run function of the command
 */
export interface ContextMenu {
  data: ContextMenuCommandBuilder;
  run: (interaction: ContextMenuCommandInteraction) => Promise<void>;
}
