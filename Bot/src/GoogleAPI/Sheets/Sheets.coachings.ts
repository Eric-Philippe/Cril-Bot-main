import { InscriptionsCoaching } from "../../entities/InscriptionsCoaching";
import { dateToHHMM } from "../../utils/Date";
import Sheets from "../auth/SheetsAuth";
import SheetsService from "./Sheets.service";

export default class SheetsCoaching {
  public static async writeCoachingHeader(fileId: string) {
    const writeHeaderRequest = {
      spreadsheetId: fileId,
      valueInputOption: "USER_ENTERED",
      range: "Coachings!A1:I1",
      requestBody: {
        values: [
          [
            "   Heure   ",
            "   Lieu   ",
            "   Langue   ",
            "   Nom   ",
            "   Prénom   ",
            "   Présence   ",
            "   Observations   ",
            "   Groupe   ",
            "   Commentaire Coaching   ",
          ],
        ],
      },
    };

    try {
      await Sheets.spreadsheets.values.update(writeHeaderRequest);
    } catch (err) {
      console.log(err);
    }

    return;
  }

  public static async addRow(
    inscription: InscriptionsCoaching,
    fileId: string,
    index: number
  ) {
    const presence_choice = ["Présent", "Absent Justifié", "Absent Injustifié"];
    const coaching_comment = [
      "Deb à faire",
      "Deb comm",
      "Fiche 1 comm",
      "Fiche 2 comm",
      "Fiche 3 comm",
      "Fiche 4 comm",
      "Fiche 5 comm",
      "Fiche 6 comm",
      "Fiche 7 comm",
    ];

    const writeRowRequest = {
      spreadsheetId: fileId,
      valueInputOption: "USER_ENTERED",
      range: `Coachings!A${index}:I${index}`,
      requestBody: {
        values: [
          [
            dateToHHMM(inscription.slot),
            inscription.lieu,
            inscription.langue,
            inscription.lastname,
            inscription.firstname,
            "", // Leave it empty for now
            inscription.observations,
            inscription.groupe,
            inscription.comment_coaching,
          ],
        ],
      },
    };

    try {
      await Sheets.spreadsheets.values.append(writeRowRequest);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getData(fileId: string, sheetId: string) {
    const getTableRequest = {
      spreadsheetId: fileId,
      range: `Coachings!A2:I`,
    };

    try {
      const table = await Sheets.spreadsheets.values.get(getTableRequest);
      return table.data.values;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  public static async renameFirstSheet(fileId: string) {
    await SheetsService.renameSheet(fileId, 0, "Coachings");

    return;
  }
}
