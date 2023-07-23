import { AppDataSource } from "../../data-source";
import { CurrentSpreadsheets } from "../../entities/CurrentSpreadsheets";
import { listFiles } from "./File.service";

const setMostRecentSheetId = async () => {
  let files = await listFiles();
  let latestFile = files[0];

  let repo = AppDataSource.getRepository(CurrentSpreadsheets);
  await repo.delete({});
  let entity = new CurrentSpreadsheets();
  entity.id = latestFile.id;
  entity.entryDate = new Date();

  await repo.save(entity);
};

/**
 * Returns the latest spreadsheet file id
 * @returns {Promise<string | null>} The latest spreadsheet file id or null if there is no file
 */
const getMostRecentSheetId = async (): Promise<string | null> => {
  let repo = AppDataSource.getRepository(CurrentSpreadsheets);
  let currentFiles = await repo.find();
  let currentFile = currentFiles[0];

  if (currentFile) {
    return currentFile.id;
  }

  return null;
};

export { setMostRecentSheetId, getMostRecentSheetId };
