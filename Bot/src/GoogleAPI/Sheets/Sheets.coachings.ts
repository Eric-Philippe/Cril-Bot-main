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

  public static async createRowData(inscription, index) {
    return [
      dateToHHMM(inscription.slot),
      inscription.lieu,
      inscription.langue,
      inscription.lastname,
      inscription.firstname,
      "", // Leave it empty for now
      inscription.observations,
      inscription.groupe,
      inscription.comment_coaching,
    ];
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
