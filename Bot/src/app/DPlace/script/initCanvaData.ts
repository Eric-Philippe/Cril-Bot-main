import { AppDataSource } from "../../../data-source";
import { DplaceData } from "../../../entities/DplaceData";
import { HEIGHT, WIDTH } from "../Contexte";
import { CanvaData } from "../models/CanvaData";

export const init = () => {
  const WHITE = "#FFFFFF";
  const CANVA_HEIGHT = HEIGHT;
  const CANVA_WIDTH = WIDTH;

  const ARRAY = [];
  for (let i = 0; i < CANVA_HEIGHT; i++) {
    ARRAY.push([]);
    for (let j = 0; j < CANVA_WIDTH; j++) {
      ARRAY[i].push(WHITE);
    }
  }

  const canvaData: CanvaData = {
    data: ARRAY,
  };

  const entity = new DplaceData();
  entity.canvasJson = canvaData;
  entity.createdAt = new Date();
  entity.height = CANVA_HEIGHT;
  entity.width = CANVA_WIDTH;

  AppDataSource.getRepository(DplaceData).save(entity);
};
