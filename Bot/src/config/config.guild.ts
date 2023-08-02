require("dotenv").config();

const {
  CHAN_DPLACE,
  CHAN_SUPPORT,
  CHAN_LOGS,
  CHAN_CONTINUER,
  CHAN_JUSTCHATTING,
  CHAN_BOT,
  CHAN_MEMES,
  CHAN_AW,
  CHAN_COACH_FIRST,
  CHAN_COACH_SEC,
  CHAN_COACH_THIRD,
  CHAN_COACH_PLUS,
  ROLE_ADMIN,
  ROLE_TEMP_TEACHER,
  ROLE_TEMP_TUTOR,
  ROLE_TEMP_ETU,
  ROLE_TEMP_INVITE,
  ROLE_TEACHER,
  ROLE_TUTOR,
  ROLE_ETU,
  ROLE_INVITE,
} = process.env;

if (
  !CHAN_DPLACE ||
  !CHAN_SUPPORT ||
  !CHAN_LOGS ||
  !CHAN_CONTINUER ||
  !CHAN_JUSTCHATTING ||
  !CHAN_BOT ||
  !CHAN_MEMES ||
  !CHAN_AW ||
  !CHAN_COACH_FIRST ||
  !CHAN_COACH_SEC ||
  !CHAN_COACH_THIRD ||
  !CHAN_COACH_PLUS ||
  !ROLE_ADMIN ||
  !ROLE_TEMP_TEACHER ||
  !ROLE_TEMP_TUTOR ||
  !ROLE_TEMP_ETU ||
  !ROLE_TEMP_INVITE ||
  !ROLE_TEACHER ||
  !ROLE_TUTOR ||
  !ROLE_ETU ||
  !ROLE_INVITE
) {
  throw new Error("Missing environment variables");
}

const TEMP_ROLES_ID = [
  ROLE_TEMP_TEACHER,
  ROLE_TEMP_TUTOR,
  ROLE_TEMP_ETU,
  ROLE_TEMP_INVITE,
];

const TEMP_ROLES_ID_WITH_PERM = [
  ROLE_TEMP_TEACHER,
  ROLE_TEMP_TUTOR,
  ROLE_TEMP_INVITE,
];

const ROLE_DEF = [ROLE_TEACHER, ROLE_TUTOR, ROLE_ETU, ROLE_INVITE];

const ENTRY_CHANNELS = [
  CHAN_CONTINUER,
  CHAN_JUSTCHATTING,
  CHAN_BOT,
  CHAN_MEMES,
  CHAN_AW,
];

export {
  CHAN_DPLACE,
  CHAN_SUPPORT,
  CHAN_LOGS,
  CHAN_CONTINUER,
  CHAN_JUSTCHATTING,
  CHAN_BOT,
  CHAN_MEMES,
  CHAN_AW,
  CHAN_COACH_FIRST,
  CHAN_COACH_SEC,
  CHAN_COACH_THIRD,
  CHAN_COACH_PLUS,
  ROLE_ADMIN,
  ROLE_TEMP_TEACHER,
  ROLE_TEMP_TUTOR,
  ROLE_TEMP_ETU,
  ROLE_TEMP_INVITE,
  ROLE_TEACHER,
  ROLE_TUTOR,
  ROLE_ETU,
  ROLE_INVITE,
  TEMP_ROLES_ID,
  TEMP_ROLES_ID_WITH_PERM,
  ROLE_DEF,
  ENTRY_CHANNELS,
};
