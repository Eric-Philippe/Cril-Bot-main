import { GuildMember, PermissionFlagsBits } from "discord.js";

import client from "../../client";
import { BOT_GUILD_ID } from "../../config/config.bot";
const STATUS = [
  ["$ faire des crêpes", 1],
  ["$ jouer à Uno avec $", 2],
  ["$ manger tout le chocolat", 1],
  ["$ danser la carioca avec $", 2],
  ["$ creuser toujours plus profond", 1],
  ["$ viser la lune, ça lui fait pas peur", 1],
  ["$ prendre des photos", 1],
  ["$ repeindre le plafond de la chapelle Sixtine", 1],
  ["$ trier des lentilles", 1],
  ["$ recoudre ses chaussettes", 1],
  ["$ mettre $ en bocal", 2],
  ["$ cuire des pâtes", 1],
  ["$ faire un tour en hélicoptère", 1],
  ["$ dessiner un bonhomme bâton", 1],
  ["$ sauver le monde de la folie de $", 2],
  ["$ ranger sa chambre", 1],
  ["$ faire du shopping", 1],
  ["$ apprendre à faire ses lacets", 1],
  ["$ sortir une batte de baseball", 1],
  ["$ fabriquer un robot de combat", 1],
  ["$ faire un barbecue", 1],
  ["$ et $ chercher Moodle", 2],
  ["$ expliquer à $ où est RésaCril", 2],
  ["$ compter sur ses doigts pour rédiger 5 phrases", 1],
  ["$ convaincre $ de regarder One Piece", 2],
  ["$ faire de l'escalade", 1],
  ["$ conquérir le monde avec ses acolytes $ et $", 3],
  ["$ fonder Skynet", 1],
  ["$, $ et $ chercher la terre", 3],
  ["$ consulter son aléthiomètre", 1],
  ["$ dompter un ver des sables", 1],
  ["$ lire The Last Erdane", 1],
  ["$ créer des OC memes", 1],
  ["$ construire sa propre ps5 parce que ça suffit maintenant", 1],
  ["$ ranger sa bibliothèque par couleurs", 1],
  ["$ plier son linge", 1],
  ["$ rire à la blague de $", 2],
  ["$ ne pas rire à la blague de $, en même temps elle n'était pas drôle", 2],
  ["$ chercher les dragon ball", 1],
  ["$ révéler à Luke qu'il est son fils", 1],
  ["$ monter dans la DeLorean de $", 2],
  ["$ faire de l'aqua poney", 1],
  ["$ pédaler dans la semoule", 1],
  ["$ se demander ce que $ et $ font", 3],
];

/**
 * Edit the status of the bot with personnalized users and setences randomly picked
 */
const statusEdit = async () => {
  let guild = client.guilds.cache.find((g) => g.id === BOT_GUILD_ID); // Find the Guild target
  if (!guild) return; // Error Handler

  // Pick a random sentence
  const sentence = STATUS[Math.floor(Math.random() * STATUS.length)];
  // Compte le nombre de $ dans la phrase
  // @ts-ignore
  const usersAmount = sentence[0].split("$").length - 1;
  const membersToFill: GuildMember[] = [];

  const members = await guild.members.fetch();
  for (let i = 0; i < usersAmount; i++) {
    let member: GuildMember;
    if (Math.random() < 0.85) {
      // Pick a random member with Mute Permissions
      member = members
        .filter(
          (m) =>
            m.permissions.has(PermissionFlagsBits.MuteMembers) && !m.user.bot
        )
        .random();
    } else {
      // Pick a random member who is connected
      member = members.filter((m) => !m.user.bot && m.user).random();
    }
    if (!member) continue; // Error Handler
    membersToFill.push(member);
  }

  if (membersToFill.length === 0) return statusEdit(); // Error Handler

  // Replace all the $ in the sentence by the members
  let status = sentence[0];
  for (let i = 0; i < usersAmount; i++) {
    // @ts-ignore
    status = status.replace("$", membersToFill[i].nickname);
  }

  // Set the status
  // @ts-ignore
  client.user.setActivity(status);

  setTimeout(() => {
    statusEdit();
  }, 1000 * 60 * 3);
};

export default statusEdit;
