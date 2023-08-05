import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_canvas_pkey", ["id"], { unique: true })
@Entity("logs_dplace", { schema: "public" })
export class LogsDplace {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "user_id", nullable: true, length: 100 })
  userId: string | null;

  @Column("timestamp without time zone", {
    name: "action_date",
    nullable: true,
  })
  actionDate: Date | null;

  @Column("character varying", { name: "color", nullable: true, length: 50 })
  color: string | null;

  @Column("integer", { name: "x", nullable: true })
  x: number | null;

  @Column("integer", { name: "y", nullable: true })
  y: number | null;
}
