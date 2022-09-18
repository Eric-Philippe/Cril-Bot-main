const { ButtonInteraction } = require("discord.js");

/**
 * Processing the poll request
 * @param {ButtonInteraction} i
 */
const pollRequest = (i) => {
  let parentEmbed = i.message.embeds[0];
  // Poll Embed are added with a answers plug in in the object
  if (!i.message.answers) return;
  // If the user already clicked on tge target button
  let index = alreadyClicked(i.user.id, i.message.answers);
  if (index == -1) {
    // Add the user id to the array
    index = i.customId - 1;
    i.message.answers[index].push(i.user.id);
  } else {
    // Remove the user id from the array
    i.message.answers[index].splice(
      i.message.answers[index].indexOf(i.user.id),
      1
    );
    // If it's not the same button clicked, remove the past one and add to the new one
    if (i.customId != index + 1) {
      i.message.answers[i.customId - 1].push(i.user.id);
    }
  }
  let totalAnswer = sumArray(i.message.answers);
  let percentage = arrayToPercentage(totalAnswer, i.message.answers);

  // Loop arround the different answers
  for (let y = 0; y < parentEmbed.fields.length; y++) {
    // Generate the emoji display for each answers vote amount (square with black and white)
    parentEmbed.fields[y] = {
      name: parentEmbed.fields[y].name,
      value:
        "``" +
        generatoSquaro(percentage[y]) +
        "`` | " +
        percentage[y] +
        "% (" +
        i.message.answers[y].length +
        ")",
    };
  }
  // Update dynamically the embed
  i.message.edit({ embeds: [parentEmbed] });
};

/**
 * Sum all the array
 * @param {Array.<Array.<String>>} arr
 */
const sumArray = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i].length;
  }
  return total;
};
/**
 * Transform an array of number into an array of percentage
 * @param {Number} total
 * @param {Array} arr
 */
const arrayToPercentage = (total, arr) => {
  let finalArray = [];
  for (let i = 0; i < arr.length; i++) {
    let result = Math.round(((arr[i].length * 100) / total) * 100) / 100;
    if (isNaN(result)) result = 0;
    finalArray.push(result);
  }

  return finalArray;
};
/**
 * Generate a string composed with black and white square
 * @example percentage = 22,72 => '⬜⬜⬛⬛⬛⬛⬛⬛⬛⬛'
 * @param {Number} percentage
 */
const generatoSquaro = (percentage) => {
  let square = "";
  let whiteSquareNumber = Math.round(percentage / 10);
  for (let i = 0; i < whiteSquareNumber; i++) {
    square += "⬜";
  }
  let blackSquareNumber = 10 - whiteSquareNumber;
  for (let i = 0; i < blackSquareNumber; i++) {
    square += "⬛";
  }
  return square;
};

/**
 * Check if the user already clicked on a button
 * @param {String} userId
 * @param {Array.<Array.<String>>} arr
 */
const alreadyClicked = (userId, arr) => {
  let balise = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(userId)) {
      balise = i;
    }
  }
  return balise;
};

exports.pollRequest = pollRequest;
