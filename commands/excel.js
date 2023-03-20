const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");

const Discord = require("discord.js");

const axios = require("axios");

const sheetApiUrl = require("../config").SHEET_API_URL;

module.exports = {
  desc: {
    desc: "Permet la gestion du GoogleSheet courant.",
    emote: "📊",
    exemple: [
      {
        cmd: "/excel refresh",
        desc: "Rafraichit le GoogleSheet courant.",
      },
      {
        cmd: "/excel format",
        desc: "Formate le GoogleSheet courant.",
      },
      {
        cmd: "/excel clear",
        desc: "Efface la sauvegarde liée au GoogleSheet courant.",
      },
      {
        cmd: "/excel resize",
        desc: "Redimensionne le GoogleSheet courant.",
      },
      {
        cmd: "/excel link",
        desc: "Lien vers le GoogleSheet courant.",
      },
      {
        cmd: "/excel help",
        desc: "Affiche l'aide pour la gestion du GoogleSheet.",
      },
      {
        cmd: "/excel logger",
        desc: "Affiche l'historique des logs du coaching excel",
      },
    ],
    usage: "/excel <refresh|clear|resize|link|help|logger>",
  },
  data: new SlashCommandBuilder()
    .setName("excel")
    .setDescription("Permet la gestion du GoogleSheet courant.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("refresh")
        .setDescription("Rafraichit le GoogleSheet courant.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("format")
        .setDescription("Formate le Googlesheet courant.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("link")
        .setDescription("Lien vers le GoogleSheet courant.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("clear")
        .setDescription("Efface la sauvegarde liée au GoogleSheet courant.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("resize")
        .setDescription("Redimensionne le GoogleSheet courant.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("help")
        .setDescription("Affiche l'aide pour la gestion du GoogleSheet.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("logger")
        .setDescription("Affiche l'historique des logs du coaching excel")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "refresh":
        await interaction.reply({
          embeds: [waitEmbedBuilder("Rafraichissement...")],
        });
        try {
          let callback = await axios.post(sheetApiUrl + "/refresh");
          if (callback.data.index == 0) {
            await interaction.editReply({
              embeds: [
                successEmbedBuilder(
                  "Rafraichissement du GoogleSheet terminé !",
                  callback.data.msg
                ),
              ],
              components: [await successButtonBuilder(callback.data.msg)],
            });
            return;
          } else {
            await interaction.editReply({
              embeds: [
                errorEmbedBuilder(
                  "Merci de vérifier que le GoogleSheet est bien configuré."
                ),
              ],
            });
            return;
          }
        } catch (error) {
          await interaction.editReply({
            embeds: [
              errorEmbedBuilder(
                "Merci de vérifier que le GoogleSheet est bien configuré."
              ),
            ],
          });
        }
        break;
      case "link":
        let callback = await axios.get(sheetApiUrl + "/id");
        if (callback.data.index < 0) {
          return await interaction.reply(
            "Aucun GoogleSheet n'est configuré pour le moment."
          );
        }
        let id = callback.data.msg;
        let full_link = `https://docs.google.com/spreadsheets/d/${id}/edit#gid=0`;
        let embed = new EmbedBuilder()
          .setTitle("📌 | Lien vers le GoogleSheet")
          .setDescription(
            `📑 | [Click one me to open the today's GoogleSheet](${full_link})`
          )
          .setColor("Green")
          .setTimestamp()
          .setURL(full_link);

        await interaction.reply({
          embeds: [embed],
          components: [successButtonBuilder(id)],
        });
        break;
      case "format":
        await interaction.reply({
          embeds: [waitEmbedBuilder("Formatage...")],
        });
        try {
          let callback = await axios.post(sheetApiUrl + "/format");
          if (callback.data.index == 0) {
            await interaction.editReply({
              embeds: [
                successEmbedBuilder(
                  "Formatage du GoogleSheet terminé !",
                  callback.data.msg
                ),
              ],
              components: [successButtonBuilder(callback.data.msg)],
            });
            return;
          } else {
            await interaction.editReply({
              embeds: [
                errorEmbedBuilder(
                  "Merci de vérifier que le GoogleSheet est bien configuré."
                ),
              ],
            });
            return;
          }
        } catch (error) {
          await interaction.editReply({
            embeds: [
              errorEmbedBuilder(
                "Merci de vérifier que le GoogleSheet est bien configuré."
              ),
            ],
          });
        }
        break;
      case "clear":
        await interaction.reply({
          embeds: [waitEmbedBuilder("Effacement...")],
        });
        try {
          let callback = await axios.post(sheetApiUrl + "/clear");
          if (callback.data.index == 0) {
            await interaction.editReply({
              embeds: [
                successEmbedBuilder(
                  "Effacement du GoogleSheet terminé !",
                  callback.data.msg
                ),
              ],
              components: [successButtonBuilder(callback.data.msg)],
            });
            return;
          } else {
            await interaction.editReply({
              embeds: [
                errorEmbedBuilder(
                  "Merci de vérifier que le GoogleSheet est bien configuré."
                ),
              ],
            });
            return;
          }
        } catch (error) {
          await interaction.editReply({
            embeds: [
              errorEmbedBuilder(
                "Merci de vérifier que le GoogleSheet est bien configuré."
              ),
            ],
          });
        }
        break;
      case "resize":
        await interaction.reply({
          embeds: [waitEmbedBuilder("Redimensionnement...")],
        });
        try {
          let callback = await axios.post(sheetApiUrl + "/resize");
          if (callback.data.index == 0) {
            await interaction.editReply({
              embeds: [
                successEmbedBuilder(
                  "Redimensionnement du GoogleSheet terminé !",
                  callback.data.msg
                ),
              ],
              components: [successButtonBuilder(callback.data.msg)],
            });
            return;
          } else {
            await interaction.editReply({
              embeds: [
                errorEmbedBuilder(
                  "Merci de vérifier que le GoogleSheet est bien configuré."
                ),
              ],
            });
            return;
          }
        } catch (error) {
          await interaction.editReply({
            embeds: [
              errorEmbedBuilder(
                "Merci de vérifier que le GoogleSheet est bien configuré."
              ),
            ],
          });
        }
        break;
      case "help":
        await interaction.deferReply();
        // Send a pdf file
        const file = new Discord.AttachmentBuilder(
          "./docs/Tuto_Spreadsheet.pdf"
        );
        interaction.editReply({
          files: [file],
          content:
            "📎 | Voici le tutoriel d'utilisation du système Coaching/Spreadsheet !",
        });

        break;
      case "logger":
        // Return the file located from this file in ../Coaching/coaching.log
        await interaction.deferReply();
        const file2 = new Discord.AttachmentBuilder("./Coaching/coaching.log");
        interaction.editReply({
          files: [file2],
          content:
            "📎 | Voici le fichier de log du système Coaching/Spreadsheet !",
        });
        break;
    }
  },
};

const waitEmbedBuilder = (description) => {
  return new EmbedBuilder()
    .setTitle("📎 | Spreadsheet Manager")
    .setColor("Purple")
    .setDescription("🖨️ | " + description);
};

const errorEmbedBuilder = (description) => {
  return new EmbedBuilder()
    .setTitle("📎 | Spreadsheet Manager")
    .setColor("Red")
    .setDescription("❌ | " + description);
};

const successEmbedBuilder = (description, id) => {
  return new EmbedBuilder()
    .setTitle("📎 | Spreadsheet Manager")
    .setColor("Green")
    .setDescription("✅ | " + description)
    .setURL(`https://docs.google.com/spreadsheets/d/${id}/edit#gid=0`);
};

const successButtonBuilder = (id) => {
  let button = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setURL(`https://docs.google.com/spreadsheets/d/${id}/edit#gid=0`)
    .setLabel("Open the GoogleSheet")
    .setEmoji("📑");

  return new ActionRowBuilder().addComponents(button);
};
