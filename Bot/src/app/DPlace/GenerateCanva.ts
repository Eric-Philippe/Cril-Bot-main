import { createCanvas } from "canvas";
import { DplaceData } from "../../entities/DplaceData";
import { PIXEL_SIZE } from "./Contexte";
import { CanvaData } from "./models/CanvaData";
import { ColorsDPlace } from "./Colors.enum";

export const generateCanva = (data: DplaceData): Buffer => {
  const jsonData = data.canvasJson;
  const pixelColorArray = (jsonData as CanvaData).data;

  console.log(pixelColorArray);

  const HEIGHT_COUNT = data.height;
  const WIDTH_COUNT = data.width;

  const imageWidth = WIDTH_COUNT * (PIXEL_SIZE + 15) + 50;
  const imageHeight = HEIGHT_COUNT * (PIXEL_SIZE + 15) + 50;

  const canvas = createCanvas(imageWidth, imageHeight);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = ColorsDPlace.WHITE;
  ctx.fillRect(0, 0, imageWidth, imageWidth);

  ctx.fillStyle = ColorsDPlace.BLACK;
  ctx.font = "20px Arial";

  // Make the grid writing the coordinates on the left
  for (let i = 0; i <= HEIGHT_COUNT; i++) {
    if (i === 0) continue;
    if (i < 10) ctx.fillText(i.toString(), 7, i * (PIXEL_SIZE + 15) + 17);
    else ctx.fillText(i.toString(), 0, i * (PIXEL_SIZE + 15) + 17);
  }

  // Make the grid writing the coordinates on the top
  for (let i = 0; i <= WIDTH_COUNT; i++) {
    if (i === 0) continue;
    if (i < 10) ctx.fillText(i.toString(), i * (PIXEL_SIZE + 15) + 5, 20);
    else ctx.fillText(i.toString(), i * (PIXEL_SIZE + 15) + 0, 20);
  }

  ctx.strokeStyle = ColorsDPlace.BLACK;
  ctx.lineWidth = 2;
  ctx.strokeRect(25, 25, imageWidth - 50, imageHeight - 50);

  for (let i = 0; i < HEIGHT_COUNT; i++) {
    for (let j = 0; j < WIDTH_COUNT; j++) {
      ctx.fillStyle = pixelColorArray[i][j];
      ctx.fillRect(
        j * (PIXEL_SIZE + 15) + 25,
        i * (PIXEL_SIZE + 15) + 25,
        PIXEL_SIZE + 15,
        PIXEL_SIZE + 15
      );
    }
  }

  const buffer = canvas.toBuffer("image/png");
  return buffer;
};
