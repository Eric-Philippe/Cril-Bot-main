require("dotenv").config();

module.exports = {
  // Token exports
  TOKEN: process.env.TOKEN,
  TOKEN_TENOR: process.env.TOKEN_TENOR,
  SHEET_API_URL: process.env.SHEET_API_URL,
  // Client Id Export
  clientID: process.env.CLIENT_ID,
  // Channel ID Export
  supportChannel: process.env.SUPPORT_CHANNEL,
  tipsChannel: process.env.TIPS_CHANNEL,
  themeChannel: process.env.THEME_CHANNEL,
  placeChannel: process.env.PLACE_CHANNEL,
  // Guild ID Export
  guildID: process.env.GUILD_ID,
  // Role ID Export
  etuRole: process.env.ETU_ROLE,
  supportRole: process.env.SUPPORT_ROLE,
  adminRole: process.env.ADMIN_ROLE,
  // Themed Role properties export
  themedRoles: [
    [process.env.ANIME_ROLE, "⚔️"],
    [process.env.MOVIE_ROLE, "🎥"],
    [process.env.BOOK_ROLE, "📚"],
    [process.env.SPORT_ROLE, "🏅"],
    [process.env.GAME_ROLE, "🎮"],
  ],
};
