const Discord = require("discord.js");

const { RulesEmbed } = require("../entry/entryTemplate");
const Find_Activity = require("./find_activity/find_activity");
const DiscordVoiceSupport = require("./discord_voice/main");

const { IUT } = require("../ressources.json");
module.exports = class manualLauncherHelp {
  static async packEmbed(msg) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Lien vers les fiches de début de parcours.")
      .setColor("GREEN")

      .addField(
        "🇬🇧 | Anglais : ",
        `[**Pack R2D2**](${IUT.PACK_ANG_R2D2}) \n {MP 1A, GCGP 1A, INFO 1A, GEAR 1A, \n GEAP 1A, TECH DE CO 1A} \n \n [**Pack Chewbacca**](${IUT.PACK_ANG_CHEW}) \n {MP 2A, GEAR 2A, GEAP 2A, GC 2A} \n \n [**Pack Skywalker**](${IUT.PACK_ANG_SKYW}) \n {INFOCOM 1A, GMP 1A, GEII 1A, GC 1A}`,
        true
      )
      .addField(
        "🇪🇸 | Espagnol : ",
        `[**Pack Skywalker**](${IUT.PACK_ESP_SKYW}) \n {TECH DE CO 1A} \n \n [**Pack R2D2**](${IUT.PACK_ESP_R2D2}) \n {INFOCOM 1A}`,
        true
      )
      .setFooter("Cliquez ensuite sur Ajouter une fiche !");

    return await msg.channel.send({ embeds: [embed] });
  }

  /**
   * Launch the FindActivity class in Manual Mode
   *
   * @param {Discord.Message} msg
   * @param {Boolean} something
   * @param {Discord.User} user
   */
  static findChannel(msg, something, user) {
    new Find_Activity(msg, something, user);
  }

  /**
   * Launch the Discord Assistance class in Manual Mode
   *
   * @param {Discord.Message} msg
   * @param {Boolean} something
   * @param {Discord.User} user
   */
  static discord_assistance(msg, something, user) {
    new DiscordVoiceSupport(msg, something, user);
  }

  /**
   * Send the Rules Embed
   *
   * @param {Discord.Message} msg

   */
  static async rules_embed(msg) {
    let embed = await RulesEmbed(msg.member);
    await msg.channel.send({ embeds: [embed] });
  }
};
