require("dotenv").config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
  throw new Error("Missing environment variables");
}

const DB_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@bot-db-cril:5432/${POSTGRES_DB}`;

export { DB_URL, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB };
