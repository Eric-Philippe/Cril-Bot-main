const Discord = require("discord.js"); // Main discordjs import

const { client } = require("./utils/client"); // Get the client

const { supportRole, supportChannel, adminRole } = require("./config"); // Import the miscellaneous constantes
const { MyNumberEmotes } = require("./emotes.json"); // Self made number emotes
const helpsText = [
  "Je ne peux pas venir à mon activité / coaching, comment faire ?",
  "J'ai eu une absence injustifiée.",
  "Ma fiche Moodle n'a pas été validée.",
  "Je suis perdu, dans quel Channel dois-je aller pour mon activité / coaching ?",
  "Je n'entends rien / on ne m'entend pas.",
  "Il n'y a plus de place sur Résacril, comment faire?",
  "La fiche Moodle c'est quoi ?",
  "Comment je réserve une activité / un coaching ?",
  "J'ai réservé mais je ne sais plus à quelle heure | date | où, comment faire ?",
  "J'ai une autre question.",
]; // Text for the help Desk
const helpsLength = helpsText.length; // Length of the helpsText array

const MAIN_COLOR = "#048B9A"; // Main color for the embeds System
/**
 * Display the help desk
 * @param {Discord.Message} msg
 */
const displayAssistance = (msg) => {
  // Embed Builder
  // First embed with the instructions of the HelpDesk
  let embedIntro = new Discord.EmbedBuilder()
    .setTitle("Assistance du CRIL")
    .setDescription(
      "Bienvenue sur la page d'assistance. Cliquez sur le bouton associé à votre question pour obtenir une réponse ciblée ! \n Sinon, cliquez sur le bouton avec le point d'interrogation pour demander une aide personnalisée."
    )
    .setThumbnail(client.user.avatarURL())
    .setAuthor({ name: "Help Desk" })
    .setColor(MAIN_COLOR);
  // Second embed with the Help Desk
  let mainDisplay = new Discord.EmbedBuilder()
    .setTitle("Help Desk du CRIL")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1018634931062190201/interopoint.png"
    )
    .setColor(MAIN_COLOR);
  // First row of buttons
  let row = new Discord.ActionRowBuilder();
  // Second row of Buttons
  let secondRow = new Discord.ActionRowBuilder();
  let currentRow = row; // Current row we're working with
  let description = ""; // Text
  // Loop through the helpsText array
  for (let i = 0; i < helpsLength; i++) {
    // Change the current row for the second half
    if (i >= 5) currentRow = secondRow;
    // Add the button to the current row
    currentRow.addComponents(
      new Discord.ButtonBuilder()
        .setEmoji(MyNumberEmotes[i])
        // The last button has to be blue
        .setStyle(
          i + 1 == helpsLength
            ? Discord.ButtonStyle.Primary
            : Discord.ButtonStyle.Secondary
        )
        .setCustomId(String(i + 1))
    );
    // Add the text for the description embed
    description += `${MyNumberEmotes[i]} ${helpsText[i]}\n\n`;
  }
  // Add the final description
  mainDisplay.setDescription(description);
  // Send the whole help desk
  msg.channel.send({
    embeds: [embedIntro, mainDisplay],
    components: [row, secondRow],
  });
};
/**
 * Reaction to the buttons on the help desk
 * @param {Discord.ButtonInteraction} i
 */
