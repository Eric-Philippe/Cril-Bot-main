import { GuildMember } from "discord.js";
import Entry from "./app/Entry/Entry";
import { PollsManager } from "./app/Poll/PollManager";
import { TossesManager } from "./app/Toss/TossesManager";
import { StaticButton } from "./models/StaticButton";
import { ButtonId } from "./res/ButtonID";
import Coaching from "./app/Coaching/Coaching";
import Desk from "./app/HelpDesk/Desk";
import Support from "./app/HelpDesk/Support";
import StaticButtonBuilder from "./models/StaticButtonBuilder";

const Buttons: StaticButton[] = [];

const Poll: StaticButton = {
  validator: new StaticButtonBuilder().startsWith(ButtonId.POLL),
  run: (i) => PollsManager.updatePoll(i),
};

const TossParticipate: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.TOSS_PARTICIPATE),
  run: (i) => TossesManager.newParticipation(i, i.message.id, i.user.id),
};

const TossEnd: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.TOSS_END),
  run: (i) => TossesManager.endToss(i, i.message.id),
};

const EntryRename: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.ENTRY_RENAME),
  run: (i) => Entry.init(i, i.member as GuildMember),
};

const CodeModal: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.LAUNCH_CODE_MODAL),
  run: (i) => Entry.askCodeModalIHM(i),
};

const NoCode: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.DONT_HAVE_CODE),
  run: (i) => Entry.askCodeModalIHM(i),
};

const StartQuizz: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.START_QUIZZ),
  run: (i) => Entry.launchMCQ(i),
};

const RetryQuizz: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.RETRY_MCQ),
  run: (i) => Entry.launchMCQ(i),
};

const CoachingStart: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.COACHING + ":start"),
  run: async (i) => {
    new Coaching(i);
  },
};

const HelpDesk: StaticButton = {
  validator: new StaticButtonBuilder().endsWith(ButtonId.HELP_DESK_SUFFIX),
  run: (i) => Desk.answerHelpDesk(i),
};

const EndSupport: StaticButton = {
  validator: new StaticButtonBuilder().equals(ButtonId.END_SUPPORT),
  run: async (i) => Support.validationButton(i),
};

Buttons.push(
  Poll,
  TossParticipate,
  TossEnd,
  EntryRename,
  CodeModal,
  NoCode,
  StartQuizz,
  CoachingStart,
  HelpDesk,
  EndSupport,
  RetryQuizz
);

export default Buttons;
