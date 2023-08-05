import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import { getDriveMetrics } from "../../GoogleAPI/Drive/File.service";
import { getDbMetrics } from "../../data-source";
import { Colors } from "../../middlewares/Messages/Colors";
import { Command } from "../../models/Command";

const googleMetricScale = [1000, 1500, 9999];
const dbMetricScale = [50, 500, 9999];
const pingScale = [150, 300, 9999];
const emotes = ["🟢", "🟡", "🔴"];

const status: Command = {
  description: "Inform about the current state of the bot and its services.",

  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Informe sur l'état actuel du bot et de ses services.")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
  async run(interaction) {
    Messages.sendLoading(interaction, "Récupération des données...");

    let googleMetric = await getDriveMetrics();
    let dbMetric = await getDbMetrics();
    let ping = interaction.client.ws.ping;
    let uptime = interaction.client.uptime;

    const embed = new EmbedBuilder()
      .setTitle("📊 - Status des services CrilBot - ")
      .addFields(
        {
          // Hours / Minutes / Seconds
          name: "🕒 | Uptime : ",
          value: `${Math.floor(uptime / 3600000)}h ${Math.floor(
            (uptime % 3600000) / 60000
          )}m ${Math.floor(((uptime % 3600000) % 60000) / 1000)}s`,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "📄 | Google Drive : ",
          value: `${
            emotes[getMetricIndex(googleMetric, googleMetricScale)]
          } | ${googleMetric} ms`,
        },
        {
          name: "💾 | Base de données : ",
          value: `${
            emotes[getMetricIndex(dbMetric, dbMetricScale)]
          } | ${dbMetric} ms`,
        },
        {
          name: "🐢 | Ping : ",
          value: `${emotes[getMetricIndex(ping, pingScale)]} | ${ping} ms`,
        }
      )
      .setColor(Colors.PURPLE)
      .setFooter({ text: "🟢 Good | 🟡 Slow | 🔴 Off" });

    await Messages.updateReply(interaction, embed);
  },
};

const getMetricIndex = (metric: number, scale: number[]) => {
  for (let i = 0; i < scale.length; i++) {
    if (metric < scale[i]) return i;
  }
  return scale.length - 1;
};

export default status;
