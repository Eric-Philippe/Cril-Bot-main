import {
  AttachmentBuilder,
  ButtonInteraction,
  InteractionReplyOptions,
} from "discord.js";
import Support from "./Support";
import reply from "../../utils/Interaction";

const HELP_DESK_SUFFIX = "-help-desk";

export default class Desk {
  public static async answerHelpDesk(interaction: ButtonInteraction) {
    const helpPrefix = interaction.customId.split(HELP_DESK_SUFFIX)[0];

    if (helpPrefix == "10") return Support.needMoreHelp(interaction);

    let params: InteractionReplyOptions = {};
    params.ephemeral = true;

    switch (helpPrefix) {
      case "1":
        params.content =
          '🚪 | Vous pouvez vous désinscrire directement depuis Résacril jusqu’à la veille de votre réservation [Tuto Résacril](https://www.youtube.com/watch?v=ZT_754tjVIY). Si la réservation est aujourd’hui, cliquez sur le bouton bleu avec "???" (j’ai une autre question) et remplissez le formulaire !';
        break;
      case "2":
        params.content =
          "📧 | Ecrivez un mail à cril.langues@iut-tlse3.fr en expliquant les raisons de votre absence, joignez vos justificatifs s’il y a lieu.";
        break;
      case "3":
        params.content =
          "🕛 | Le délai de validation est de maximum une semaine. Pour un Coaching, vérifiez sur [Récap & Planning sur Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/) s’il est indiqué de reprendre ou faire votre fiche, suivez les consignes, et envoyez un mail à cril.langues@iut-tlse.fr pour le signaler. Attention, une fiche en retard de plus de 10 jours ne pourra pas être validée.";
        break;
      case "4":
        params.content =
          "✅ | Merci de vérifier sur Résacril le type, l’heure, le lieu et le niveau de votre réservation et vous présenter dans le channel adéquat, en faisant attention à la catégorie – [lien Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/)";
        break;
      case "5":
        const file = new AttachmentBuilder("./docs/Support_Vocal.pdf");
        params.content = "📄 | Suivez les étapes dans ce document d’aide.";
        params.files = [file];
        break;
      case "6":
        params.content =
          "👀 | Surveillez les salons Annonces pour être au courant de l’ouverture de nouveaux créneaux ou d’éventuels désistements de dernière minute. L’information est également envoyée par mail lors de l’ouverture de nombreux créneaux, pensez à les consulter régulièrement. \n\n🕳️ | Si vous avez été dans une situation qui vous a empêché de commencer votre parcours assez tôt, prenez contact avec votre enseignant.";
        break;
      case "7":
        params.content =
          "📌 | Il s’agit d’une fiche de suivi de votre travail en coaching qui permet de faire le point sur votre niveau, vos objectifs, le travail que vous avez effectué ; l’équipe du Centre de Langues vous donne des conseils personnalisés en fonction des informations que vous indiquez. \n\n⚠️ | Les fiches sont obligatoires pour les heures de coaching uniquement. [Lien vers moodle](https://moodle.iut-tlse3.fr/my/) | [Tuto Vidéo](https://www.youtube.com/watch?v=e0v77FGQL-8)";
        break;
      case "8":
        params.content =
          "🍙 | Toutes les réservations se font sur Résacril. Aucune réservation ne sera prise sur place. [Lien vers Résacril](http://resacril.iut-tlse3.fr/etudiant/recapitulatifPlanningEtudiant/) | [Tuto Vidéo](https://www.youtube.com/watch?v=ZT_754tjVIY)";
        break;
      case "9":
        params.content =
          "Ces informations se trouvent sur le mail de confirmation que vous avez reçu suite à votre réservation. Vous les retrouverez aussi sur le Récap & Planning sur Résacril.";
        break;
    }

    reply(interaction, params);
  }
}

exports.HELP_DESK_SUFFIX = HELP_DESK_SUFFIX;
