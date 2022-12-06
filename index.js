const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");
const { Collection, PermissionFlagsBits } = require("discord.js");

const { client } = require("./utils/client"); //Client object
const { TOKEN, themeChannel, placeChannel } = require("./config");

// ############ Reaction Update ###############
const { pollRequest } = require("./commandsPlugin/pollPlugin");
const {
  processHelpAssistance,
  treatModal,
  treatValidation,
  validationButton,
} = require("./Assistance");

const { roleRequest } = require("./commandsPlugin/rolesPlugin"); // ReactionRole Message
const { tossButtonInteraction } = require("./commandsPlugin/tossPlugin");

const OXY = require("./oxy.json");
const {
  cancelTheme,
  createTheme,
} = require("./commandsPlugin/thematiquePlugin");

/** Wake up on ready state */
client.on("ready", async () => {
  console.log(
    `%c✅ | Logged into: ${client.user.tag}`,
    "color: orange; font-weught: bold;"
  );
  const { statusEdit } = require("./utils/status");
  statusEdit();
});
/** =========== @Discord_Bot_Commands_Setup =========== */
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}
// When the bot receive an interaction
client.on("interactionCreate", async (interaction) => {
  let cid = interaction.customId;
  /** ========== @Buttons_Interaction_Type ========== */
  if (interaction.isButton()) {
    // Check if the interaction has happened in a DM
    if (!interaction.channel || interaction.channel.type === 1) {
      if (interaction.customId === "add" && OXY.OXY[interaction.user.id]) {
        OXY.OXY[interaction.user.id].push(new Date());
        fs.writeFileSync("./oxy.json", JSON.stringify(OXY, null, 2));
        interaction.reply({
          content: "Vous avez compté un item !",
          ephemeral: true,
        });
      }
    }
    switch (true) {
      case cid.match(/^\d(?:-poll-answer)/gm) !== null:
        pollRequest(interaction);
        interaction.deferUpdate();
        break;
      case cid.match(/^\d(?:-toss-answer)/gm) !== null:
        tossButtonInteraction(interaction);
        break;
      case cid.match(/^\d|10(?:-help-desk)/gm) !== null && cid.length != 18:
        processHelpAssistance(interaction);
        break;
      case cid === "valid_help":
        validationButton(interaction);
        break;
      case cid === "create-theme":
        createTheme(interaction);
        break;
      case cid === "cancel-theme":
        cancelTheme(interaction);
        break;
      case cid.length === 18:
        roleRequest(interaction);
        break;
    }
  }

  /** ========== @Modal_Interaction_Type ========== */
  if (interaction.isModalSubmit()) {
    switch (true) {
      case cid.length >= 18:
        treatValidation(interaction);
        break;
      case cid === "help_modal":
        treatModal(interaction);
        break;
    }
  }

  /** ========== @Slash_Command_Interaction_Type ========== */
  if (!interaction.isChatInputCommand()) return;
  // Commmand Interaction Type
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Une erreur s'est produite durant la commande !",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", (msg) => {
  if (
    msg.channel.id === placeChannel &&
    !msg.member.permissions.has(PermissionFlagsBits.Administrator)
  ) {
    msg.delete();
  }
  if (
    msg.channel.id === themeChannel &&
    !msg.member.permissions.has(PermissionFlagsBits.Administrator)
  ) {
    msg.delete();
    msg.channel
      .send(
        'Désirez-vous proposer un thème ? Utilisez ici même la commande /thematique "Titre de votre thème" !'
      )
      .then((m) => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      });
  }
});
/** Login on token */
client.login(TOKEN);
