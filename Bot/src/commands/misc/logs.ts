import {
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../models/Command";
import { AppDataSource } from "../../data-source";
import { LogsEntry } from "../../entities/LogsEntry";
import { LogsCoaching } from "../../entities/LogsCoaching";
import { Between, FindOptionsWhere, Repository } from "typeorm";
import { dateToDateHours } from "../../utils/Date";
import Messages from "../../middlewares/Messages/Messages";

const logs: Command = {
  description: "Inform about the current state of the bot and its services.",

  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Informe sur l'état actuel du bot et de ses services.")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("entry")
        .setDescription("Affiche les logs d'entrée du bot.")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
        .addStringOption((option) =>
          option
            .setName("date")
            .setDescription("Date à cibler")
            .addChoices(
              { name: "Aujourd'hui", value: "today" },
              { name: "Hier", value: "yesterday" },
              { name: "7 derniers jours", value: "last7" },
              { name: "30 derniers jours", value: "last30" },
              { name: "Tout", value: "all" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("coaching")
        .setDescription("Affiche les logs du coaching.")
        .addUserOption((option) =>
          option.setName("user").setDescription("Utilisateur à cibler")
        )
        .addStringOption((option) =>
          option
            .setName("date")
            .setDescription("Date à cibler")
            .addChoices(
              { name: "Aujourd'hui", value: "today" },
              { name: "Hier", value: "yesterday" },
              { name: "7 derniers jours", value: "last7" },
              { name: "30 derniers jours", value: "last30" },
              { name: "Tout", value: "all" }
            )
        )
    ) as SlashCommandBuilder,
  async run(interaction) {
    await interaction.deferReply();

    const subcommand = interaction.options.getSubcommand();
    const userTarget = interaction.options.getUser("user");
    const dateTarget = interaction.options.getString("date");

    let repo: Repository<LogsEntry | LogsCoaching>;
    switch (subcommand) {
      case "entry":
        repo = AppDataSource.getRepository(LogsEntry);
        break;
      case "coaching":
        repo = AppDataSource.getRepository(LogsCoaching);
        break;
    }

    let where: FindOptionsWhere<LogsEntry | LogsCoaching> = {};

    if (userTarget) where.userId = userTarget.id;
    if (dateTarget != null && dateTarget != "all") {
      const date = new Date();
      const now = new Date();
      switch (dateTarget) {
        case "today":
          date.setDate(date.getDate() - 1);
          break;
        case "yesterday":
          date.setDate(date.getDate() - 2);
          break;
        case "last7":
          date.setDate(date.getDate() - 7);
          break;
        case "last30":
          date.setDate(date.getDate() - 30);
          break;
      }
      where.entryDate = Between(date, now);
    }

    const result = await repo.find({
      where: where,
    });

    if (result.length == 0) {
      Messages.sendInfo(interaction, "Aucun résultat !");
      return;
    }

    let stringBuilder = "";

    for (const entry of result) {
      stringBuilder += `${dateToDateHours(entry.entryDate)} - ${
        entry.userId
      } - ${entry.msg}\n`;
    }

    const attachment = new AttachmentBuilder(Buffer.from(stringBuilder), {
      name: "logs.txt",
    });

    await interaction.editReply({
      files: [attachment],
    });
  },
};

export default logs;
