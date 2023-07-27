require("dotenv").config();

const { GUILD_DPLACE_C_ID } = process.env;

if (!GUILD_DPLACE_C_ID) {
  throw new Error("Missing environment variables");
}

export { GUILD_DPLACE_C_ID };
