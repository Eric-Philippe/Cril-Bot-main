import { Column, Entity, Index } from "typeorm";

@Index("current_spreadsheets_pkey", ["id"], { unique: true })
@Entity("current_spreadsheets", { schema: "public" })
export class CurrentSpreadsheets {
  @Column("character varying", { primary: true, name: "id", length: 50 })
  id: string;

  @Column("timestamp without time zone", { name: "entry_date" })
  entryDate: Date;
}
