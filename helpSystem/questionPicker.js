const { QUESTION } = require("./question.json"); // Database of question
const RESPONSE_LENGTH = 3; // The number of responses provided for a single input

/**
 *  Measure the difference between two sequences.
 *  return the minimum number of single-character edits required to change one word into the other.
 *
 * @param {String} str1
 * @param {String} str2
 *
 * @return Number
 */
const levenshteinDistance = async function (str1 = "", str2 = "") {
  // Algorithm based on the Wikipedia page
  const track = Array(str2.length + 1) // Matrice
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

/**
 *  Measure the difference between two sequences.
 *  No matter where the word is in the sentence
 *  return the amount of differences inside the two sequences.
 *
 *
 * @param {String} str1
 * @param {String} str2
 *
 * @return Number
 */
const valueWordsFunc = async function (S1, S2) {
  S1 = S1.toLowerCase(); // Question
  S2 = S2.toLowerCase(); // User Input
  let wordsS1 = S1.split(" "); // Array of Question Word
  let wordsS2 = S2.split(" "); // Array of User Input

  let thisD, wordbest;
  let wordsTotal = 0;

  for (let l = 0; l < wordsS1.length; l++) {
    wordbest = S2.length;
    for (let k = 0; k < wordsS2.length; k++) {
      thisD = await levenshteinDistance(wordsS1[l], wordsS2[k]);
      if (thisD < wordbest) wordbest = thisD;
      if (thisD === 0) {
        break;
      }
    }
    wordsTotal = wordsTotal + wordbest;
  }

  return wordsTotal;
};

/**
 * Use the following metric (levenshetinDistance & wordsTotal)
 *  to pick the closest string for a user input
 *
 * @param {String} str1
 *
 * @returns {Array<Array<String, Number, String>>}
 */
const questionPicker = async function (str1) {
  let valuePhrase, valueWords; // Two coeff' to determine the closest question of the input
  let answer_response = []; // Array of answer
  let closest_question = ["", 1000, ""]; // Default closest question = as null

  for (let field in QUESTION) {
    // Loop on category
    let questions = QUESTION[field];
    closest_question = ["", 1000, ""];
    for (let j = 0; j < questions.length; j++) {
      // Loop on question of the category
      valuePhrase = await levenshteinDistance(questions[j], str1); // Number of edit needed
      valuePhrase =
        Math.round(
          (valuePhrase - 0.8 * Math.abs(questions[j].length - str1.length)) * 10
        ) / 10; // Get an usable value
      valueWords = await valueWordsFunc(questions[j], str1); // Value of words place

      let final =
        Math.min(valuePhrase, valueWords) * 0.8 +
        Math.max(valuePhrase, valueWords) * 0.2; // Final = 80%(farValue) + 20%(closestValue)

      if (closest_question[1] > final)
        // Pick the closest question of the category
        closest_question = [questions[j], final, field];
    }

    answer_response.push(closest_question); // Add the closest question to the array
  }

  answer_reponse = await answer_response.sort((a, b) => {
    return a[1] - b[1];
  }); // Sort by the most little coeff'

  answer_response = await answer_response.slice(0, RESPONSE_LENGTH); // Keep only the 3 first values

  return answer_response;
};

exports.questionPicker = questionPicker; // Export the question Picker func
