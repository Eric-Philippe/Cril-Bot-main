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
  }

  public static async renameFirstSheet(fileId: string) {
    SheetsService.renameSheet(fileId, 0, "Coachings");
  }
}
