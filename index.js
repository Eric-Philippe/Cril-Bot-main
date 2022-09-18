const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

const { client } = require("./utils/client"); //Client object
const { TOKEN } = require("./config");

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
  /** ========== @Buttons_Interaction_Type ========== */
  if (interaction.isButton()) {
    // If the message is an embed [Poll Buttons clicked | Assistance Desk button clicked | End Assistance Desk button clicked]
    if (interaction.message.embeds[0]) {
      //
      // If the embed is recognized with the author name
      if (interaction.message.embeds[0].author) {
        // Name SONDAGE
        if (interaction.message.embeds[0].author.name == "SONDAGE") {
          pollRequest(interaction);
          interaction.deferUpdate();
          // Name Help Desk
        } else if (interaction.message.embeds[0].author.name == "Help Desk") {
          processHelpAssistance(interaction);
        }
      }
      //
      // If the embed is recognized as a toss
      if (interaction.message.embeds[0].footer) {
        if (interaction.message.embeds[0].footer.text == "Tirage au Sort") {
          tossButtonInteraction(interaction);
        }
      }

      // If the embed is recognized with a field value
      if (interaction.message.embeds[0].fields[0]) {
        // End Assistance Desk is stored with a field value of an discord user ID
        if (interaction.message.embeds[0].fields[0].value.length == 18) {
          validationButton(interaction);
        }
      }

      // If the interaction is a rollRequest
      if (interaction.customId.length == 18) {
        roleRequest(interaction);
      }
    }
  }

  /** ========== @Modal_Interaction_Type ========== */
  if (interaction.isModalSubmit()) {
    // Modal object is stored with a field value of an discord user ID
    if (interaction.customId.length == 18) {
      treatValidation(interaction);
    } else if (interaction.customId === "help_modal") {
      treatModal(interaction);
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
/** Login on token */
client.login(TOKEN);
