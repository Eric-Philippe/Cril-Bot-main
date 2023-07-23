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
  public static async saveInscription(inscription: Inscription[]) {
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
    let repoCoach = AppDataSource.getRepository(InscriptionsAtelier);

    await repoAtelier.delete({});
    await repoCoach.delete({});
  }

  public static async refreshInscriptions(sheetId: string) {
    await this.deleteInscriptionsFromDb();
    let secondId = (await SheetsService.getSecondSheetId(sheetId)).toString();
    let ateliers = await SheetsAteliers.getData(sheetId, secondId);
    let coachings = await SheetsCoaching.getData(sheetId, "0");

    console.log(ateliers);
  }

  public static createInscriptionAtelierFromSheet(
    inscription: any[]
  ): InscriptionAtelier {
    return {
      slot: HHMMToDate(inscription[0]),
      lieu: inscription[1],
      titre: inscription[2],
      langue: inscription[3],
      niveau: inscription[4],
      nom: inscription[5],
      prenom: inscription[6],
      presence: inscription[7],
      nivConsAnglais: inscription[8],
      nivConsEspagnol: inscription[9],
      observations: inscription[10],
      groupe: inscription[11],
    };
  }

  public static createInscriptionCoachingFromSheet(
    inscription: any[]
  ): InscriptionCoaching {
    return {
      slot: HHMMToDate(inscription[0]),
      lieu: inscription[1],
      langue: inscription[2],
      nom: inscription[3],
      prenom: inscription[4],
      presence: inscription[5],
      observations: inscription[6],
      groupe: inscription[7],
      commentCoaching: inscription[8],
    };
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
