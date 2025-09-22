import { SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "../../models/Command";

import { ColorsDPlace } from "../../app/DPlace/Colors.enum";
import Messages from "../../middlewares/Messages/Messages";
import { CHAN_DPLACE } from "../../config/config.guild";
import DPlaceDatabase from "../../app/DPlace/Dplace.database";
import { generateCanva } from "../../app/DPlace/GenerateCanva";
import Logger from "../../logger/Logger";

const pixel: Command = {
  description: "Put a pixel on the CrilPlace",

  data: new SlashCommandBuilder()
    .setName("pixel")
    .setDescription("Place un pixel sur le canvas !")
    .addIntegerOption((option) =>
      option
        .setName("x")
        .setDescription("Coordonnée x du pixel")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("y")
        .setDescription("Coordonnée y du pixel")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Couleur du pixel")
        .setRequired(true)
        .setChoices(
          {
            name: "Rouge",
            value: "RED",
          },
          {
            name: "Bleu",
            value: "BLUE",
          },
          {
            name: "Vert",
            value: "GREEN",
          },
          {
            name: "Jaune",
            value: "YELLOW",
          },
          {
            name: "Rose",
            value: "PINK",
          },
          {
            name: "Cyan",
            value: "CYAN",
          },
          {
            name: "Orange",
            value: "ORANGE",
          },
          {
            name: "Violet",
            value: "PURPLE",
          },
          {
            name: "Blanc",
            value: "WHITE",
          },
          {
            name: "Noir",
            value: "BLACK",
          },
          {
            name: "Marron",
            value: "BROWN",
          }
        )
    ) as SlashCommandBuilder,
  async run(interaction) {
    if (interaction.channelId !== CHAN_DPLACE) {
      Messages.sendWarning(
        interaction,
        `Cette commande ne peut être utilisée que dans le channel <#${CHAN_DPLACE}> !`,
        null,
        true
      );
      return;
    }

    const x = interaction.options.getInteger("x");
    const y = interaction.options.getInteger("y");
    const color = interaction.options.getString("color");
    const colorPicked = ColorsDPlace[color as keyof typeof ColorsDPlace];

    if (x < 0 || x > 30 || y < 0 || y > 30) {
      Messages.sendWarning(
        interaction,
        "Les coordonnées doivent être comprises entre 0 et 30 !",
        null,
        true
      );
      return;
    }

    if (!colorPicked) {
      Messages.sendWarning(
        interaction,
        "La couleur n'est pas valide !",
        null,
        true
      );
      return;
    }

    const placeChannel = (await interaction.guild.channels.cache.get(
      CHAN_DPLACE
    )) as TextChannel;

    let messagesCollection = await placeChannel.messages.fetch({
      limit: 100,
    });

    let messages = [];
    messagesCollection.forEach((message) => {
      messages.push(message);
    });

    // Sort the messages by their creation date
    messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

    // Take the second message sent in the channel
    let message = messages[1];

    await DPlaceDatabase.setPixel(x - 1, y - 1, colorPicked);

    Logger.logDPlace(interaction.user.id, colorPicked, x, y);
    const currentData = await DPlaceDatabase.get();

    await message.edit({
      files: [
        {
          attachment: await generateCanva(currentData),
          name: "canvas_image.png",
        },
      ],
    });

    Messages.sendSuccess(
      interaction,
      `Le pixel a bien été placé !`,
      null,
      true
    );
  },
};

export default pixel;
