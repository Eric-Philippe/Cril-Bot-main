import {
  ButtonInteraction,
  ComponentType,
  GuildMember,
  Message,
  TextChannel,
} from "discord.js";
import Cooldown from "../../utils/CoolDown";
import Options from "./Embeds";
import Logger from "../../logger/Logger";
import { getMsToMMSS, isLate, isMoreEarlyThan } from "../../utils/Date";
import {
  separateFirstNameAndLastName,
  wordToSqlJokerReady,
} from "../../utils/String";
import { AppDataSource } from "../../data-source";
import { InscriptionsCoaching } from "../../entities/InscriptionsCoaching";
import KEYWORDS_COACHING from "./Keywords";
import { ButtonId } from "../../res/ButtonID";
import {
  CHAN_COACH_FIRST,
  CHAN_COACH_PLUS,
  CHAN_COACH_SEC,
  CHAN_COACH_THIRD,
} from "../../config/config.guild";
import reply from "../../utils/Interaction";

const log = Logger.logCoaching;
const COACHING = "COACHING";

export default class Coaching {
  private i: ButtonInteraction;
  private member: GuildMember;

  constructor(interaction: ButtonInteraction) {
    this.i = interaction;
    this.member = interaction.member as GuildMember;
    this.checkCooldown();
  }

  checkCooldown() {
    const userId = this.member.id;

    const currentCooldown = Cooldown.get(userId, COACHING);
    if (currentCooldown != null) {
      const remainingTime = Cooldown.getRemainingTime(userId, COACHING);
      const remainingTimeStr = getMsToMMSS(remainingTime);
      log(userId, "ALREADY CLICKED : " + remainingTimeStr);
      return reply(this.i, Options.coolDownEmbed(remainingTimeStr));
    }

    Cooldown.startCooldDown(userId, 1000 * 90, null, COACHING);

    this.fetchCoaching();
  }

  async fetchCoaching() {
    const nickname = this.member.nickname;

    if (!nickname)
      return reply(this.i, {
        content:
          "Vos nom et prénom ne sont pas configurés correctement. Contactez une responsable !",
        ephemeral: true,
      });
    // Split the text to fetch the firstname and lastname, the firstname can be on or two words starting with a capital letter and the lastname is the last word of the nickname being fully capitalized
    const { firstname: firstname, lastname: lastname } =
      separateFirstNameAndLastName(nickname);

    const res = await AppDataSource.createQueryBuilder()
      .select()
      .from(InscriptionsCoaching, "i")
      .where(
        "LOWER(i.firstname) LIKE LOWER(:firstname) AND LOWER(i.lastname) LIKE LOWER(:lastname)",
        {
          firstname: wordToSqlJokerReady(firstname),
          lastname: wordToSqlJokerReady(lastname),
        }
      )
      .execute();

    if (res.length == 0) return this.userNotFound(this.i);

    const coachingSelected = res[0];

    const coachingDate = coachingSelected.slot;
    if (isLate(coachingDate)) {
      log(this.member.id, "USER LATE");
      return reply(this.i, Options.lateEmbed());
    }

    if (isMoreEarlyThan(coachingDate, 60)) {
      log(this.member.id, "USER EARLY");
      return reply(this.i, Options.earlyEmbed());
    }

    await this.determineWichCoaching(coachingSelected);
  }

  async determineWichCoaching(coaching?: InscriptionsCoaching) {
    let coachingIndex = -1;

    if (!coaching) await this.askWichCoaching();
    else
      coachingIndex = await Coaching.determineCoachingFromText(
        coaching.comment_coaching
      );
    if (coachingIndex == -1) coachingIndex = await this.askWichCoaching();

    this.unlockChannel(coachingIndex);
  }

