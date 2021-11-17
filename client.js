const { Client, Intents } = require("discord.js");

export const client = new Client({
    restTimeOffset: 0,
    allowedMentions: { parse: ["users", "roles"], repliedUser: false },
    partials: [ 'MESSAGE', "CHANNEL", "REACTION"],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_PRESENCES,
    ],
    presence: {
        activities: {
            name: "Watching U",
            type: "WATCHING",
            url: "https://discord.gg/ZkmEg79B7U"
        },
        status: "dnd"
    }
  });