const processHelpAssistance = (i) => {
  switch (i.customId) {
    case "1":
      i.reply({
        content:
          '🚪 | Vous pouvez vous désinscrire directement depuis Résacril jusqu’à la veille de votre réservation [Tuto Résacril](https://www.youtube.com/watch?v=ZT_754tjVIY). Si la réservation est aujourd’hui, cliquez sur le bouton bleu avec "???" (j’ai une autre question) et remplissez le formulaire !',
        ephemeral: true,
      });
      break;
    case "2":
      i.reply({
        content:
          "📧 | Ecrivez un mail à cril.langues@iut-tlse3.fr en expliquant les raisons de votre absence, joignez vos justificatifs s’il y a lieu.",
        ephemeral: true,
      });
      break;
    case "3":
      i.reply({
        content:
          "🕛 | Le délai de validation est de maximum une semaine. Pour un Coaching, vérifiez sur [Récap & Planning sur Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/) s’il est indiqué de reprendre ou faire votre fiche, suivez les consignes, et envoyez un mail à cril.langues@iut-tlse.fr pour le signaler. Attention, une fiche en retard de plus de 10 jours ne pourra pas être validée.",
        ephemeral: true,
      });
      break;
    case "4":
      i.reply({
        content:
          "✅ | Merci de vérifier sur Résacril le type, l’heure, le lieu et le niveau de votre réservation et vous présenter dans le channel adéquat, en faisant attention à la catégorie – [lien Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)",
        ephemeral: true,
      });
      break;
    case "5":
      const file = new Discord.AttachmentBuilder("./docs/Support_Vocal.pdf");
      i.reply({
        content: "📄 | Suivez les étapes dans ce document d’aide.",
        files: [file],
        ephemeral: true,
      });
      break;
    case "6":
      i.reply({
        content:
          "👀 | Surveillez les salons Annonces pour être au courant de l’ouverture de nouveaux créneaux ou d’éventuels désistements de dernière minute. L’information est également envoyée par mail lors de l’ouverture de nombreux créneaux, pensez à les consulter régulièrement. \n\n🕳️ | Si vous avez été dans une situation qui vous a empêché de commencer votre parcours assez tôt, prenez contact avec votre enseignant.",
        ephemeral: true,
      });
      break;
    case "7":
      i.reply({
        content:
          "📌 | Il s’agit d’une fiche de suivi de votre travail en coaching qui permet de faire le point sur votre niveau, vos objectifs, le travail que vous avez effectué ; l’équipe du Centre de Langues vous donne des conseils personnalisés en fonction des informations que vous indiquez. \n\n⚠️ | Les fiches sont obligatoires pour les heures de coaching uniquement. [Lien vers moodle](https://moodle.iut-tlse3.fr/my/) | [Tuto Vidéo](https://www.youtube.com/watch?v=e0v77FGQL-8)",
        ephemeral: true,
      });
      break;
    case "8":
      i.reply({
        content:
          "🍙 | Toutes les réservations se font sur Résacril. Aucune réservation ne sera prise sur place. [Lien vers Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/) | [Tuto Vidéo](https://www.youtube.com/watch?v=ZT_754tjVIY)",
        ephemeral: true,
      });
      break;
    case "9":
      i.reply({
        content:
          "Ces informations se trouvent sur le mail de confirmation que vous avez reçu suite à votre réservation. Vous les retrouverez aussi sur le Récap & Planning sur Résacril.",
        ephemeral: true,
      });
      break;
    case "10":
      moreHelp(i);
      break;
  }
};
/**
 * Event triggered when a user click on the "More Help" button
 * @param {Discord.ButtonInteraction} i
 */
const moreHelp = (i) => {
  // build a new formular
  const myModal = new Discord.ModalBuilder()
    .setCustomId("help_modal")
    .setTitle("Besoin d'aide ?");
  // Add a paragraph field
  const questionInput = new Discord.ActionRowBuilder().addComponents(
    new Discord.TextInputBuilder()
      .setCustomId("question_" + i.member.id)
      .setLabel("Merci d'entrer ici votre question : ")
      .setPlaceholder("ALED")
      .setRequired(true)
      .setMinLength(15)
      .setStyle(Discord.TextInputStyle.Paragraph)
  );
  // Add the paragraph field to the modal
  myModal.addComponents(questionInput);
  // Show Modal
  i.showModal(myModal);
};
/**
 * Treat the submit of the "More Help" Modal
 * @param {Discord.ModalSubmitInteraction} i
 */
