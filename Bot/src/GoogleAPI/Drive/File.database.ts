import { AppDataSource } from "../../data-source";
import { CurrentSpreadsheets } from "../../entities/CurrentSpreadsheets";
import { areDatesEqual } from "../../utils/Date";

export const setMostRecentSheetId = async (fileId: string) => {
  let repo = AppDataSource.getRepository(CurrentSpreadsheets);
  await repo.delete({});
  let entity = new CurrentSpreadsheets();
  entity.id = fileId;
  entity.entryDate = new Date();

  await repo.save(entity);
};

/**
 * Returns the latest spreadsheet file id
 * @returns {Promise<string | null>} The latest spreadsheet file id or null if there is no file
 */
export const getMostRecentSheetId = async (): Promise<string | null> => {
  let repo = AppDataSource.getRepository(CurrentSpreadsheets);
  let currentFiles = await repo.find();
  let currentFile = currentFiles[0];

  if (currentFile) {
    return currentFile.id;
  }

  return null;
};

export const isMostRecentSheetSetup = async (): Promise<string | null> => {
  let repo = AppDataSource.getRepository(CurrentSpreadsheets);
  let currentFiles = await repo.find();

  if (
    currentFiles.length > 0 &&
    areDatesEqual(currentFiles[0].entryDate, new Date())
  ) {
    return currentFiles[0].id;
  }
};
