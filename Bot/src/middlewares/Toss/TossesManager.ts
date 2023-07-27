import {
  ButtonInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { AppDataSource } from "../../data-source";
import { TossParticipants } from "../../entities/TossParticipants";
import { TossState } from "../../entities/TossState";
import { TossStates } from "./TossStates.enum";
import Messages from "../Messages/Messages";
import { Colors } from "../Messages/Colors";

export class TossesManager {
  public static async newParticipation(
    interaction: ButtonInteraction,
    msgId: string,
    userId: string
  ) {
    const state = await TossesManager.newParticipant(msgId, userId);

    switch (state) {
      case -1:
        return Messages.sendError(
          interaction,
          "Une erreur est survenue",
          null,
          true
        );
      case 0:
        await Messages.sendSuccess(
          interaction,
          "Vous participez au tirage au sort !",
          null,
          true
        );
        break;
      case 1:
        await Messages.sendSuccess(
          interaction,
          "Vous ne participez plus au tirage au sort !",
          null,
          true
        );
        break;
      case 2:
        return Messages.sendWarning(
          interaction,
          "Le tirage au sort est terminé !",
          null,
          true
        );
      case 3:
        return Messages.sendWarning(
          interaction,
          "Le tirage au sort n'existe pas/plus !",
          null,
          true
        );
    }

    let oldEmbed = await interaction.message.embeds[0];
    let oldDescription = oldEmbed.description.split("\n\n")[0];
    oldDescription =
      oldDescription +
      "\n\n" +
      "🗳️" +
      ` **${await this.getParticipantSize(msgId)} participant(s)**`;

    const newEmbed = new EmbedBuilder()
      .setTitle(oldEmbed.title)
      .setDescription(oldDescription)
      .setFooter(oldEmbed.footer)
      .setColor(Colors.BLUE_TOSS)
      .setTimestamp();

    await interaction.message.edit({ embeds: [newEmbed] });
  }

  public static async endToss(
    interaction: ButtonInteraction,
    msgId: string
  ): Promise<void> {
    let it = interaction as any;
    if (!it.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return Messages.sendError(
        interaction,
        "Vous n'avez pas la permission d'effectuer cette action !",
        null,
        true
      );
    }

    const state = await TossesManager.endTossStatus(msgId);

    switch (state) {
      case -1:
        return Messages.sendError(
          interaction,
          "Une erreur est survenue",
          null,
          true
        );
      case 1:
        return Messages.sendWarning(
          interaction,
          "Le tirage au sort est déjà terminé !",
          null,
          true
        );
      case 2:
        return Messages.sendWarning(
          interaction,
          "Le tirage au sort n'existe pas/plus !",
          null,
          true
        );
    }

    let winnerUser = await TossesManager.tossOne(msgId);
    if (winnerUser == null)
      interaction.reply({
        content: "Aucun participant n'a été trouvé",
        ephemeral: true,
      });

    const winnerEmbed = new EmbedBuilder()
      .setTitle("🎉 Tirage au sort - Vainqueur :")
      .setDescription(`🎁 <@${winnerUser}> 🎁 !`)
      .setColor(Colors.GREEN)
      .setFooter({
        text: "Contactez un membre du staff pour récupérer votre lot !",
      });

    interaction.reply({ embeds: [winnerEmbed] });
  }

  public static async getParticipantSize(msgId: string): Promise<number> {
    try {
      const tossParticipantRepo = AppDataSource.getRepository(TossParticipants);

      const tossParticipants = await tossParticipantRepo.findBy({
        msgid: msgId,
      });

      return tossParticipants.length;
    } catch (e) {
      return -1;
    }
  }

  public static async endTossStatus(msgId: string): Promise<number> {
    try {
      const state = await this.getTossStatus(msgId);
      if (state == null) return 2;
      if (state.etat == TossStates.ENDED) return 1;

      TossesManager.endTossStatusDB(msgId);
      return 0;
    } catch (e) {
      return -1;
    }
  }

  /**
   *
   * @param msgId
   * @param userId
   * @returns -1: error, 0: created, 1: removed, 2: ended, 3: inexistant
   */
  private static async newParticipant(
    msgId: string,
    userId: string
  ): Promise<number> {
    try {
      const tossParticipantRepo = AppDataSource.getRepository(TossParticipants);

      const state = await this.getTossStatus(msgId);
      if (state == null) return 3;
      if (state.etat == TossStates.ENDED) return 2;

      const tossParticipant = await tossParticipantRepo.findOneBy({
        msgid: msgId,
        userid: userId,
      });

      if (tossParticipant != null) {
        this.removeTossParticipant(msgId, userId);
        return 1;
      } else {
        this.createTossParticipant(msgId, userId);
        return 0;
      }
    } catch (e) {
      return -1;
    }
  }

  public static async createTossStatus(msgId: string): Promise<number> {
    try {
      const repo = AppDataSource.getRepository(TossState);
      const tossState = new TossState();
      tossState.msgid = msgId;
      tossState.etat = TossStates.STARTED;

      await repo.save(tossState);
      return 0;
    } catch (e) {
      return -1;
    }
  }

  public static async endTossStatusDB(msgId: string): Promise<number> {
    try {
      const repo = AppDataSource.getRepository(TossState);
      const tossState = await repo.findOneBy({ msgid: msgId });
      tossState.etat = TossStates.ENDED;

      await repo.save(tossState);
      return 0;
    } catch (e) {
      return -1;
    }
  }

  public static async getTossStatus(msgId: string): Promise<TossState> {
    try {
      const repo = AppDataSource.getRepository(TossState);
      const tossState = await repo.findOneBy({ msgid: msgId });
      return tossState;
    } catch (e) {
      return null;
    }
  }

  public static async createTossParticipant(
    msgId: string,
    userId: string
  ): Promise<number> {
    try {
      const repo = AppDataSource.getRepository(TossParticipants);
      const toss = new TossParticipants();
      toss.msgid = msgId;
      toss.userid = userId;

      await repo.save(toss);
      return 0;
    } catch (e) {
      return -1;
    }
  }

  public static async tossOne(msgId: string): Promise<string> {
    try {
      const repo = AppDataSource.getRepository(TossParticipants);
      const toss = await repo.findBy({ msgid: msgId });
      const random = Math.floor(Math.random() * toss.length);
      return toss[random].userid;
    } catch (e) {
      return null;
    }
  }

  public static async removeTossParticipant(
    msgId: string,
    userId: string
  ): Promise<number> {
    try {
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(TossParticipants)
        .where("msgid = :msgid AND userid = :userid", {
          msgid: msgId,
          userid: userId,
        })
        .execute();
    } catch (e) {
      return -1;
    }
  }

  public static async hasParticipated(
    msgId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const repo = AppDataSource.getRepository(TossParticipants);
      const toss = await repo.findOneBy({ msgid: msgId, userid: userId });
      return toss != null;
    } catch (e) {
      return false;
    }
  }
}
