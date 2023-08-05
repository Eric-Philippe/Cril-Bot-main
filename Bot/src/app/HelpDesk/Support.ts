import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
  GuildMember,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { ModalId } from "../../res/ModalID";
import {
  CHAN_SUPPORTPP,
  ROLE_ADMIN,
  ROLE_SUPPORTPP,
} from "../../config/config.guild";
import { Colors } from "../../middlewares/Messages/Colors";
import { ButtonId } from "../../res/ButtonID";

export default class Support {
  public static async needMoreHelp(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId(ModalId.HELP_MODAL)
      .setTitle("Besoin d'aide ?");
    // Add a paragraph field
    const questionInput =
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("question_" + interaction.member.user.id)
          .setLabel("Merci d'entrer ici votre question : ")
          .setPlaceholder("ALED")
          .setRequired(true)
          .setMinLength(15)
          .setStyle(TextInputStyle.Paragraph)
      );
    // Add the paragraph field to the modal
    modal.addComponents(questionInput);
    // Show Modal
    interaction.showModal(modal);
  }

  public static async needMoreHelpModalSubmit(i: ModalSubmitInteraction) {
    // Get the text value of the Modal
    const question = i.fields.getTextInputValue("question_" + i.member.user.id);
    // Find the "Support++" role
    let supportRole = i.guild.roles.cache.find(
      (role) => role.id === ROLE_SUPPORTPP
    );
    // Add the Role to the member
    const member = i.member as GuildMember;
    await member.roles.add(supportRole);
    // Find the "Support++" channel
    let supportChannel = i.guild.channels.cache.find(
      (channel) => channel.id === CHAN_SUPPORTPP
    ) as TextChannel;
    // Define the name used in the system
    let name = member.nickname || i.member.user.username;
    // Embed Builder sent in the support++ channel
    let embed = new EmbedBuilder()
      .setColor(Colors.PURPLE)
      .setTitle("Demande de support de  " + name)
      .setDescription("❔|  " + question)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/814908646138970122/1018634931062190201/interopoint.png"
      )
      .addFields({ name: "ID de l'utilisateur : ", value: i.member.user.id })
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setEmoji("✅")
        .setLabel("Demande traitée")
        .setStyle(ButtonStyle.Primary)
        .setCustomId(ButtonId.END_SUPPORT)
    );

    await supportChannel.send({
      content: `||<@${i.member.user.id}><@&${ROLE_ADMIN}>||`,
      embeds: [embed],
      components: [row],
    });
    // Reply to the submit
    await i.reply({
      content: "✅ | Votre question a bien été envoyée à l'assistance !",
      ephemeral: true,
    });
  }

  public static validationButton = (i: ButtonInteraction) => {
    // Only Admin can answer to this button
    if (!i.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      i.deferUpdate();
      return;
    }
    // Get the user id stored inside the field embed value
    let userId = i.message.embeds[0].fields[0].value;
    // Build a new formular Modal for the admin to close the help desk
    const myModal = new ModalBuilder()
      .setCustomId("validation_" + userId)
      .setTitle("Formulaire de fin d'assistance");
    // Add a paragraph field prefilled
    const questionInput =
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("end_paragraphe")
          .setLabel("Informations de fin d'assistance : ")
          .setValue(
            "✅ | Demande de support terminée \n✨ | Votre demande d'assistance à été traitée par les responsables du centre de langues. \n📧 | Vous pouvez aussi nous contacter par mail : __cril.langues@iut-tlse3.fr__"
          )
          .setRequired(true)
          .setMinLength(5)
          .setStyle(TextInputStyle.Paragraph)
      );
    // Add the paragraph field to the modal
    myModal.addComponents(questionInput);
    // Show Modal
    i.showModal(myModal);
  };

  public static treatValidation = (i: ModalSubmitInteraction) => {
    // get the userId stored inside the modal id
    let userID = i.customId.split("_")[1];
    // Get the end text
    const answer = i.fields.getTextInputValue("end_paragraphe");
    // Find the "Support++" role
    let support_role = i.guild.roles.cache.find(
      (role) => role.id === ROLE_SUPPORTPP
    );
    // Get the member
    let targetMember = i.guild.members.cache.find((m) => m.user.id === userID);
    if (!targetMember) return;
    // Remove the support role from the member
    targetMember.roles.remove(support_role);
    // Build the final embed
    let endEmbed = new EmbedBuilder()
      .setTitle("🧰 | Demande de support terminée")
      .setDescription(answer)
      .setFooter({ text: targetMember.user.username })
      .setColor(Colors.GREEN)
      .setTimestamp();
    // Load a text variable if the bot can't send a message to the user
    let errortxt = "";
    try {
      targetMember.send({ embeds: [endEmbed] });
    } catch (err) {
      errortxt =
        "\n ❌ | Impossible d'envoyer le message de fin à l'utilisateur";
    }
    // Send a message the embed
    i.channel.send({ embeds: [endEmbed] });
    // Reply to the submit
    i.reply({
      content: "✅ | Votre demande a bien été traitée !" + errortxt,
      ephemeral: true,
    });
    // Edit the embed disabling the button
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setEmoji("✅")
        .setCustomId("support_finish")
        .setLabel("Demande terminée")
        .setStyle(ButtonStyle.Success)
        .setDisabled(true)
    );
    // Edit
    i.message.edit({ components: [row] });
  };
}
