import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  ModalBuilder,
  ModalSubmitInteraction,
  Role,
  TextInputBuilder,
  TextInputStyle,
  ThreadChannel,
} from "discord.js";
import CoolDownManager from "../../utils/CoolDown";
import Logger from "../../logger/Logger";
import { ModalId } from "../../res/ModalID";
import Messages from "../../middlewares/Messages/Messages";
import { Colors } from "../../middlewares/Messages/Colors";
import { ButtonId } from "../../res/ButtonID";
import { firstLetterUppercase, removeAccents } from "../../utils/String";
import {
  GUILD_SUPPORT_C_ID,
  INVITE_ROLE,
  INVITE_TEMP_ROLE,
  ROLE_DEF,
  TEACHER_ROLE,
  TEACHER_TEMP_ROLE,
  TEMP_ROLES_ID_WITH_PERM,
  TUTOR_ROLE,
  TUTOR_TEMP_ROLE,
} from "../../config/config.guild";
import { CODE_INVITE, CODE_TEACHER, CODE_TUTOR } from "../../config/config.bot";

/**
 * @unstable
 * @see https://github.com/discordjs/discord-api-types/blob/main/payloads/v10/guild.ts#L692"
 */
const hasFinishedOnboardingFlags = [
  "CompletedOnboarding",
  "StartedOnboarding",
  "StartedHomeActions",
  "CompletedHomeActions",
];

/**
 * Class to manage the entry system for the guild
 *
 */
export default class Entry {
  public static CATEGORY_COOLDOWN = "ENTRY";
  public static ENTRY_COOLDOWN = 1000 * 60 * 30; // 30 minutes

  private member: GuildMember;
  private userId: string;

  private threadChannel: ThreadChannel;
  /**
   * @Step 1.
   * @DATA
   * Create a new entry for a member
   * Main use is to start the cooldown and create the thread channel while being able to clean everything
   * @param member {GuildMember}
   */
  constructor(member: GuildMember) {
    this.member = member;
    this.userId = member.id;

    CoolDownManager.startCooldDown(
      this.userId,
      Entry.ENTRY_COOLDOWN,
      this.cooldownCallback.bind(this),
      Entry.CATEGORY_COOLDOWN
    );
  }

  /**
   * @Step 2.
   * @DATA
   * Init the entry system when the user click on the start button
   * Allow to filter the user who can start the entry system -Only to new members-
   * @param i {ButtonInteraction} The interaction
   * @param member {GuildMember} The member who clicked on the button
   */
  public static async init(i: ButtonInteraction, member: GuildMember) {
    const userFlags = member.flags.toArray() as string[];
    let hasFinishedOnboarding = true;
    for (const flag of hasFinishedOnboardingFlags) {
      if (!userFlags.includes(flag)) hasFinishedOnboarding = false;
    }

    let hasNotTempRole = Entry.getDefRole(member) === null;

    if (!hasFinishedOnboarding) {
      const embed = Messages.buildEmbed(
        "Merci de terminer les étapes décrites dans <id:guide> avant de passer à la suite",
        "⏸️ | Pas si vite !",
        Colors.RED
      );

      Messages.sendInteraction(i, embed, null, null, true);
    } else if (!hasNotTempRole) {
      const embed = Messages.buildEmbed(
        `Vous avez déjà fait cette étape. \n\nSi vous avez besoin d'aide pour trouver où aller, consultez la documentation dans <id:guide>, rendez-vous dans le channel <#${GUILD_SUPPORT_C_ID}> ou écrivez un mail à cril.langues@iut-tlse3.fr`,
        "🛑 | Stop",
        Colors.RED
      );

      Messages.sendInteraction(i, embed, null, null, true);
    } else this.renameIHM(i);
  }

