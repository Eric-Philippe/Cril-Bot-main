require("dotenv").config();

const {
  GUILD_DPLACE_C_ID,
  GUILD_SUPPORT_C_ID,
  GUILD_LOGS_C_ID,
  ADMIN_ROLE,
  TEACHER_TEMP_ROLE,
  TUTOR_TEMP_ROLE,
  ETU_TEMP_ROLE,
  INVITE_TEMP_ROLE,
  TEACHER_ROLE,
  TUTOR_ROLE,
  ETU_ROLE,
  INVITE_ROLE,
} = process.env;

if (
  !GUILD_DPLACE_C_ID ||
  !GUILD_SUPPORT_C_ID ||
  !GUILD_LOGS_C_ID ||
  !ADMIN_ROLE ||
  !TEACHER_TEMP_ROLE ||
  !TUTOR_TEMP_ROLE ||
  !ETU_TEMP_ROLE ||
  !INVITE_TEMP_ROLE ||
  !TEACHER_ROLE ||
  !TUTOR_ROLE ||
  !ETU_ROLE ||
  !INVITE_ROLE
) {
  throw new Error("Missing environment variables");
}

const TEMP_ROLES_ID = [
  TEACHER_TEMP_ROLE,
  TUTOR_TEMP_ROLE,
  ETU_TEMP_ROLE,
  INVITE_TEMP_ROLE,
];

const TEMP_ROLES_ID_WITH_PERM = [
  TEACHER_TEMP_ROLE,
  TUTOR_TEMP_ROLE,
  INVITE_TEMP_ROLE,
];

const ROLE_DEF = [TEACHER_ROLE, TUTOR_ROLE, ETU_ROLE, INVITE_ROLE];

export {
  GUILD_DPLACE_C_ID,
  GUILD_SUPPORT_C_ID,
  GUILD_LOGS_C_ID,
  ADMIN_ROLE,
  TEACHER_TEMP_ROLE,
  TUTOR_TEMP_ROLE,
  ETU_TEMP_ROLE,
  INVITE_TEMP_ROLE,
  TEACHER_ROLE,
  TUTOR_ROLE,
  ETU_ROLE,
  INVITE_ROLE,
  TEMP_ROLES_ID,
  TEMP_ROLES_ID_WITH_PERM,
  ROLE_DEF,
};
