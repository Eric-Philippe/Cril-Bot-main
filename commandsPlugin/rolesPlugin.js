const {
  ButtonInteraction,
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

const { themedRoles } = require("../config");

const MAIN_COLOR = "#048B9A"; // Main color for the embeds System
/**
 *
 * @param {Message} m
 */
const rolesButtonsDisplay = (m) => {
  let embedInstruction = new EmbedBuilder()
    .setColor(MAIN_COLOR)
    .setTitle("🎭 Roles 🎭")
    .setDescription(
      "⚙️ | Cliquez sur la ou les emotes des catégories qui vous intéressent pour vous attribuer un rôle. Quand des activités thématiques concernant ce rôle seront mises en ligne, vous serez prévenus par notification pour vous en faciliter l'accès"
    )
    .setAuthor({ name: "Roles" });

  let embedRoles = new EmbedBuilder()
    .setColor(MAIN_COLOR)
    .setTitle("🎭 Roles Picker 🎭")
    .setAuthor({ name: "Roles Picker" })
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/814908646138970122/1019143367675887627/unknown.png"
    );
  let desc = "";

  for (let i = 0; i < themedRoles.length; i++) {
    desc += `${themedRoles[i][1]} | <@&${themedRoles[i][0]}> \n\n`;
  }

  embedRoles.setDescription(desc);

  const row = new ActionRowBuilder();

  for (let i = 0; i < themedRoles.length; i++) {
    row.addComponents(
      new ButtonBuilder()
        .setEmoji(themedRoles[i][1])
        .setStyle(ButtonStyle.Primary)
        .setCustomId(themedRoles[i][0])
    );
  }

  m.channel.send({ embeds: [embedInstruction, embedRoles], components: [row] });
};

/**
 * Processing the roles request
 * @param {ButtonInteraction} i
 */
const roleRequest = (i) => {
  let member = i.member;
  let role = i.guild.roles.cache.get(i.customId);
  if (!role) return;
  if (member.roles.cache.has(role.id)) {
    member.roles.remove(role);
    i.reply({ content: "✅ | Role retiré avec succès !", ephemeral: true });
  } else {
    member.roles.add(role);
    i.reply({ content: "✅ | Role ajouté avec succès !", ephemeral: true });
  }
};

exports.rolesButtonsDisplay = rolesButtonsDisplay;
exports.roleRequest = roleRequest;