  /**
   * @Step 3.0
   * @IHM
   * Show the rename modal to the user
   * @param interaction {ButtonInteraction} The interaction
   */
  private static async renameIHM(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId(ModalId.ENTRY_RENAME)
      .setTitle("📋 Merci d'entrer les champs suivants : ");

    const firstName = new TextInputBuilder()
      .setCustomId(ModalId.FIRSTNAME)
      .setLabel("Prénom 📇")
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(10)
      .setRequired(true)
      .setPlaceholder("Prénom");

    const lastName = new TextInputBuilder()
      .setCustomId(ModalId.LASTNAME)
      .setLabel("Nom")
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(20)
      .setRequired(true)
      .setPlaceholder("Nom de famille");

    const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      firstName
    );
    const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      lastName
    );

    modal.addComponents(firstRow, secondRow);

    await interaction.showModal(modal);
  }

  /**
   * @Step 3.2
   * @DATA
   * Show the rename modal to the user
   * @param interaction {ButtonInteraction} The interaction
   */
  public static async renameData(interaction: ModalSubmitInteraction) {
    const firstname = removeAccents(
      interaction.fields.getTextInputValue(ModalId.FIRSTNAME)
    );
    const lastname = removeAccents(
      interaction.fields.getTextInputValue(ModalId.LASTNAME)
    );

    const member = interaction.member as GuildMember;
    try {
      if (member.manageable) {
        await member.setNickname(
          `${firstLetterUppercase(firstname)} ${lastname.toUpperCase()}`
        );
      }
    } catch (e) {}

    const mainTempRole = Entry.getTempRole(member);
    if (!mainTempRole) return;

    if (TEMP_ROLES_ID_WITH_PERM.includes(mainTempRole.id)) {
      await Entry.askCodeIHM(interaction, mainTempRole);
    }
  }

  /**
   * @Step 4.1
   * @DATA
   * SHow the embed asking the code verification for the special role
   * @param interaction
   * @param mainTempRole
   */
  private static async askCodeIHM(
    interaction: ModalSubmitInteraction,
    mainTempRole: Role
  ) {
    let role;
    switch (mainTempRole.id) {
      case TEACHER_TEMP_ROLE:
        role = "Enseignant";
        break;
      case TUTOR_TEMP_ROLE:
        role = "Tuteur";
        break;
      case INVITE_TEMP_ROLE:
        role = "Invité";
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle("🔑  Confirmez votre statut : ")
      .setDescription(
        `Vous avez sélectionné le rôle **${mainTempRole}** \n\nAfin de confirmer votre statut, cliquez sur le bouton ci-dessous pour envoyer votre code ${role} donné par les responsables du CL.`
      )
      .setColor("#66c9ed")
      .setFooter({
        text: "cril.langues@iut-tlse3.fr",
      });

    const buttonLaunchModal = new ButtonBuilder()
      .setCustomId(ButtonId.LAUNCH_CODE_MODAL)
      .setLabel("Entrer mon code")
      .setStyle(ButtonStyle.Success)
      .setEmoji("🔑");

    const buttonCancel = new ButtonBuilder()
      .setCustomId(ButtonId.DONT_HAVE_CODE)
      .setLabel("Je n'ai pas de code")
      .setStyle(ButtonStyle.Danger)
      .setEmoji("❌");

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      buttonLaunchModal,
      buttonCancel
    );

    interaction.reply({
      embeds: [embed],
      components: [actionRow],
      ephemeral: true,
    });
  }

  /**
   * @Step 4.2.1
   * @IHM
   * Show the code modal to the user
   * @param interaction
   */
  public static async askCodeModalIHM(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId(ModalId.CODE_SUBMIT)
      .setTitle("🔑 Merci d'entrer votre code : ");

    const code = new TextInputBuilder()
      .setCustomId(ModalId.ENTRY_CODE)
      .setLabel("Code 🔑")
      .setStyle(TextInputStyle.Short)
      .setMinLength(2)
      .setMaxLength(10)
      .setRequired(true)
      .setPlaceholder("Code");

    const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      code
    );

    modal.addComponents(firstRow);

    interaction.showModal(modal);
  }

  /**
   * @Step 4.2.2
   * @param interaction {ModalSubmitInteraction} The interaction
   */
  public static async askCodeCancelIHM(interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setTitle("⚠️ Pas de code !")
      .setDescription(
        "Contactez les responsables du centre de langues  afin d’obtenir un code : cril.langues@iut-tlse3.fr. \n\nVous serez expulsé dans 5 min et pourrez recommencer ensuite depuis le début."
      )
      .setFooter({
        text: "Si vous vous étiez trompé de statut, merci de choisir différemment lors de votre prochaine tentative.",
      })
      .setColor(Colors.RED);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });

    setTimeout(() => {
      try {
        const member = interaction.member as GuildMember;
        member.kick("No code");
      } catch (e) {}
    }, 1000 * 60 * 5); // 5 min
  }

  public static async askCodeData(interaction: ModalSubmitInteraction) {
    let mainTempRole = Entry.getTempRole(interaction.member as GuildMember);
    if (!mainTempRole) return;

    let code;
    switch (mainTempRole.id) {
      case TEACHER_TEMP_ROLE:
        code = CODE_TEACHER;
        break;
      case TUTOR_TEMP_ROLE:
        code = CODE_TUTOR;
        break;
      case INVITE_TEMP_ROLE:
        code = CODE_INVITE;
        break;
    }

    const inputCode = interaction.fields.getTextInputValue(ModalId.ENTRY_CODE);
    if (inputCode !== code) {
      Messages.sendError(
        interaction,
        "Mauvaise saisie ! Veuillez réessayer.",
        null,
        true
      );
    } else {
      let definitiveRoleId;
      switch (mainTempRole.id) {
        case TEACHER_TEMP_ROLE:
          definitiveRoleId = TEACHER_ROLE;
          break;
        case TUTOR_TEMP_ROLE:
          definitiveRoleId = TUTOR_ROLE;
          break;
        case INVITE_TEMP_ROLE:
          definitiveRoleId = INVITE_ROLE;
          break;
      }

      const definitiveRole =
        interaction.guild.roles.cache.get(definitiveRoleId);

      if (!definitiveRole) return;

      const member = interaction.member as GuildMember;

      try {
        await member.roles.add(definitiveRole);
        await member.roles.remove(mainTempRole);
        Messages.sendSuccess(
          interaction,
          `Parfait! \n\nVous avez accès au serveur. \n\nEn cas de problème d'utilisation, consultez la documentation dans <id:guide>, rendez-vous dans le channel <#${GUILD_SUPPORT_C_ID}> ou écrivez un mail à cril.langues@iut-tlse3.fr.`,
          null,
          true
        );
      } catch (e) {}
    }
  }

  /**
   * @InnerClass
   * @Tools
   */
  private async clean() {
    CoolDownManager.eagerStop(this.userId, Entry.CATEGORY_COOLDOWN);
    try {
      if (this.threadChannel) await this.threadChannel.delete();
    } catch (e) {}
  }

  /**
   * @InnerClass
   * @Tools
   */
  private cooldownCallback() {
    try {
      Logger.logEntry(this.userId, "KICK après 30 minutes d'inactivité");
      this.clean();
      this.member.kick("30 minutes d'inactivité");
    } catch (e) {}
  }

  /**
   * @InnerClass
   * @Tools
   */
  private static getTempRole(member: GuildMember) {
    const memberRoles = member.roles.cache.map((role) => role);
    for (const role of memberRoles) {
      if (TEMP_ROLES_ID_WITH_PERM.includes(role.id)) {
        return role;
      }
    }
  }

  /**
   * @InnerClass
   * @Tools
   */
  private static getDefRole(member: GuildMember) {
    const memberRoles = member.roles.cache.map((role) => role);
    for (const role of memberRoles) {
      if (ROLE_DEF.includes(role.id)) {
        return role;
      }
    }
  }

  /**
   * @InnerClass
   * For the first time, create the mother message, this method isn't used at all when the message has been sent once
   * @deprecated
   * @param i
   */
  public static async createMotherMessage(i: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle("👋 | Bienvenue")
      .setDescription(
        "Bonjour, bienvenue sur le serveur Discord du Centre de Langues. Nous allons commencer par enregistrer vos nom et prénom. \n\nCliquez sur le bouton **📋 Commencer** quand vous êtes prêt."
      )
      .setColor("#66c9ed")
      .setFooter({
        text: " cril.langues@iut-tlse3.fr",
        iconURL: i.guild.iconURL(),
      });

    const startButton = new ButtonBuilder()
      .setCustomId(ButtonId.ENTRY_RENAME)
      .setLabel("Commencer")
      .setEmoji("📋")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      startButton
    );

    await i.channel.send({
      embeds: [embed],
      components: [row],
    });
  }
}
