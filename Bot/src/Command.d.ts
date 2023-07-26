import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

/**
 * @description This interface is used to define a command
 * @param descripimpOmit<SlashCommandBuilder, SlashCommandBuilder>orttion The description of the command
 * @param data The data of the command
 * @param autocomplete The autocomplete function of the command
 * @param run The run function of the command
 */
export interface Command {
  description: string;
  data:
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | Omit<
        SlashCommandBuilder,
        | "addBooleanOption"
        | "addUserOption"
        | "addChannelOption"
        | "addRoleOption"
        | "addAttachmentOption"
        | "addMentionableOption"
        | "addStringOption"
        | "addIntegerOption"
        | "addNumberOption"
      >;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
