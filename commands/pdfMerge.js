const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
} = require("discord.js");

const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

module.exports = {
  desc: {
    desc: "Merge deux PDFs en un seul !",
    emote: "📋",
    exemple: [
      {
        cmd: "/merge-pdf file1.pdf file2.pdf",
        desc: "Retourne le contenu des deux PDFs en un seul.",
      },
    ],
    usage: "/merge-pdf [file1] [file2]",
  },
  data: new SlashCommandBuilder()
    .setName("merge-pdf")
    .setDescription("Merge deux PDFs en un seul !")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MentionEveryone)
    .addAttachmentOption((option) =>
      option
        .setName("file1")
        .setDescription("Premier fichier PDF à merger")
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName("file2")
        .setDescription("Second fichier PDF à merger")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const attachments = interaction.attachments.filter(
      (attachment) => attachment.contentType === "application/pdf"
    );
    await mergePDFs(attachments);
    await interaction.reply("Merged PDFs saved successfully!");
  },
};

async function mergePDFs(attachments) {
  const pdfDoc = await PDFDocument.create();

  for (const attachment of attachments) {
    const pdfBytes = await attachment.content;
    const pdfDocToAdd = await PDFDocument.load(pdfBytes);
    const copiedPages = await pdfDoc.copyPages(
      pdfDocToAdd,
      pdfDocToAdd.getPageIndices()
    );
    copiedPages.forEach((page) => pdfDoc.addPage(page));
  }

  const mergedPdfBytes = await pdfDoc.save();

  fs.writeFile("merged.pdf", mergedPdfBytes, (err) => {
    if (err) throw err;
    console.log("Merged PDF saved successfully!");
  });
}
