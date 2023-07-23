import { InscriptionTypes } from "./InscriptionType";

export interface Inscription {
  type: string;
  activity_name: string;
  time: Date;
  language: string;
  niveau: string;
  student_lastname: string;
  student_firstname: string;
  group: string | null;
  observations: string | null;
  english_level: string | null;
  spanish_level: string | null;
}
