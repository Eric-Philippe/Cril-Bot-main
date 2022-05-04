const Discord = require("discord.js");
const { COLOR, EMOTE } = require("../ressources.json");

module.exports = class Poll {
  /**
   *  Poll Function
   *
   * @param {Discord.Message} msg
   */
  static poll(msg) {
    let args = msg.content.split('"');
    if (!args[1]) return msg.reply("❌ | Merci d'entrer une question !");

    let question = args[1];
    let choice_array = [];
    let max;

    if (!args[3]) {
      //Close Question
      choice_array.push("Yes", "No");
    } else {
      max = args.length;
      if (args.length > 22) max = 22;
      for (let i = 3; i < max; i = i + 2) {
        choice_array.push(args[i]);
      }
    }

    let pollEmbed = new Discord.MessageEmbed()
      .setTitle("📊 " + question)
      .setColor(COLOR.MAIN_COLOR)
      .setFooter(`#️⃣ | Demandé par ${msg.author.tag}`)
      .setAuthor("SONDAGE");

    for (let i = 0; i < choice_array.length; i++) {
      pollEmbed.addField(
        EMOTE.NB_EMOTE[i] + " " + choice_array[i],
        "``" + "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛" + "`` | 0.0% (0)"
      );
    }

    msg.channel.send({ embeds: [pollEmbed] }).then((m) => {
      for (let i = 0; i < choice_array.length; i++) {
        m.react(EMOTE.NB_EMOTE[i]);
      }
    });
  }

  /**
   *  Update the receipt or withdrawal of a reaction on a poll
   *
   * @param {Discord.MessageReaction} reaction
   * @param {Discord.User} user
   * @param {Boolean} isAdded
   */
  static async pollRequest(reaction, user, isAdded) {
    if (!reaction.message.channel) return;
    let msg = await reaction.message.channel.messages.fetch(
      reaction.message.id
    ); // The cached message

    if (!msg) return;
    if (!msg.embeds[0]) return;
    let parent_embed = msg.embeds[0];
    if (!parent_embed.author) return;
    if (parent_embed.author.name != "SONDAGE") return;
    if (!reaction.message.reactions.cache) return;

    if (isAdded) {
      for (let element of reaction.message.reactions.cache) {
        if (element[0] != reaction.emoji.name) {
          reaction.message.reactions.resolve(element[0]).users.remove(user.id);
        }
      }
    }

    let total = 0; // Total of reaction
    let current_state = []; // Current state of the all reactions

    for (let i = 0; i < parent_embed.fields.length; i++) {
      // Loop all around the field of the poll embed
      let count = Array.from(msg.reactions.cache)[i][1].count - 1; // Build Array of object with the OLD field
      current_state.push({
        name: parent_embed.fields[i].name,
        num: count,
        percent: undefined,
        square: 0,
      });

      total = total + count;
    }

    // Update the OLD Object field
    for (let i = 0; i < current_state.length; i++) {
      // Loop all around the Array of OLD Object fields
      current_state[i].percent =
        Math.round(((current_state[i].num * 100) / total) * 100) / 100; // Calcul the new percentage

      current_state[i].square = Math.round(current_state[i].percent / 10); // Calcul the round number of white square needed
    }

    for (let i = 0; i < current_state.length; i++) {
      // Loop all arround the updated Array of Object fields
      let squares = "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"; // Default String for the new update char
      let percent = 0; // Default new percentage

      // Avoid error with calcul with zero
      if (total != 0) {
        squares = "";
        // If not equal to zero => Classic implementation
        let white_square = current_state[i].square;
        for (let t = 0; t < white_square; t++) {
          squares = squares.concat("", "⬜");
        }
        for (let o = 0; o < 10 - white_square; o++) {
          squares = squares.concat("", "⬛");
        }
        percent = current_state[i].percent;
      }

      // Edit of the parent fields
      parent_embed.fields[i] = {
        name: current_state[i].name,
        value:
          "``" +
          squares +
          "``" +
          " | " +
          percent +
          "% (" +
          current_state[i].num +
          ")",
      };
    }

    await msg.edit({ embeds: [parent_embed] }); // Edit
  }
};
