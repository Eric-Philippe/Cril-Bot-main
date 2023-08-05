import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("canvas_data_pkey", ["id"], { unique: true })
@Entity("dplace_data", { schema: "public" })
export class DplaceData {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("json", { name: "canvas_json", nullable: true })
  canvasJson: object | null;

  @Column("integer", { name: "width", nullable: true })
  width: number | null;

  @Column("integer", { name: "height", nullable: true })
  height: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;
}
