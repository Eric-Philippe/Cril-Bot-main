import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_error_pkey", ["id"], { unique: true })
@Entity("logs_error", { schema: "public" })
export class LogsError {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "entry_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  entryDate: Date;

  @Column("character varying", { name: "error_type", length: 255 })
  errorType: string;

  @Column("text", { name: "stack_trace" })
  stackTrace: string;

  @Column("character varying", { name: "msg", length: 4000 })
  msg: string;
}
