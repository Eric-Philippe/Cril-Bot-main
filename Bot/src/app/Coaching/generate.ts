import { CommandInteraction } from "discord.js";
import EmbedsCoaching from "./Embeds";

export default function generate(i: CommandInteraction) {
  i.channel.send(EmbedsCoaching.welcomeEmbed());
}
