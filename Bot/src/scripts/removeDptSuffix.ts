import { Client } from "discord.js";

import { BOT_GUILD_ID } from "../config/config.bot";

const textBase = [
  "INFO",
  "INFORMATIQUE",
  "[INFO]",
  "GEII",
  "GEAR",
  "GEAP",
  "GCGP",
  "GMP",
  "TECH DE CO",
  "TC",
  "INFOCOM",
  "IUT INFORMATIQUE",
  "GCCD",
  "CASTRES CHIMIE",
  "MP",
  "MEPH",
];

const removeDptSuffix = async (client: Client) => {
  const guild = client.guilds.cache.get(BOT_GUILD_ID);
  if (!guild) throw new Error("Guild not found");

  const members = await guild.members.fetch();
  if (!members) throw new Error("Members not found");

  let count = 0;
  for (const member of members.values()) {
    const nickname = member.nickname;
    if (!nickname) continue;

    const nicknameArray = nickname.split(" ");
    const lastWord = nicknameArray[nicknameArray.length - 1];

    if (textBase.includes(lastWord.toUpperCase())) {
      nicknameArray.pop();
      const newNickname = nicknameArray.join(" ");
      await member.setNickname(newNickname.trim());
      count++;
    }
  }

  console.log(`%c ${count} nicknames updated`, "color: #00ff00");
};

export default removeDptSuffix;
