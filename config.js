const dotenv = require("dotenv").config();

module.exports = {
  TOKEN: process.env.TOKEN,
  TOKEN_TENOR: process.env.TOKEN_TENOR,

  clientID: process.env.CLIENT_ID,
  supportChannel: process.env.SUPPORT_CHANNEL,
  tipsChannel: process.env.TIPS_CHANNEL,

  guildID: process.env.GUILD_ID,

  etuRole: process.env.ETU_ROLE,
  supportRole: process.env.SUPPORT_ROLE,
  adminRole: process.env.ADMIN_ROLE,

  themedRoles: [
    [process.env.ANIME_ROLE, "⚔️"],
    [process.env.MOVIE_ROLE, "🎥"],
    [process.env.BOOK_ROLE, "📚"],
    [process.env.SPORT_ROLE, "🏅"],
    [process.env.GAME_ROLE, "🎮"],
  ],
};
