import InscriptionManager from "../../middlewares/Attendance/InscriptionManager";
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

  await fillSheet(fileId);

  await SheetsService.autoResize(fileId, 0);
  await SheetsService.autoResize(fileId, secondSheetId);
};

const fillSheet = async (fileId: string) => {
  let ateliers = await InscriptionManager.getInscriptionsAtelier();
  for (let i = 0; i < ateliers.length; i++) {
    await SheetsAteliers.addRow(ateliers[i], fileId, i + 2);
  }

  let coachings = await InscriptionManager.getInscriptionsCoaching();
  for (let i = 0; i < coachings.length; i++) {
    await SheetsCoaching.addRow(coachings[i], fileId, i + 2);
  }
};

export { initSheet, fillSheet };