const treatModal = async (i) => {
  // Get the text value of the Modal
  const question = i.fields.getTextInputValue("question_" + i.member.id);
  // Find the "Support++" role
  let support_role = i.guild.roles.cache.find(
    (role) => role.id === supportRole
  );
  // Add the Role to the member
  await i.member.roles.add(support_role);
  // Find the "Support++" channel
  let support_channel = i.guild.channels.cache.find(
    (channel) => channel.id === supportChannel
  );
  // Define the name used in the system
  let name = i.member.nickname || i.member.user.username;
  // Embed Builder sent in the support++ channel
  let embed = new Discord.EmbedBuilder()
    .setColor(MAIN_COLOR)
    .setTitle("Demande de support de  " + name)
    .setDescription("❔|  " + question)
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1018634931062190201/interopoint.png"
    )
    .addFields({ name: "ID de l'utilisateur : ", value: i.member.user.id })
    .setTimestamp();

  const row = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
      .setEmoji("✅")
      .setLabel("Demande traitée")
      .setStyle(Discord.ButtonStyle.Primary)
      .setCustomId("valid_help")
  );
  // Notify the user and the admins in the channel and send the recap' embed
  await support_channel.send({
    content: `||<@${i.member.user.id}><@${adminRole}>||`,
    embeds: [embed],
    components: [row],
  });
  // Reply to the submit
  await i.reply({
    content: "✅ | Votre question a bien été envoyée à l'assistance !",
    ephemeral: true,
  });
};
/**
 * Event triggered when an admin click on the "End Help Desk" button
 * @param {Discord.ButtonInteraction} i
 */
const validationButton = (i) => {
  // Only Admin can answer to this button
  if (!i.memberPermissions.has(Discord.PermissionFlagsBits.Administrator))
    return i.deferUpdate();
  // Get the user id stored inside the field embed value
  let userId = i.message.embeds[0].fields[0].value;
  // Build a new formular Modal for the admin to close the help desk
  const myModal = new Discord.ModalBuilder()
    .setCustomId(userId)
    .setTitle("Formulaire de fin d'assistance");
  // Add a paragraph field prefilled
  const questionInput = new Discord.ActionRowBuilder().addComponents(
    new Discord.TextInputBuilder()
      .setCustomId("end_paragraphe")
      .setLabel("Informations de fin d'assistance : ")
      .setValue(
        "✅ | Demande de support terminée \n✨ | Votre demande d'assistance à été traitée par les responsables du centre de langues. \n📧 | Vous pouvez aussi nous contacter par mail : __cril.langues@iut-tlse3.fr__"
      )
      .setRequired(true)
      .setMinLength(5)
      .setStyle(Discord.TextInputStyle.Paragraph)
  );
  // Add the paragraph field to the modal
  myModal.addComponents(questionInput);
  // Show Modal
  i.showModal(myModal);
};
/**
 * Treat the submit of the "End Help Desk" Modal
 * @param {Discord.ModalSubmitInteraction} i
 */
const treatValidation = (i) => {
  // get the userId stored inside the modal id
  let userID = i.customId;
  // Get the end text
  const answer = i.fields.getTextInputValue("end_paragraphe");
  // Find the "Support++" role
  let support_role = i.guild.roles.cache.find(
    (role) => role.id === supportRole
  );
  // Get the member
  let targetMember = i.guild.members.cache.find((m) => m.user.id === userID);
  if (!targetMember) return;
  // Remove the support role from the member
  targetMember.roles.remove(support_role);
  // Build the final embed
  let endEmbed = new Discord.EmbedBuilder()
    .setTitle("🧰 | Demande de support terminée")
    .setDescription(answer)
    .setFooter({ text: targetMember.user.username })
    .setColor(MAIN_COLOR)
    .setTimestamp();
  // Load a text variable if the bot can't send a message to the user
  let errortxt = "";
  try {
    targetMember.send({ embeds: [endEmbed] });
  } catch (err) {
    errortxt = "\n ❌ | Impossible d'envoyer le message de fin à l'utilisateur";
  }
  // Send a message the embed
  i.channel.send({ embeds: [endEmbed] });
  // Reply to the submit
  i.reply({
    content: "✅ | Votre demande a bien été traitée !" + errortxt,
    ephemeral: true,
  });
  // Edit the embed disabling the button
  const row = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
      .setEmoji("✅")
      .setCustomId("support_finish")
      .setLabel("Demande terminée")
      .setStyle(Discord.ButtonStyle.Success)
      .setDisabled(true)
  );
  // Edit
  i.message.edit({ components: [row] });
};
// ================ EXPORTS =================
exports.displayAssistance = displayAssistance;
exports.processHelpAssistance = processHelpAssistance;
exports.treatModal = treatModal;
exports.validationButton = validationButton;
exports.treatValidation = treatValidation;
