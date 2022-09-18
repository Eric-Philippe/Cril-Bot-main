const {
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  Message,
  EmbedBuilder,
  ButtonStyle,
  TextChannel,
} = require("discord.js");
/**
 * Processing the toss request
 * @param {ButtonInteraction} interaction
 */
const tossButtonInteraction = async (interaction) => {
  let indexPicked = interaction.customId;
  let usersVote = interaction.message.votedUsers;
  if (!usersVote) return;

  let indexIncluded = isIncluded(usersVote, interaction.user.id);
  // If the user hasn't voted yet
  if (indexIncluded == -1) {
    // Push the user in the array of the index picked
    usersVote[indexPicked].push(interaction.user.id);
    interaction.reply({
      content: `Vous venez bien de voter sur la réponse ${indexPicked + 1} !`,
      ephemeral: true,
    });
    // If the user already voted
  } else {
    usersVote[indexIncluded].splice(
      usersVote[indexIncluded].indexOf(interaction.user.id),
      1
    );
    // We remove the in any case from his previous vote
    // If he voted the same answer
    if (indexIncluded == indexPicked) {
      interaction.reply({
        content: `Vous venez de retirer votre vote sur la réponse ${
          indexPicked + 1
        } !`,
        ephemeral: true,
      });
      // If he voted another answer after his previous one
    } else {
      usersVote[indexPicked].push(interaction.user.id);
      interaction.reply({
        content: `Vous venez bien de modifier votre vote sur la réponse ${
          indexPicked + 1
        } !`,
        ephemeral: true,
      });
    }
  }

  interaction.message.votedUsers = usersVote;
};
/**
 * Launch the toss processs
 * @param {Number} time
 * @param {TextChannel} channel
 * @param {Message} message
 * @param {Number} validIndex
 */
const startToss = async (time, channel, message, validIndex) => {
  setTimeout(() => {
    let embed = new EmbedBuilder()
      .setTitle("Gagnant du tirage au sort")
      .setColor("#FF0000");
    let usersVote = message.votedUsers;
    let goodUsers = usersVote[validIndex - 1];
    let randomUser = goodUsers[Math.floor(Math.random() * goodUsers.length)];
    if (randomUser) {
      embed.setDescription(
        "Le gagnant est : <@" +
          randomUser +
          ">" +
          "\nLa bonne réponse était la : " +
          validIndex
      );
    } else {
      embed.setDescription(
        "Aucun gagnant n'a été trouvé ! La bonne réponse était la : " +
          validIndex
      );
    }
    // Put in disabled all the buttons of the message
    let newRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("null")
        .setLabel("Tirage au sort Terminé !")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true)
    );

    message.edit({ components: [newRow] });

    channel.send({ embeds: [embed] });
  }, 1000 * 60 * 60 * time);
};
/**
 * Return the index of the value if is included in a given array of array
 * @param {Array.<Array>} array
 * @param {String} value
 * @returns
 */
const isIncluded = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == value) return i;
    }
  }
  return -1;
};

exports.tossButtonInteraction = tossButtonInteraction;
exports.startToss = startToss;
