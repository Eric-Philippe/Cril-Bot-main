import { LogsCoachingITypes } from "../../logger/LogsCoachingI.types";
import { LogsLevels } from "../../logger/Logs.levels";
import Logger from "../../logger/Logger";
import Drive from "../auth/DriveAuth";
import File from "./File";
import { getYearMonthFolderId } from "./Folder.service";
import { EMAIL } from "../../config/config.google";
import { Timer } from "../../utils/Timer";

const createTodaySheet = async (): Promise<string> => {
  let parentId = await getYearMonthFolderId();

  if (!parentId) return;

  // DD/MM/YYYY
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  let strMonth = month < 10 ? `0${month}` : `${month}`;

  let fileName = `${day}/${strMonth}/${year}`;

  try {
    const response = await Drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: [parentId],
      },
      fields: "id",
    });

    const fileId = response.data.id;

    // Donner accès à l'utilisateur spécifié par e-mail
    await Drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "writer", // Rôle de l'utilisateur (writer signifie qu'il peut modifier le fichier)
        type: "user",
        emailAddress: EMAIL, // E-mail de l'utilisateur à qui donner accès au fichier
      },
    });

    // Déplacer le fichier vers le dossier spécifié
    await Drive.files.update({
      fileId: fileId,
      addParents: parentId,
      removeParents: "root",
    });

    const file = response.data;
    if (file) {
      Logger.logCoachingI(
        LogsLevels.SYSTEM,
        LogsCoachingITypes.CREATING_FILE,
        LogsLevels.SUCCESS
      );

      return file.id;
    }
  } catch (err) {
    Logger.logCoachingI(
      LogsLevels.SYSTEM,
      LogsCoachingITypes.CREATING_FILE,
      LogsLevels.ERROR + " " + err.message
    );

    return null;
  }
};

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
    //Logger.logCoachingI(userId, LogsCoachingITypes.FETCHING_FILES, logMsg);
    return listFiles;
  }
};

const sortByDate = (files: File[]) => {
  return files.sort((a, b) => {
    return b.createdTime.getTime() - a.createdTime.getTime();
  });
};

export const getDriveMetrics = async () => {
  const timer = new Timer();
  timer.start();
  try {
    await listFiles();
    await timer.stop();
    return timer.toMsInt();
  } catch (error) {
    return -1;
  }
};

export { listFiles, createTodaySheet };
