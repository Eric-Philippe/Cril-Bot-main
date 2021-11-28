const Discord = require("discord.js");

const question_mark =
  "https://cdn.discordapp.com/attachments/739553949199106158/914227536785989642/Ouf7Ajd.png";

module.exports = class chatBot {
  /**
   *
   * @param {Discord.Message} msg
   * @param {Array<>} alternative
   */
  static find_moodle(msg, isCmd) {
    let link = "https://moodle.iut-tlse3.fr/login/index.php";

    let embedMoodle = new Discord.MessageEmbed()
      .setTitle("Lien vers moodle")
      .setColor("#f98012")
      .setURL(link)
      .setDescription(link)
      .setImage(
        "https://moodle.iut-tlse3.fr/pluginfile.php/102032/course/overviewfiles/Imagea.png"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/739553949199106158/914221388980711484/moodle-logo-300x225.png"
      )
      .setAuthor(`Demandé par ${msg.author.username}`, msg.author.avatarURL());

    if (isCmd) {
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("Happy")
          .setLabel("Oui")
          .setStyle("SUCCESS")
          .setEmoji("✔️"),

        new Discord.MessageButton()
          .setCustomId("Unhappy")
          .setLabel("Non")
          .setStyle("DANGER")
          .setEmoji("❌")
      );

      embedMoodle.setFooter(`Cela répond-il à votre question ?`, question_mark);

      msg.channel
        .send({ embeds: [embedMoodle], components: [row] })
        .then((m) => {
          chatBot.buttonCollector(msg, m, isCmd);
        });
    } else {
      msg.channel.send({ embeds: [embedMoodle] });
    }
  }

  /**
   *
   * @param {Discord.Message} msg_user
   * @param {Discord.Message} msg_bot
   * @param {Array<>} answer_array
   */
  static buttonCollector(msg_user, msg_bot, answer_array) {
    const filter = (interaction) =>
      interaction.user.id === msg_user.author.id && interaction.isButton();
    const collector = msg_bot.createMessageComponentCollector({
      filter,
      max: 1,
      time: 1000 * 20,
      errors: ["time"],
    });

    collector.on("collect", async (i) => {
      switch (i.customId) {
        case "Happy":
          msg_user.reply("Merci d'avoir répondu !");
          break;
        case "Unhappy":
          msg_user.reply("Je m'occupe de vous. . .");
          break;
      }

      await i.deferUpdate();
    });

    collector.on("end", (collected, reason) => {
      console.log(reason);
    });
  }
};
