import SheetsAteliers from "./Sheets.ateliers";
import SheetsCoaching from "./Sheets.coachings";
import SheetsService from "./Sheets.service";

const initSheet = async (fileId: string) => {
  await SheetsCoaching.renameFirstSheet(fileId);
  await SheetsAteliers.createAtelierSheet(fileId);
  await SheetsCoaching.writeCoachingHeader(fileId);
  await SheetsAteliers.writeAtelierHeader(fileId);
  let secondSheetId = await SheetsService.getSecondSheetId(fileId);
  await SheetsService.styleHeaders(fileId, 0, "Coachings");
  await SheetsService.styleHeaders(fileId, secondSheetId, "Ateliers");
};

export default initSheet;
