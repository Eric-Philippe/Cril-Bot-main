import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { Command } from "../../models/Command";

import { ColorsDPlace } from "../../app/DPlace/Colors.enum";
import Messages from "../../middlewares/Messages/Messages";
import { CHAN_DPLACE } from "../../config/config.guild";
import DPlaceDatabase from "../../app/DPlace/Dplace.database";
import { generateCanva } from "../../app/DPlace/GenerateCanva";

const pixel: Command = {
  description: "Replace a specific pixel color on the CrilPlace",

  data: new SlashCommandBuilder()
    .setName("replace-pixel")
    .setDescription("Replace a specific pixel color on the CrilPlace")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .addStringOption((option) =>
      option
        .setName("color1")
        .setDescription("Couleur à remplacer")
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
    )
    .addStringOption((option) =>
      option
        .setName("color2")
        .setDescription("Couleur remplaçante")
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
    ),
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

    const color1 = interaction.options.getString("color1");
    const color2 = interaction.options.getString("color2");
    const color1Picked = ColorsDPlace[color1 as keyof typeof ColorsDPlace];
    const color2Picked = ColorsDPlace[color2 as keyof typeof ColorsDPlace];

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

    await DPlaceDatabase.replacePixelsByColor(color1Picked, color2Picked);

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
