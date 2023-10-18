import { EmbedBuilder, Message, ThreadChannel } from "discord.js";

import { THREAD_MSG_SUPP_LOG } from "../config/config.guild";

const threadLogger = async (msg: Message<boolean>) => {
  const logThread = (await msg.guild?.channels.fetch(
    THREAD_MSG_SUPP_LOG
  )) as ThreadChannel;
  if (!logThread) return;

  const embed = new EmbedBuilder()
    .setTitle(
      `🤡 ${msg.author.username} a essayé d'envoyer un message trop tôt...`
    )
    .setDescription(`🐌 **Message :** ${msg.content}`)
    .setColor("Fuchsia")
    .setTimestamp()
    .setFooter({
      text: `ID : ${msg.author.username}`,
      iconURL: msg.author.avatarURL(),
    });

  await logThread.send({ embeds: [embed] });

  return;
};

export default threadLogger;
