import dotenv from "dotenv";

dotenv.config();

const { BOT_TOKEN, BOT_ID } = process.env;

if (!BOT_TOKEN || !BOT_ID) {
  throw new Error("Missing environment variables");
}

export { BOT_TOKEN, BOT_ID };
