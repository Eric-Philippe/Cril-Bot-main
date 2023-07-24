import SheetsAteliers from "../../GoogleAPI/Sheets/Sheets.ateliers";
import SheetsCoaching from "../../GoogleAPI/Sheets/Sheets.coachings";
import SheetsService from "../../GoogleAPI/Sheets/Sheets.service";
import Sheets from "../../GoogleAPI/auth/SheetsAuth";
import { AppDataSource } from "../../data-source";
import { InscriptionsAtelier } from "../../entities/InscriptionsAtelier";
import { InscriptionsCoaching } from "../../entities/InscriptionsCoaching";
import { HHMMToDate } from "../../utils/Date";
import { isEmpty } from "../../utils/String";
import { Inscription } from "./models/Inscription";
import { InscriptionAtelier } from "./models/InscriptionAtelier";
import { InscriptionCoaching } from "./models/InscriptionCoaching";

export default class InscriptionManager {
  public static async saveInscriptionOnDB(inscription: Inscription[]) {
    await this.deleteInscriptionsFromDb();
    let ateliers = await this.getAteliers(inscription);
    let coachings = await this.getCoachings(inscription);

    for (let i = 0; i < ateliers.length; i++) {
      await this.createInscriptionAtelier(ateliers[i]);
    }

    for (let i = 0; i < coachings.length; i++) {
      await this.createInscriptionCoach(coachings[i]);
    }
  }

  public static async getInscriptionsAtelier() {
    let repo = AppDataSource.getRepository(InscriptionsAtelier);
    return await repo.find();
  }

  public static async getInscriptionsCoaching() {
    let repo = AppDataSource.getRepository(InscriptionsCoaching);
    return await repo.find();
  }

  public static async deleteInscriptionsFromDb() {
    let repoAtelier = AppDataSource.getRepository(InscriptionsAtelier);
    let repoCoach = AppDataSource.getRepository(InscriptionsCoaching);

    await repoAtelier.delete({});
    await repoCoach.delete({});
  }

  public static async refreshInscriptions(sheetId: string): Promise<number> {
    await this.deleteInscriptionsFromDb();
    let errorCode = 0;
    let secondId = (await SheetsService.getSecondSheetId(sheetId)).toString();
    let ateliers = await SheetsAteliers.getData(sheetId, secondId);
    if (ateliers != null) {
      let repoAteliers = AppDataSource.getRepository(InscriptionsAtelier);
      for (let i = 0; i < ateliers.length; i++) {
        let ins = await this.createInscriptionAtelierFromSheet(ateliers[i]);
        repoAteliers.save(ins);
      }
    }

    let coachings = await SheetsCoaching.getData(sheetId, "0");
    if (coachings != null) {
      let repoCoach = await AppDataSource.getRepository(InscriptionsCoaching);
      for (let i = 0; i < coachings.length; i++) {
        let ins = await this.createInscriptionCoachingFromSheet(coachings[i]);
        repoCoach.save(ins);
      }
    }

    return errorCode;
  }

  public static createInscriptionAtelierFromSheet(
    inscription: any[]
  ): InscriptionsAtelier {
    let ins = new InscriptionsAtelier();
    ins.slot = HHMMToDate(inscription[0]);
    ins.lieu = inscription[1];
    ins.activity = inscription[2];
    ins.langue = inscription[3];
    ins.activityLevel = inscription[4];
    ins.lastname = inscription[5];
    ins.firstname = inscription[6];
    ins.angLevel = isEmpty(inscription[8]) ? null : inscription[8];
    ins.espLevel = isEmpty(inscription[9]) ? null : inscription[9];
    ins.observations = isEmpty(inscription[10]) ? null : inscription[10];
    ins.groupe = isEmpty(inscription[11]) ? null : inscription[11];

    return ins;
  }

  public static createInscriptionCoachingFromSheet(
    inscription: any[]
  ): InscriptionsCoaching {
    let ins = new InscriptionsCoaching();
    ins.slot = HHMMToDate(inscription[0]);
    ins.lieu = inscription[1];
    ins.langue = inscription[2];
    ins.lastname = inscription[3];
    ins.firstname = inscription[4];
    ins.observations = isEmpty(inscription[6]) ? null : inscription[6];
    ins.groupe = isEmpty(inscription[7]) ? null : inscription[7];
    ins.commentCoaching = isEmpty(inscription[8]) ? null : inscription[8];

    return ins;
  }

  public static async createInscriptionAtelier(inscription: Inscription) {
    let repo = AppDataSource.getRepository(InscriptionsAtelier);
    let ins = new InscriptionsAtelier();
    ins.slot = inscription.time;
    ins.activity = inscription.activity_name;
    ins.activityLevel = inscription.niveau;
    ins.langue = inscription.language;
    ins.lastname = inscription.student_lastname;
    ins.firstname = inscription.student_firstname;
    ins.angLevel = isEmpty(inscription.english_level)
      ? null
      : inscription.english_level;
    ins.espLevel = isEmpty(inscription.spanish_level)
      ? null
      : inscription.spanish_level;
    ins.observations = isEmpty(inscription.observations)
      ? null
      : inscription.observations;
    ins.groupe = isEmpty(inscription.group) ? null : inscription.group;

    await repo.save(ins);
  }

  public static async createInscriptionCoach(inscription: Inscription) {
    let repo = AppDataSource.getRepository(InscriptionsCoaching);
    let ins = new InscriptionsCoaching();
    ins.slot = inscription.time;
    ins.langue = inscription.language;
    ins.lastname = inscription.student_lastname;
    ins.firstname = inscription.student_firstname;
    ins.observations = isEmpty(inscription.observations)
      ? null
      : inscription.observations;
    ins.groupe = isEmpty(inscription.group) ? null : inscription.group;

    await repo.save(ins);
  }

  public static sheetToInscriptionCoaching(sheet: InscriptionCoaching) {
    let ins = new InscriptionsCoaching();
    ins.slot = sheet.slot;
    ins.langue = sheet.langue;
    ins.lastname = sheet.nom;
    ins.firstname = sheet.prenom;
    ins.observations = isEmpty(sheet.observations) ? null : sheet.observations;
    ins.groupe = isEmpty(sheet.groupe) ? null : sheet.groupe;
    ins.commentCoaching = isEmpty(sheet.commentCoaching)
      ? null
      : sheet.commentCoaching;
  }

  public static sheetToInscriptionAtelier(sheet: InscriptionAtelier) {
    let ins = new InscriptionsAtelier();
    ins.slot = sheet.slot;
    ins.activity = sheet.titre;
    ins.activityLevel = sheet.niveau;
    ins.langue = sheet.langue;
    ins.lastname = sheet.nom;
    ins.firstname = sheet.prenom;
    ins.angLevel = isEmpty(sheet.nivConsAnglais) ? null : sheet.nivConsAnglais;
    ins.espLevel = isEmpty(sheet.nivConsEspagnol)
      ? null
      : sheet.nivConsEspagnol;
    ins.observations = isEmpty(sheet.observations) ? null : sheet.observations;
    ins.groupe = isEmpty(sheet.groupe) ? null : sheet.groupe;
  }

  public static async getCoachings(inscriptions: Inscription[]) {
    return inscriptions.filter((i) => i.type === "Coaching");
  }

  public static async getAteliers(inscriptions: Inscription[]) {
    return inscriptions.filter((i) => i.type === "Atelier");
  }
}
