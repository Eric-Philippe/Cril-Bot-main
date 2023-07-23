import Sheets from "../auth/SheetsAuth";

export default class SheetsService {
  public static async renameSheet(fileId: string, index: number, name: string) {
    const renameRequest = {
      spreadsheetId: fileId,
      requestBody: {
        requests: [
          {
            updateSheetProperties: {
              properties: {
                sheetId: index, // 0-based index of the sheet to rename (first sheet)
                title: name, // New name for the first sheet
              },
              fields: "title",
            },
          },
        ],
      },
    };

    try {
      await Sheets.spreadsheets.batchUpdate(renameRequest);
    } catch (err) {
      console.log(err);
    }
  }

  public static async getSecondSheetId(fileId: string): Promise<number> {
    const getSheetsRequest = {
      spreadsheetId: fileId,
    };

    try {
      const sheets = await Sheets.spreadsheets.get(getSheetsRequest);
      return sheets.data.sheets[1].properties?.sheetId;
    } catch (err) {
      console.log(err);
      return -1;
    }
  }

  public static async createSheet(fileId: string, name: string) {
    const addSheetRequest = {
      spreadsheetId: fileId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: name, // Name for the second sheet
              },
            },
          },
        ],
      },
    };

    try {
      await Sheets.spreadsheets.batchUpdate(addSheetRequest);
    } catch (err) {
      console.log(err);
    }
  }

  public static async styleHeaders(
    fileId: string,
    sheetId: number,
    sheetName: string
  ) {
    // Bold and center the column headers and auto size columns
    const styleHeaderRequest = {
      spreadsheetId: fileId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                  },
                  horizontalAlignment: "CENTER",
                },
              },
              fields: "userEnteredFormat(textFormat,horizontalAlignment)",
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetId,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 26,
              },
            },
          },
        ],
      },
    };

    try {
      await Sheets.spreadsheets.batchUpdate(styleHeaderRequest);
    } catch (err) {
      console.log(err);
    }
  }
  public static async hasTwoSheets(fileId: string): Promise<boolean> {
    const getSheetsRequest = {
      spreadsheetId: fileId,
    };

    try {
      const sheets = await Sheets.spreadsheets.get(getSheetsRequest);
      return sheets.data.sheets?.length === 2;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
