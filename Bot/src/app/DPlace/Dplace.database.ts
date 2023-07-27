import { AppDataSource } from "../../data-source";
import { DplaceData } from "../../entities/DplaceData";
import { ColorsDPlace } from "./Colors.enum";
import { HEIGHT, WIDTH } from "./Contexte";
import { CanvaData } from "./models/CanvaData";

export default class DPlaceDatabase {
  private static repository = AppDataSource.getRepository(DplaceData);

  private static dplace_data: DplaceData;

  public static async get(): Promise<DplaceData> {
    if (!this.dplace_data) {
      const dplace_data = await this.repository.find();
      this.dplace_data = dplace_data[0];
    }
    return this.dplace_data;
  }

  public static async getCurrentData(): Promise<CanvaData> {
    const dplace_data = await this.get();
    return dplace_data.canvasJson as CanvaData;
  }

  public static async setPixel(x: number, y: number, color: ColorsDPlace) {
    const dplace_data = await this.get();
    const data = dplace_data.canvasJson as CanvaData;
    data.data[x][y] = color;
    dplace_data.canvasJson = data;
    await this.repository.save(dplace_data);
  }

  public static async create(data: CanvaData) {
    const dplace_data = new DplaceData();
    dplace_data.canvasJson = data;
    dplace_data.createdAt = new Date();
    dplace_data.height = HEIGHT;
    dplace_data.width = WIDTH;

    await this.repository.save(dplace_data);
  }
}
