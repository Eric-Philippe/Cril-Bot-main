import { ButtonInteraction, InteractionReplyOptions } from "discord.js";

const reply = async (
  i: ButtonInteraction,
  options: InteractionReplyOptions
) => {
  if (i.replied || i.deferred) return;

  try {
    await i.reply(options);
    return;
  } catch (e) {}
};

export default reply;
