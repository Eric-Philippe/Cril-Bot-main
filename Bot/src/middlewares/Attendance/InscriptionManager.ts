import { AppDataSource } from "../../data-source";
import { InscriptionsAtelier } from "../../entities/InscriptionsAtelier";
import { InscriptionsCoaching } from "../../entities/InscriptionsCoaching";
import { isEmpty } from "../../utils/String";
import { Inscription } from "./models/Inscription";

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

  public static async getCoachings(inscriptions: Inscription[]) {
    return inscriptions.filter((i) => i.type === "Coaching");
  }

  public static async getAteliers(inscriptions: Inscription[]) {
    return inscriptions.filter((i) => i.type === "Atelier");
  }
}
