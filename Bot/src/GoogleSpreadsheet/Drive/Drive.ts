import { google } from "googleapis";
import auth from "../auth";

import File from "./File";
import Logger from "../../logger/Logger";
import { LogsCoachingITypes } from "../../logger/LogsCoachingI.types";
import { LogsLevels } from "../../logger/Logs.levels";
import { CurrentSpreadsheets } from "../../entities/CurrentSpreadsheets";
import { AppDataSource } from "../../data-source";

/**
 * Google Drive API
 * @see https://developers.google.com/drive/api/v3/about-sdk
 * @see https://developers.google.com/drive/api/v3/reference
 *
 * @description
 * This class is used to interact with the Google Drive API
 */
export default class GoogleDrive {
  /** Google Drive API Service */
  private static service = google.drive({ version: "v3", auth });

  /**
   * Returns the latest spreadsheet file id
   * @returns {Promise<string | null>} The latest spreadsheet file id or null if there is no file
   */
  public static async getSheetSets(): Promise<string | null> {
    let repo = AppDataSource.getRepository(CurrentSpreadsheets);
    let currentFile = await repo.findOne({});

    if (
      currentFile &&
      currentFile.entryDate.getTime() == new Date().getTime()
    ) {
      return currentFile.id;
    }

    return null;
  }

  /**
   * Set the database with the latest spreadsheet file id and delete the previous one
   * @returns {Promise<void>}
   */
  public static async setLatestFileId(): Promise<void> {
    let files = await this.listFiles();
    let latestFile = files[0];

    let repo = AppDataSource.getRepository(CurrentSpreadsheets);
    await repo.delete({});
    let entity = new CurrentSpreadsheets();
    entity.id = latestFile.id;
    entity.entryDate = new Date();

    await repo.save(entity);
  }

  /**
   * Returns the list of all the spreadsheet files
   * @param userId The caller user id
   * @returns {Promise<File[]>} The list of all the spreadsheet files
   */
  private static async listFiles(userId?: string): Promise<File[]> {
    let listFiles: File[] = [];

    let logMsg;

    try {
      const response = await this.service.files.list({
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
      listFiles = this.sortByDate(listFiles);

      userId = userId ? userId : LogsLevels.SYSTEM;
      Logger.logCoachingI(userId, LogsCoachingITypes.FETCHING_FILES, logMsg);
      return listFiles;
    }
  }

  /**
   * Sort the files by date
   * @param files The files to sort
   * @returns {File[]} The sorted files by date
   */
  private static sortByDate(files: File[]): File[] {
    return files.sort((a, b) => {
      return b.createdTime.getTime() - a.createdTime.getTime();
    });
  }
}
