const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ThreadAutoArchiveDuration,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { themeChannel, adminRole } = require("../config");

module.exports = {
  desc: {
    desc: "Lance une nouvelle proposition de thème CRIL.",
    emote: "🌱",
    exemple: [
      {
        cmd: "/thematique Cards Against Humanity",
        desc: 'Lance un nouveau thread avec le nom "Cards Against Humanity" pour proposer cette idée d\'activité !',
      },
    ],
    usage: "/thematique [nom du thème]",
  },
  data: new SlashCommandBuilder()
    .setName("thematique")
    .setDescription("Lance une nouvelle proposition de thème CRIL.")
    .addStringOption((option) =>
      option
        .setName("titre")
        .setDescription("Titre du thème")
        .setMinLength(3)
        .setMaxLength(35)
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.channel.id != themeChannel)
      return interaction.reply({
        content: `Cette commande n'est utilisable que dans le channel <#${themeChannel}> !`,
        ephemeral: true,
      });

    let theme = interaction.options.getString("titre");

    let username = interaction.member.nickname || interaction.user.username;

    let thread = await interaction.channel.threads.create({
      name: `${theme} - ${username} - Theme`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
      reason: `${interaction.user.username} proposed the theme ${theme}`,
    });

    await thread.members.add(interaction.user.id);

    let embed = new EmbedBuilder()
      .setTitle("🌱 Nouvelle proposition de thème ! 🌱")
      .setDescription(
        `${username} vient de proposer le thème suivant : ${theme} ! \nProfitez de ce channel pour discuter des modalités de ce dernier, puis une fois que tout le monde est d'accord, il suffit de cliquer sur le bouton "Créer" en vert et entrer les différents champs correctement ! \nVous pouvez également annuler le tout avec le bouton correspondant.`
      )
      .setColor("Green")
      .setFooter({
        text: `Demandé par ${username}`,
        iconURL: interaction.user.avatarURL(),
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("create-theme")
        .setLabel("Créer")
        .setStyle(ButtonStyle.Success)
        .setEmoji("🌴"),

      new ButtonBuilder()
        .setCustomId("cancel-theme")
        .setLabel("Annuler")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("☢️")
    );

    let welcomeMsg = await thread.send({
      content: `<@${interaction.user.id}> | <@&${adminRole}>`,
      embeds: [embed],
      components: [row],
    });

    thread.messages.pin(welcomeMsg.id);

    interaction.reply({
      content: `Votre proposition a correctement été prise en compte ! \n Dirigez vous sur le thread <#${thread.id}>`,
      ephemeral: true,
    });

    //
  },
};
