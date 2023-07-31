import {
  ButtonInteraction,
  ChannelType,
  EmbedBuilder,
  Guild,
  GuildMember,
  ModalSubmitInteraction,
  TextChannel,
  ThreadChannel,
} from "discord.js";

export default class EntryThread {
  private interaction: ModalSubmitInteraction;
  private thread: ThreadChannel;

  constructor(interaction: ModalSubmitInteraction) {
    this.interaction = interaction;
  }

  public async create() {
    const channel = this.interaction.channel as TextChannel;
    const member = this.interaction.member as GuildMember;
    const name = `Quizz - ${member.nickname}`;
    const alreadyExistingThread = channel.threads.cache.find(
      (thread) => thread.name === name
    );

    if (alreadyExistingThread) {
      this.thread = alreadyExistingThread;
      return;
    } else {
      this.thread = await channel.threads.create({
        name: `Quizz - ${member.nickname}`,
        type: ChannelType.PrivateThread,
        reason: "Quizz Entry for " + member.nickname,
      });
    }

    await this.thread.members.add(member.id);
  }

  public async getThreadURL() {
    return `https://discord.com/channels/${this.interaction.guildId}/${this.thread.id}`;
  }

  public async safeClean() {
    try {
      await this.thread.delete();
    } catch (error) {
      console.log(error);
    }
  }
}
