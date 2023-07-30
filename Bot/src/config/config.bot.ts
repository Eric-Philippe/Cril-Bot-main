require("dotenv").config();

const { BOT_TOKEN, BOT_ID, CODE_TEACHER, CODE_INVITE, CODE_TUTOR } =
  process.env;

if (!BOT_TOKEN || !BOT_ID || !CODE_TEACHER || !CODE_INVITE || !CODE_TUTOR) {
  throw new Error("Missing environment variables");
}

export { BOT_TOKEN, BOT_ID, CODE_TEACHER, CODE_INVITE, CODE_TUTOR };
