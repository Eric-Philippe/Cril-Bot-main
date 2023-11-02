import Logger from "../../logger/Logger";
import { LogsLevels } from "../../logger/Logs.levels";
import { LogsCoachingITypes } from "../../logger/LogsCoachingI.types";
import { YYYY_MONTH, getCurrentSchoolYear } from "../../utils/Date";
import Drive from "../auth/DriveAuth";

const getFolderIdByName = async (folderName: string, userId?: string) => {
  let folderId = null;

  let logMsg;

  try {
    const response = await Drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'", // Filtre pour les dossiers accessibles
      fields: "files(id, name, createdTime)",
    });

    const files = response.data.files;

    // Filter and keep the most recent folder if there are duplicates
    if (files && files.length) {
      const filteredFiles = files.reduce((acc, file) => {
        if (file.name.includes(folderName)) {
          if (
            !acc[file.name] ||
            file.createdTime > acc[file.name].createdTime
          ) {
            acc[file.name] = file;
          }
        }
        return acc;
      }, {});

      folderId = Object.values(filteredFiles)[0]?.id;
    }

    logMsg = LogsLevels.SUCCESS;
  } catch (err) {
    logMsg = LogsLevels.ERROR + err.message;
  } finally {
    userId = userId ? userId : LogsLevels.SYSTEM;
    Logger.logCoachingI(userId, LogsCoachingITypes.FETCHING_FOLDER, logMsg);
    return folderId;
  }
};

const getYearMonthFolderId = async (): Promise<string | null> => {
  let folderName = YYYY_MONTH();

  let id = await getFolderIdByName(folderName);

  if (!id) return;

  return id;
};

/** Create  */
const createScolarYearFolders = async () => {
  let folderName = getCurrentSchoolYear();

  let id = await getFolderIdByName(folderName);

  if (!id) return;

  for (let i = 9; i <= 12; i++) {
    await createMonthFolder(id, i, parseInt(folderName.split("/")[0]));
  }

  for (let i = 1; i <= 7; i++) {
    await createMonthFolder(id, i, parseInt(folderName.split("/")[1]));
  }
};

const createMonthFolder = async (
  parentFolderId: string,
  month: number,
  year: number,
  userId?: string
) => {
  let folderName = YYYY_MONTH(year, month);
  let id = getFolderIdByName(folderName);

  userId = userId ? userId : LogsLevels.SYSTEM;
  if (!id)
    return Logger.logCoachingI(
      userId,
      LogsCoachingITypes.CREATING_DATES_FOLDER,
      LogsLevels.ERROR + " " + "Parent folder not found"
    );

  let logMsg;

  try {
    await Drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
    });
    logMsg = LogsLevels.SUCCESS;
  } catch (err) {
    logMsg = LogsLevels.ERROR + " " + err.message;
  } finally {
    Logger.logCoachingI(
      userId,
      LogsCoachingITypes.CREATING_DATES_FOLDER,
      logMsg
    );
  }
};

export { getFolderIdByName, createScolarYearFolders, getYearMonthFolderId };
