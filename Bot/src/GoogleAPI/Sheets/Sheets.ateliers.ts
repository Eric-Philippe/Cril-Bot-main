import Sheets from "../auth/SheetsAuth";
import SheetsService from "./Sheets.service";

export default class SheetsAteliers {
  public static async writeAtelierHeader(fileId: string) {
    const writeHeaderRequest = {
      spreadsheetId: fileId,
      valueInputOption: "USER_ENTERED",
      range: "Ateliers!A1:K1",
      requestBody: {
        values: [
          [
            "   Heure   ",
            "   Lieu   ",
            "   Langue   ",
            "   Niveau   ",
            "   Nom   ",
            "   Prénom   ",
            "   Présence   ",
            "   Niv. Cons. Anglais   ",
            "   Niv. Cons. Espagnol   ",
            "   Observations   ",
            "   Groupe  ",
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

  public static async createAtelierSheet(fileId: string) {
    if (SheetsService.hasTwoSheets(fileId)) {
      SheetsService.createSheet(fileId, "Ateliers");
    } else {
      SheetsService.renameSheet(fileId, 1, "Ateliers");
    }
  }
}
