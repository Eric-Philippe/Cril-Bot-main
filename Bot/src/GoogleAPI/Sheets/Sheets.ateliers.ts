import { InscriptionsAtelier } from "../../entities/InscriptionsAtelier";
import { dateToHHMM } from "../../utils/Date";
import Sheets from "../auth/SheetsAuth";
import SheetsService from "./Sheets.service";

export default class SheetsAteliers {
  public static async writeAtelierHeader(fileId: string) {
    const writeHeaderRequest = {
      spreadsheetId: fileId,
      valueInputOption: "USER_ENTERED",
      range: "Ateliers!A1:L1",
      requestBody: {
        values: [
          [
            "   Heure   ",
            "   Lieu   ",
            "   Titre   ",
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

  public static async addRow(
    inscription: InscriptionsAtelier,
    fileId: string,
    index: number
  ) {
    const writeRowRequest = {
      spreadsheetId: fileId,
      valueInputOption: "USER_ENTERED",
      range: `Ateliers!A${index}:L${index}`,
      requestBody: {
        values: [
          [
            dateToHHMM(inscription.slot),
            inscription.lieu,
            inscription.activity,
            inscription.langue,
            inscription.activityLevel,
            inscription.lastname,
            inscription.firstname,
            "",
            inscription.angLevel,
            inscription.espLevel,
            inscription.observations,
            inscription.groupe,
          ],
        ],
      },
    };

    try {
      await Sheets.spreadsheets.values.update(writeRowRequest);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getData(fileId: string, sheetId: string) {
    const getTableRequest = {
      spreadsheetId: fileId,
      range: `Ateliers!A2:L`,
    };

    try {
      const table = await Sheets.spreadsheets.values.get(getTableRequest);
      return table.data.values;
    } catch (err) {
      console.log(err);
      return [];
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
