import { SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "../../models/Command";
import {
  CHAN_COACH_FIRST,
  CHAN_COACH_PLUS,
  CHAN_COACH_SEC,
  CHAN_COACH_THIRD,
} from "../../config/config.guild";
import Messages from "../../middlewares/Messages/Messages";

const coachingAccess: Command = {
  description: "Open a coaching channel for 2 hours for the target user",

  data: new SlashCommandBuilder()
    .setName("coaching-access")
    .setDescription("Open a coaching channel for 2 hours for the target user")
    .addUserOption((option) =>
      option.setName("user").setDescription("User").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to unlock")
        .setRequired(true)
        .addChoices(
          { name: "1er-Coaching", value: CHAN_COACH_FIRST },
          { name: "2ème-Coaching", value: CHAN_COACH_SEC },
          { name: "3ème-Coaching", value: CHAN_COACH_THIRD },
          { name: "Coaching-Plus", value: CHAN_COACH_PLUS }
        )
    ),
  async run(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("user");
    const channel = interaction.options.getString("channel");

    if (!user || !channel) {
      interaction.editReply("Merci de fournir un utilisateur et un channel");
      return;
    }

    const coachingChannel = interaction.guild.channels.cache.get(
      channel
    ) as TextChannel;
    if (!coachingChannel) {
      interaction.editReply("Merci de fournir un channel valide");
      return;
    }

    coachingChannel.permissionOverwrites.edit(user.id, {
      SendMessages: true,
      ViewChannel: true,
    });

    Messages.sendSuccess(
      interaction,
      `Le channel <#${channel}> a été débloqué pour ${user}`
    );

    coachingChannel.send({
      content: `${user}`,
      allowedMentions: { users: [user.id] },
    });

    setTimeout(() => {
      coachingChannel.permissionOverwrites.delete(user.id);
    }, 1000 * 60 * 60 * 2); // 2 hours
  },
};

export default coachingAccess;
