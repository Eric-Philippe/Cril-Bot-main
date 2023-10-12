import InscriptionManager from "../../middlewares/Attendance/InscriptionManager";
import Sheets from "../auth/SheetsAuth";
import SheetsAteliers from "./Sheets.ateliers";
import SheetsCoaching from "./Sheets.coachings";
import SheetsService from "./Sheets.service";

export const initSheet = async (fileId: string) => {
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

export const getSheetURL = async (fileId: string) => {
  return `https://docs.google.com/spreadsheets/d/${fileId}`;
};

export const fillSheet = async (fileId: string) => {
  let ateliers = await InscriptionManager.getInscriptionsAtelier();
  let coachings = await InscriptionManager.getInscriptionsCoaching();

  const dataCoaching = [];
  const dataAteliers = [];

  for (let i = 0; i < ateliers.length; i++) {
    dataAteliers.push(await SheetsAteliers.createRowData(ateliers[i], i + 2));
  }

  for (let i = 0; i < coachings.length; i++) {
    dataCoaching.push(await SheetsCoaching.createRowData(coachings[i], i + 2));
  }

  const requestCoaching = {
    spreadsheetId: fileId,
    range: "Coachings!A2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: dataCoaching,
    },
  };

  try {
    await Sheets.spreadsheets.values.append(requestCoaching);
  } catch (err) {
    console.error(err);
  }

  const requestAteliers = {
    spreadsheetId: fileId,
    range: "Ateliers!A2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: dataAteliers,
    },
  };

  try {
    await Sheets.spreadsheets.values.append(requestAteliers);
  } catch (err) {
    console.error(err);
  }
};
