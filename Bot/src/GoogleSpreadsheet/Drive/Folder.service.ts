import axios from "axios";
import Logger from "../../logger/Logger";
import { LogsLevels } from "../../logger/Logs.levels";
import { LogsCoachingITypes } from "../../logger/LogsCoachingI.types";
import Drive from "../auth/DriveAuth";
import auth from "../auth/auth";

const getFolderIdByName = async (folderName: string, userId?: string) => {
  let folderId = null;

  let logMsg;

  try {
    const response = await Drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'", // Filtre pour les folders accessibles
      fields: "files(id, name, createdTime)",
    });

    const files = response.data.files;

    if (files && files.length) {
      files.forEach((file: any) => {
        if (file.name.includes(folderName)) {
          folderId = file.id;
        }
      });
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

const mooveFile = async (
  fileId: string,
  newParentFolderId: string,
  userId?: string
): Promise<void> => {
  const response = await Drive.files.update({
    fileId: "1KtSgNFxDswlme7J_oCz-r0iVT-eJ9yfS_NHogCj_32s",
    addParents: "1W1mZDHD5WgJaoC6nNZQxJ-gxzaa5VZt0",
  });
};

const copyFile = async (fileId: string, folderId: string): Promise<string> => {
  const response = await Drive.files.copy({
    fileId: fileId,
    requestBody: {
      parents: [folderId],
    },
  });

  return response.data.id;
};

const deleteFile = async (fileId: string) => {
  await Drive.files.delete({
    fileId: fileId,
  });
};

export { getFolderIdByName, mooveFile };
