const { createCanvas } = require("canvas");
const fs = require("fs");
const { Message, EmbedBuilder, AttachmentBuilder } = require("discord.js");

const Memory = require("./Memory.json").$;

const COLOR = require("./ColorEnum").COLOR;
const GRID_SIZE = 600;
const MARGIN = 50;
const CANVA_SIZE = GRID_SIZE + MARGIN;
const SQUARE_SIZE = 40;
const SQUARE_PER_LINE = GRID_SIZE / SQUARE_SIZE;

module.exports = class CrilPlace {
  /**
   *
   * @param {Message} msg
   */
  static async createCanvas(msg) {
    const canva = createCanvas(CANVA_SIZE, CANVA_SIZE);
    const ctx = canva.getContext("2d");

    ctx.fillStyle = COLOR.WHITE;
    ctx.fillRect(0, 0, CANVA_SIZE, CANVA_SIZE);

    ctx.fillStyle = COLOR.BLACK;
    ctx.font = "20px Arial";
    for (let i = 0; i < SQUARE_PER_LINE; i++) {
      if (i < 10) {
        ctx.fillText(i, 7, 35 + i * SQUARE_SIZE + SQUARE_SIZE / 2);
        ctx.fillText(i, 20 + i * SQUARE_SIZE + SQUARE_SIZE / 2, 20);
      } else {
        ctx.fillText(i, 0, 35 + i * SQUARE_SIZE + SQUARE_SIZE / 2);
        ctx.fillText(
          i,
          SQUARE_PER_LINE + i * SQUARE_SIZE + SQUARE_SIZE / 2,
          20
        );
      }
    }

    ctx.strokeStyle = COLOR.BLACK;
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, GRID_SIZE, GRID_SIZE);

    let attachment = new AttachmentBuilder(canva.toBuffer(), {
      name: "canva.png",
    });

    let embedCanvaHeader = new EmbedBuilder()
      .setTitle("CrilPlace")
      .setColor(COLOR.RED);

    let embedCanvaFooter = new EmbedBuilder()
      .setFooter({ text: "Placez vos pixels avec /pixel <x> <y> <couleur>" })
      .setColor(COLOR.RED);

    await msg.channel.send({ embeds: [embedCanvaHeader] });
    await msg.channel.send({ files: [attachment] });
    await msg.channel.send({ embeds: [embedCanvaFooter] });

    // Build the memory
    for (let i = 0; i < SQUARE_PER_LINE; i++) {
      Memory[i] = [];
      for (let j = 0; j < SQUARE_PER_LINE; j++) {
        Memory[i][j] = COLOR.WHITE;
      }
    }

    fs.writeFileSync(
      "./CrilPlace/Memory.json",
      JSON.stringify({ $: Memory }, null, 2)
    );
  }
  /**
   *
   * @param {Message} msg
   * @param {Number} x
   * @param {Number} y
   * @param {String} color
   */
  static async updateCanvas(msg, x, y, color) {
    const canva = createCanvas(CANVA_SIZE, CANVA_SIZE);
    const ctx = canva.getContext("2d");

    ctx.fillStyle = COLOR.WHITE;
    ctx.fillRect(0, 0, CANVA_SIZE, CANVA_SIZE);

    ctx.fillStyle = COLOR.BLACK;
    ctx.font = "20px Arial";
    for (let i = 0; i < SQUARE_PER_LINE; i++) {
      if (i < 10) {
        ctx.fillText(i, 7, 35 + i * SQUARE_SIZE + SQUARE_SIZE / 2);
        ctx.fillText(i, 20 + i * SQUARE_SIZE + SQUARE_SIZE / 2, 20);
      } else {
        ctx.fillText(i, 0, 35 + i * SQUARE_SIZE + SQUARE_SIZE / 2);
        ctx.fillText(
          i,
          SQUARE_PER_LINE + i * SQUARE_SIZE + SQUARE_SIZE / 2,
          20
        );
      }
    }

    // Draw a square at the given position
    ctx.fillStyle = color;
    ctx.fillRect(
      25 + x * SQUARE_SIZE,
      25 + y * SQUARE_SIZE,
      SQUARE_SIZE,
      SQUARE_SIZE
    );

    ctx.strokeStyle = COLOR.BLACK;
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, GRID_SIZE, GRID_SIZE);

    for (let i = 0; i < SQUARE_PER_LINE; i++) {
      for (let j = 0; j < SQUARE_PER_LINE; j++) {
        ctx.fillStyle = Memory[i][j];
        ctx.fillRect(
          25 + i * SQUARE_SIZE,
          25 + j * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      }
    }

    let attachment = new AttachmentBuilder(canva.toBuffer(), {
      name: "canva.png",
    });

    await msg.edit({ files: [attachment] });
  }
};
