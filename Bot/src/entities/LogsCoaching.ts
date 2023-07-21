import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_coaching_pkey", ["id"], { unique: true })
@Entity("logs_coaching", { schema: "public" })
export class LogsCoaching {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "entry_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  entryDate: Date;

  @Column("character varying", { name: "user_id", length: 20 })
  userId: string;

  @Column("character varying", { name: "msg", length: 4000 })
  msg: string;
}
