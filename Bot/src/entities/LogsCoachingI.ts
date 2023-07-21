import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_coaching_i_pkey", ["id"], { unique: true })
@Entity("logs_coaching_i", { schema: "public" })
export class LogsCoachingI {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "entry_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  entryDate: Date;

  @Column("character varying", { name: "user_id", length: 20 })
  userId: string;

  @Column("character varying", { name: "action", length: 255 })
  action: string;

  @Column("character varying", { name: "msg", length: 4000 })
  msg: string;
}
