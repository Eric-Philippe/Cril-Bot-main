import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("inscriptions_atelier_pkey", ["id"], { unique: true })
@Entity("inscriptions_atelier", { schema: "public" })
export class InscriptionsAtelier {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "slot" })
  slot: Date;

  @Column("character varying", { name: "lieu", nullable: true, length: 255 })
  lieu: string;

  @Column("character varying", { name: "activity", length: 255 })
  activity: string;

  @Column("character varying", { name: "activity_level", length: 255 })
  activityLevel: string;

  @Column("character varying", { name: "langue", length: 255 })
  langue: string;

  @Column("character varying", { name: "lastname", length: 255 })
  lastname: string;

  @Column("character varying", { name: "firstname", length: 255 })
  firstname: string;

  @Column("character varying", {
    name: "ang_level",
    nullable: true,
    length: 255,
  })
  angLevel: string | null;

  @Column("character varying", {
    name: "esp_level",
    nullable: true,
    length: 255,
  })
  espLevel: string | null;

  @Column("character varying", {
    name: "observations",
    nullable: true,
    length: 4000,
  })
  observations: string | null;

  @Column("character varying", { name: "groupe", nullable: true, length: 255 })
  groupe: string | null;
}
