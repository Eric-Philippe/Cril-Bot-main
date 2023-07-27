import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TossState } from "./TossState";

@Index("PK_76407d176d5b8a2596696aa565d", ["msgid", "userid"], { unique: true })
@Index("toss_pkey", ["msgid", "userid"], { unique: true })
@Entity("toss_participants", { schema: "public" })
export class TossParticipants {
  @Column("character varying", { primary: true, name: "msgid", length: 50 })
  msgid: string;

  @Column("character varying", { primary: true, name: "userid", length: 50 })
  userid: string;

  @ManyToOne(() => TossState, (tossState) => tossState.tossParticipants)
  @JoinColumn([{ name: "msgid", referencedColumnName: "msgid" }])
  msg: TossState;
}
