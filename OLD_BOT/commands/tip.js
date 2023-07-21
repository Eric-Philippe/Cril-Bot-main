const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

const TIPS_FILE = require("../crilTips.json");
const TIPS = TIPS_FILE.TIPS;

module.exports = {
  desc: {
    desc: "Tip manager for the tips displayed in the tips channel.",
    emote: "💡",
    exemple: [
      {
        cmd: "/tip add Pensez à utiliser les **slash commande**",
        desc: "Ajoute un nouveau tip dans la liste !",
      },
      { cmd: "/tip list", desc: "Affiche la liste des tips" },
      { cmd: "/tip remove 1", desc: "Supprime le tip numéro 1 de la liste" },
    ],
    usage: "/tip <add|remove|list> <tip>",
  },
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip manager for the tips displayed in the tips channel.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add a new tip to the list")
        .addStringOption((option) =>
          option
            .setName("tip")
            .setDescription("The tip to add")
            .setRequired(true)
        )
        .addAttachmentOption((option) =>
          option
            .setName("fichier-1")
            .setDescription("Ajouter un premier fichier au tip !")
        )
        .addAttachmentOption((option) =>
          option
            .setName("fichier-2")
            .setDescription("Ajouter un deuxième fichier au tip")
        )
        .addAttachmentOption((option) =>
          option
            .setName("fichier-3")
            .setDescription("Ajouter un troisième fichier au tip")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a tip from the list")
        .addIntegerOption((option) =>
          option
            .setName("index-tip")
            .setDescription("The tip to remove")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("List all the tips")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let subCommand = interaction.options.getSubcommand();

    let embed = new EmbedBuilder().setColor("Blurple");

    switch (subCommand) {
      case "add":
        let tip = interaction.options.getString("tip");
        let fileArray = [];
        for (let i = 0; i < 3; i++) {
          let file = interaction.options.getAttachment(`fichier-${i + 1}`);
          if (!file) break;
          fileArray.push("./BotCril/res/" + file.name);
          saveFile(file);
        }

        TIPS.push({ name: tip, files: fileArray });
        updateJsonFile();
        embed
          .setTitle("Tip ajouté !")
          .setDescription("✅ | Le tip a correctement été ajouté !");
        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
        break;
      case "remove":
        let index = interaction.options.getInteger("index-tip");
        if (index > TIPS.length || TIPS.length <= 0) {
          interaction.reply({
            content: `Le numéro de tip est trop grand !`,
            ephemeral: true,
          });
        } else {
          let filesToDelete = TIPS[index - 1].files;
          if (filesToDelete.length != 0) {
            for (let file of filesToDelete) {
              try {
                fs.unlinkSync(file);
              } catch (err) {
                console.warn(err);
              }
            }
          }
          TIPS.splice(index - 1, 1);
          updateJsonFile();
          embed
            .setTitle("Tip supprimé !")
            .setDescription("✅ | Le tip a correctement été supprimé !");
          interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }
        break;
      case "list":
        if (TIPS.length <= 0)
          interaction.reply(
            "La liste est vide ! Merci d'en rajouter avec la commande /tip add"
          );
        let list = "";
        let tip_text, file_text;
        for (let i = 0; i < TIPS.length; i++) {
          // Display the 20 first characters of the tip if the tip is longer than 20 characters
          tip_text =
            TIPS[i].name.length > 35
              ? TIPS[i].name.substring(0, 35) + "..."
              : TIPS[i].name;
          file_text =
            TIPS[i].files.length > 0
              ? ` | *[${TIPS[i].files.length} fichiers associés]*`
              : "";
          list += `#${i + 1} - ${tip_text} ${file_text} \n`;
        }

        embed.setTitle("Liste des tips").setDescription(list);
        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
        break;
    }
  },
};

const updateJsonFile = () => {
  fs.writeFileSync("crilTips.json", JSON.stringify(TIPS_FILE, null, 2));
};

const saveFile = (file) => {
  fetch(file.url).then((res) =>
    res.body.pipe(fs.createWriteStream("./res/" + file.name))
  );
};
