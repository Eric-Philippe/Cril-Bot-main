import { ButtonInteraction } from "discord.js";
import StaticButtonBuilder from "./StaticButtonBuilder";

export interface StaticButton {
  validator: StaticButtonBuilder;
  run: (interaction: ButtonInteraction) => Promise<void>;
}
