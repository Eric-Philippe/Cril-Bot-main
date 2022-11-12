const {
  ButtonInteraction,
  ThreadChannel,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const { themeChannel, adminRole } = require("../config");
/**
 *
 * @param {ButtonInteraction} interaction
 */
const cancelTheme = (interaction) => {
  /** @type {ThreadChannel} */
  let currentThread = interaction.channel;
  if (currentThread.locked || currentThread.archived) return;
  interaction.reply({ content: "Le thread va être supprimé dans 5 secondes" });
  setTimeout(() => {
    try {
      currentThread.delete();
    } catch (e) {
      return;
    }
  }, 5000);
};
/**
 *
 * @param {ButtonInteraction} interaction
 */
const createTheme = async (interaction) => {
  /** @type {ThreadChannel} */
  let currentThread = interaction.channel;

  const firstModal = new ModalBuilder()
    .setCustomId("new-theme")
    .setTitle("Proposition thématique - ");

  const TitleInput = new TextInputBuilder()
    .setCustomId("theme-title")
    .setLabel("Titre : ")
    .setMinLength(3)
    .setPlaceholder("Ce qui apparaitra sur RésaCRIL")
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const LevelLangueInput = new TextInputBuilder()
    .setCustomId("theme-level-langue")
    .setLabel("Niveau + Langue : ")
    .setPlaceholder("Ex: Tous niveaux Anglais")
    .setMinLength(4)
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const DescriptionRequirementsInput = new TextInputBuilder()
    .setCustomId("theme-description-requirements")
    .setLabel("Description + Pré-requis : ")
    .setMinLength(20)
    .setPlaceholder(
      "Ce que les étudiants feront pendant l'activité + Condition(s) pour participer"
    )
    .setRequired(true)
    .setStyle(TextInputStyle.Paragraph);

  const LengthPlaceInput = new TextInputBuilder()
    .setCustomId("theme-length-place")
    .setLabel("Durée et Lieu: ")
    .setPlaceholder("Ex: 90 au CRIL || 45 sur Discord")
    .setMinLength(5)
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const NbParticipantInput = new TextInputBuilder()
    .setCustomId("theme-nb-participant")
    .setLabel("Nombre de participants : ")
    .setPlaceholder("Nombre maximum de place")
    .setMinLength(1)
    .setMaxLength(2)
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  for (const input of [
    TitleInput,
    LevelLangueInput,
    DescriptionRequirementsInput,
    LengthPlaceInput,
    NbParticipantInput,
  ]) {
    firstModal.addComponents(new ActionRowBuilder().addComponents(input));
  }

  await interaction.showModal(firstModal);

  const submitted = await interaction
    .awaitModalSubmit({
      filter: (i) => i.customId === "new-theme",
      time: 5 * 60 * 1000,
    })
    .catch((e) => {
      return null;
    });

  if (!submitted)
    return interaction.reply({
      content: "Le formulaire a expiré",
      ephemeral: true,
    });

  let themeTitle = submitted.fields.getTextInputValue("theme-title");
  let levelLangue = submitted.fields.getTextInputValue("theme-level-langue");
  // Take the last element of the array
  let themeLangue = levelLangue.split(" ").pop();
  let themeLevel = levelLangue.split(" ").slice(0, -1).join(" ") || "Oublié";
  let themeDescription = submitted.fields.getTextInputValue(
    "theme-description-requirements"
  );
  let lengthPlace = submitted.fields.getTextInputValue("theme-length-place");
  let themeLength = lengthPlace.split(" ")[0];
  let themePlace = lengthPlace.split(" ").slice(1).join(" ") || "Oublié";
  let themeNbParticipant = submitted.fields.getTextInputValue(
    "theme-nb-participant"
  );

  const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Nouvelle thématique proposée")
    .setDescription(themeDescription)
    .setAuthor({ name: themeTitle })
    .setImage(
      "https://cdn.discordapp.com/attachments/579303130886569984/814908377783599194/Multi_Color_Bar.gif"
    )
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/579303130886569984/1040971732888080454/Design_sans_titre.png"
    )
    .setFooter({
      text: "Proposée par " + interaction.user.username,
      iconUrl: interaction.user.avatarURL(),
    })
    .addFields(
      {
        name: "Titre : ",
        value: themeTitle,
        inline: true,
      },
      {
        name: "Niveau : ",
        value: themeLevel,
        inline: true,
      },
      {
        name: "Langue : ",
        value: themeLangue,
        inline: true,
      },
      {
        name: "Lieu : ",
        value: themePlace,
        inline: true,
      },
      {
        name: "Durée : ",
        value: themeLength + " minutes",
        inline: true,
      },
      {
        name: "Nombre de participants : ",
        value: themeNbParticipant,
        inline: true,
      }
    );

  const themeChan = await interaction.guild.channels.cache.get(themeChannel);
  if (!themeChannel) return;

  await themeChan.send({
    embeds: [embed],
    content: `<@${interaction.user.id}> | <@&${adminRole}>`,
  });

  await submitted.reply({
    content: "Votre thème a bien été envoyé !",
    ephemeral: true,
  });

  await currentThread.setArchived(true);
};

exports.cancelTheme = cancelTheme;
exports.createTheme = createTheme;
