import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  GuildMember,
  ModalSubmitInteraction,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import { Colors } from "../../middlewares/Messages/Colors";
import { ButtonId } from "../../res/ButtonID";

export default class EntryThread {
  private interaction: ModalSubmitInteraction;
  private thread: ThreadChannel;

  constructor(interaction: ModalSubmitInteraction) {
    this.interaction = interaction;
  }

  public async create() {
    const channel = this.interaction.channel as TextChannel;
    const member = this.interaction.member as GuildMember;
    const name = `Quiz - ${member.nickname}`;
    const alreadyExistingThread = channel.threads.cache.find(
      (thread) => thread.name === name
    );

    if (alreadyExistingThread) {
      this.thread = alreadyExistingThread;
    } else {
      this.thread = await channel.threads.create({
        name: `Quiz - ${member.nickname}`,
        type: ChannelType.PrivateThread,
        reason: "Quizz Entry for " + member.nickname,
      });
    }

    await this.thread.members.add(member.id);

    const embed = new EmbedBuilder()
      .setTitle("Quizz")
      .setDescription("Cliquez sur commencer le quiz pour démarrer.")
      .setColor(Colors.PURPLE)
      .setFooter({ text: "QCM - Cril", iconURL: member.guild.iconURL() });

    const button = new ButtonBuilder()
      .setCustomId(ButtonId.START_QUIZZ)
      .setEmoji("🎮")
      .setLabel("Commencer le quiz")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await this.thread.send({
      embeds: [embed],
      components: [row],
    });
  }

  public async getThreadURL() {
    return `https://discord.com/channels/${this.interaction.guildId}/${this.thread.id}`;
  }

  public async safeClean() {
    try {
      await this.thread.delete();
    } catch (error) {}
  }
}
