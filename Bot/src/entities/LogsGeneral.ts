import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_general_pkey", ["id"], { unique: true })
@Entity("logs_general", { schema: "public" })
export class LogsGeneral {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "entry_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  entryDate: Date;

  @Column("character varying", { name: "type", length: 255 })
  type: string;

  @Column("character varying", { name: "msg", length: 4000 })
  msg: string;
}
