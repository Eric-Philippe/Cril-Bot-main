import { Inscription } from "../models/Inscription";

const textToArray = (text: string) => {
  let results = [];
  // Remove all the text until the first "Validation"
  text = text.split("Validation ")[1];
  let items = text.split("\t");

  let lastType, lastActi, lastTime, lastLang, lastNiveau;

  for (let i = 0; i < items.length; i += 11) {
    if (items[i] === "" || items[i] == " ") items[i] = lastType;
    else lastType = items[i];

    if (items[i + 1] === "") items[i + 1] = lastActi;
    else lastActi = items[i + 1];

    if (items[i + 2] === "") items[i + 2] = lastTime;
    else lastTime = items[i + 2];

    if (items[i + 3] === "") items[i + 3] = lastLang;
    else lastLang = items[i + 3];

    if (items[i + 4] === "") items[i + 4] = lastNiveau;
    else lastNiveau = items[i + 4];

    results.push(
      createInscription(
        items[i],
        items[i + 1],
        items[i + 2],
        items[i + 3],
        items[i + 4],
        items[i + 5],
        items[i + 6],
        items[i + 7],
        items[i + 8],
        items[i + 9],
        items[i + 10]
      )
    );
  }

  return results;
};

const HHMMToDate = (str: string): Date => {
  let newDate = new Date();
  let splittedStr = str.split(":");
  newDate.setHours(parseInt(splittedStr[0]));
  newDate.setMinutes(parseInt(splittedStr[1]));

  return newDate;
};

const createInscription = (
  type: string,
  activity_name: string,
  time: string,
  language: string,
  niveau: string,
  lastname: string,
  firstname: string,
  group: string,
  observations: string,
  english_level: string,
  spanish_level: string
): Inscription => {
  return {
    type: type,
    activity_name: activity_name,
    time: HHMMToDate(time),
    language: language,
    niveau: niveau,
    student_firstname: firstname,
    student_lastname: lastname,
    group: group,
    observations: observations,
    english_level: english_level,
    spanish_level: spanish_level,
  };
};

export { textToArray };
