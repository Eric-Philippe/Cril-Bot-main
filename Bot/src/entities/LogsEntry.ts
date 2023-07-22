import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_entry_pkey", ["id"], { unique: true })
@Entity("logs_entry", { schema: "public" })
export class LogsEntry {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "entry_date",
    default: () => "now()",
  })
  entryDate: Date;

  @Column("character varying", { name: "user_id", length: 20 })
  userId: string;

  @Column("character varying", { name: "msg", length: 4000 })
  msg: string;
}