  unlockChannel(coachingIndex: number) {
    let channelId;

    switch (coachingIndex) {
      case 0:
        return this.debAFaire();
      case 1:
        channelId = CHAN_COACH_FIRST;
        break;
      case 2:
        return this.ficheAFaire();
      case 3:
        channelId = CHAN_COACH_SEC;
        break;
      case 4:
        channelId = CHAN_COACH_THIRD;
        break;
      case 5:
        channelId = CHAN_COACH_PLUS;
        break;
    }

    if (!channelId) return;

    const coachingChannel = this.member.guild.channels.cache.get(
      channelId
    ) as TextChannel;
    if (!coachingChannel) return this.i.reply(Options.errorEmbed());

    coachingChannel.permissionOverwrites.edit(this.member.id, {
      SendMessages: true,
      ViewChannel: true,
    });

    reply(this.i, Options.channelUnlockedEmbedIn(channelId));
    coachingChannel.send(Options.channelUnlockedEmbedOut(this.member.id));

    setTimeout(() => {
      coachingChannel.permissionOverwrites.delete(this.member.id);
    }, 1000 * 60 * 60 * 2); // 2 hours
  }

  async userNotFound(i: ButtonInteraction) {
    const { firstname, lastname } = separateFirstNameAndLastName(
      this.member.nickname
    );

    log(
      this.member.id,
      `${firstname} ${lastname} not found in the coaching inscriptions`
    );

    reply(i, Options.verificationCoaching());

    const response = await this.i.fetchReply();

    const isYes = await this.collectorYesOrNo(response);
    if (isYes) this.determineWichCoaching();
    else reply(this.i, Options.tryAgainEmbed());
  }

  async ficheAFaire() {
    reply(this.i, Options.ficheAFaireEmbed());

    const response = await this.i.fetchReply();

    const isYes = await this.collectorYesOrNo(response);

    if (isYes) {
      const coachingIndex = await this.askWichCoaching();
      this.unlockChannel(coachingIndex);
    } else reply(this.i, Options.sorryEmbed());
  }

  async debAFaire() {
    reply(this.i, Options.debAFaireEmbed());

    const response = await this.i.fetchReply();

    const isYes = await this.collectorYesOrNo(response);

    if (isYes) {
      const coachingIndex = await this.askWichCoaching();
      this.unlockChannel(coachingIndex);
    } else reply(this.i, Options.sorryEmbed());
  }

  askWichCoaching(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      await reply(this.i, Options.coachingChoice());
      const response = await this.i.fetchReply();
      if (!response) return;

      const filter = (buttonInteraction: ButtonInteraction) =>
        buttonInteraction.user.id === this.member.id;
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 1000 * 60 * 10, // 10 minutes
      });

      collector.on("collect", async (buttonInteraction) => {
        switch (buttonInteraction.customId) {
          case `${ButtonId.COACHING}:first`:
            resolve(1);
            break;
          case `${ButtonId.COACHING}:second`:
            resolve(3);
            break;
          case `${ButtonId.COACHING}:third`:
            resolve(4);
            break;
          case `${ButtonId.COACHING}:fourth`:
            resolve(5);
            break;
        }

        this.i = buttonInteraction;
      });
    });
  }

  private async collectorYesOrNo(msg: Message<boolean>) {
    return new Promise(async (resolve, reject) => {
      const filter = (buttonInteraction: ButtonInteraction) =>
        buttonInteraction.user.id === this.member.id;
      const collector = msg.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 1000 * 60 * 10, // 10 minutes
      });

      collector.on("collect", async (buttonInteraction) => {
        switch (buttonInteraction.customId) {
          case `${ButtonId.COACHING}:yes`:
            resolve(true);
            break;
          case `${ButtonId.COACHING}:no`:
            resolve(false);
            break;
        }

        this.i = buttonInteraction;
      });
    });
  }

  private static determineCoachingFromText(keyword: string) {
    if (keyword == "" || keyword == null) return -1;

    let normamlizedKeyword = keyword
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    for (const keywordDef of KEYWORDS_COACHING) {
      if (Coaching.isInKeywordArray(normamlizedKeyword, keywordDef.keywords))
        return keywordDef.index;
    }

    return -1;
  }

  private static isInKeywordArray(str: string, keywords: string[]) {
    for (const keyword of keywords) {
      if (keyword.includes("$")) {
        let keywordSplit = keyword.split("$");
        if (str.includes(keywordSplit[0]) && str.includes(keywordSplit[1])) {
          return true;
        }
      } else if (str.includes(keyword)) {
        return true;
      }
    }
    return false;
  }
}
