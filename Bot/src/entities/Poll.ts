import { Column, Entity, Index } from "typeorm";

@Index("poll_pkey", ["msgid", "userid"], { unique: true })
@Entity("poll", { schema: "public" })
export class Poll {
  @Column("character varying", { primary: true, name: "msgid", length: 50 })
  msgid: string;

  @Column("character varying", { primary: true, name: "userid", length: 50 })
  userid: string;

  @Column("integer", { name: "answer" })
  answer: number;
}
