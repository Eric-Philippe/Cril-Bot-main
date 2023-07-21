import {
  SlashCommandBuilder,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";

export interface Command {
  description: string;
  data: SlashCommandBuilder;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  run: (interaction: ChatInputCommandInteraction) => Promise<any>;
}
