import Operation from "../../models/Operation";
import { HEADERS_RESACRIL } from "../../res/ContexteRessources";
import { HHMMToDate } from "../../utils/Date";
import { isEmpty } from "../../utils/String";
import { Inscription } from "./models/Inscription";

class TextToInscriptions {
  public results: Inscription[] = [];
  private text: string;
  private givenSize: number = 0;
  private lastType: string;
  private lastActivity: string;
  private lastSlot: string;
  private lastLanguage: string;
  private lastLevel: string;
  private code: number = 0;

  private constructor(text: string) {
    this.text = text;
  }

  public static fromText(text: string): Operation<Inscription[]> {
    let converter = new TextToInscriptions(text);
    return converter.convert();
  }

  /**
   *
   * @param text
   * @returns 1 if the size of the headers is not the same as the one in the file
   */
  private convert(): Operation<Inscription[]> {
    this.text = this.text.replace(/\r/g, "");
    this.text = this.text.replace(/\n/g, "");
    let cells = this.text.split("\t");
    this.getHeadersSize(cells);
    let headersResacrilSize = HEADERS_RESACRIL.length;
    if (this.givenSize + 1 !== headersResacrilSize)
      return { result: [], returnCode: 1 };
    cells = this.removeHeaders(cells);

    this.fillInscription(cells);
    return { result: this.results, returnCode: 0 };
  }

  private fillInscription(cells: string[]) {
    for (let i = 0; i < cells.length; i += this.givenSize) {
      this.createInscription(
        cells[i],
        cells[i + 1],
        cells[i + 2],
        cells[i + 3],
        cells[i + 4],
        cells[i + 5],
        cells[i + 6],
        cells[i + 7],
        cells[i + 8],
        cells[i + 9],
        cells[i + 10],
        cells[i + 11]
      );
    }
  }

  private createInscription(
    type: string,
    activty: string,
    slot: string,
    langue: string,
    niveau: string,
    lastname: string,
    firstname: string,
    group: string,
    observations: string,
    eng: string,
    esp: string,
    validation: string
  ) {
    type = isEmpty(type) ? this.lastType : type;
    activty = isEmpty(activty) ? this.lastActivity : activty;
    slot = isEmpty(slot) ? this.lastSlot : slot;
    langue = isEmpty(langue) ? this.lastLanguage : langue;
    niveau = isEmpty(niveau) ? this.lastLevel : niveau;
    lastname = isEmpty(lastname) ? "ERROR" : lastname;
    firstname = isEmpty(firstname) ? "ERROR" : firstname;

    this.results.push({
      type: type,
      activity_name: activty,
      time: HHMMToDate(slot),
      language: langue,
      niveau: niveau,
      student_lastname: lastname,
      student_firstname: firstname,
      group: group,
      observations: observations,
      english_level: eng,
      spanish_level: esp,
      validation: validation,
    });

    this.lastType = type;
    this.lastActivity = activty;
    this.lastSlot = slot;
    this.lastLanguage = langue;
    this.lastLevel = niveau;
  }

  private getHeadersSize(cells: string[]) {
    const i = cells.findIndex(
      (cell, index) =>
        cell !== HEADERS_RESACRIL[index] || index >= HEADERS_RESACRIL.length
    );
    this.givenSize = i !== -1 ? i : cells.length;
  }

  private removeHeaders(cells: string[]) {
    cells = cells.slice(this.givenSize);
    if (cells[0].includes("Atelier")) cells[0] = "Atelier";
    else if (cells[0].includes("Coaching")) cells[0] = "Coaching";
    return cells;
  }
}

const textToArray = (text: string): Operation<Inscription[]> => {
  return TextToInscriptions.fromText(text);
};

export { textToArray };
