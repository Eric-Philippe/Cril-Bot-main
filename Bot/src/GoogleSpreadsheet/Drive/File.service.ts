import { LogsCoachingITypes } from "../../logger/LogsCoachingI.types";
import { LogsLevels } from "../../logger/Logs.levels";
import Logger from "../../logger/Logger";
import Drive from "../auth/DriveAuth";
import File from "./File";

const listFiles = async (userId?: string) => {
  let listFiles: File[] = [];

  let logMsg;

  try {
    const response = await Drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'", // Filtre pour les spreadsheets uniquement
      fields: "files(id, name, createdTime)",
    });

    const files = response.data.files;
    if (files && files.length) {
      files.forEach((file: any) => {
        listFiles.push({
          id: file.id,
          name: file.name,
          mimeType: "application/vnd.google-apps.spreadsheet",
          createdTime: new Date(file.createdTime),
        });
      });
    }

    logMsg = LogsLevels.SUCCESS;
  } catch (err) {
    logMsg = LogsLevels.ERROR + err.message;
  } finally {
    listFiles = sortByDate(listFiles);

    userId = userId ? userId : LogsLevels.SYSTEM;
    Logger.logCoachingI(userId, LogsCoachingITypes.FETCHING_FILES, logMsg);
    return listFiles;
  }
};

const sortByDate = (files: File[]) => {
  return files.sort((a, b) => {
    return b.createdTime.getTime() - a.createdTime.getTime();
  });
};

export { listFiles };
