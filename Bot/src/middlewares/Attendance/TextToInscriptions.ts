import Operation from "../../models/Operation";
import { HHMMToDate } from "../../utils/Date";
import { Inscription } from "./models/Inscription";

const HEADERS_SIZE = 12;

class TextToInscriptions {
  public static adjust(rows: string[][]): Operation<Inscription[]> {
    for (let row of rows) {
      const rowLength = row.length;
      if (rowLength != HEADERS_SIZE) {
        row.push(...new Array(HEADERS_SIZE - rowLength).fill(""));
      }
    }

    let results: Inscription[] = [];

    let _type, _activity, _slot, _language, _level;
    // If we meet those words, we forget the previous values
    const boundariesWords = ["Atelier", "Coaching"];

    for (let row of rows) {
      if (boundariesWords.includes(row[0])) {
        _type = row[0];
        _activity = row[1];
        _slot = row[2];
        _language = row[3];
        _level = row[4];
      }

      if (row[0] == "") {
        row[0] = _type;
        row[1] = _activity;
        row[2] = _slot;
        row[3] = _language;
        row[4] = _level;
      }

      results.push({
        type: row[0],
        activity_name: row[1],
        time: HHMMToDate(row[2]),
        language: row[3],
        niveau: row[4],
        student_lastname: row[5],
        student_firstname: row[6],
        group: row[7],
        observations: row[8],
        english_level: row[9],
        spanish_level: row[10],
        validation: row[11],
      });
    }

    return { result: results, returnCode: 0 };
  }

  public static parseTextFileToRows(text: string): string[][] {
    const textRows = text
      .trim()
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.split("\t"));

    textRows.shift();
    return textRows;
  }

  public static parseTextToRows(text: string): string[][] {
    const rowsText = text.trim().split("\t ");
    let firstWord;
    if (rowsText[0].includes("Atelier")) firstWord = "Atelier";
    else firstWord = "Coaching";

    const firstRowSplitted = rowsText[0].split(` ${firstWord}`);
    rowsText[0] = firstRowSplitted[0];
    // Put the [1] of the split at the second place
    rowsText.splice(1, 0, firstRowSplitted[1]);

    const rowsArray = rowsText.map((row) => row.split("\t"));
    rowsArray[1][0] = firstWord;

    rowsArray.shift();

    return rowsArray;
  }
}

const convertTextToInscription = (
  text: string,
  fromFile: boolean = false
): Operation<Inscription[]> => {
  let rows;
  if (fromFile) rows = TextToInscriptions.parseTextFileToRows(text);
  else rows = TextToInscriptions.parseTextToRows(text);

  const operation = TextToInscriptions.adjust(rows);
  return operation;
};

export { convertTextToInscription };
