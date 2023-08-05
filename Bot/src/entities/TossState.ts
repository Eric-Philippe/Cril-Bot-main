import { Column, Entity, Index, OneToMany } from "typeorm";
import { TossParticipants } from "./TossParticipants";

@Index("toss_state_pkey", ["msgid"], { unique: true })
@Entity("toss_state", { schema: "public" })
export class TossState {
  @Column("character varying", { primary: true, name: "msgid", length: 50 })
  msgid: string;

  @Column("character varying", { name: "etat", nullable: true, length: 50 })
  etat: string | null;

  @OneToMany(() => TossParticipants, (tossParticipants) => tossParticipants.msg)
  tossParticipants: TossParticipants[];
}
