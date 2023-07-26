import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("inscriptions_coaching_pkey", ["id"], { unique: true })
@Entity("inscriptions_coaching", { schema: "public" })
export class InscriptionsCoaching {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "slot" })
  slot: Date;

  @Column("character varying", { name: "lieu", nullable: true, length: 255 })
  lieu: string | null;

  @Column("character varying", { name: "langue", length: 255 })
  langue: string;

  @Column("character varying", { name: "lastname", length: 255 })
  lastname: string;

  @Column("character varying", { name: "firstname", length: 255 })
  firstname: string;

  @Column("character varying", {
    name: "observations",
    nullable: true,
    length: 4000,
  })
  observations: string | null;

  @Column("character varying", { name: "groupe", nullable: true, length: 255 })
  groupe: string | null;

  @Column("character varying", {
    name: "comment_coaching",
    nullable: true,
    length: 255,
  })
  commentCoaching: string | null;
}
