const { REST, Routes } = require("discord.js");
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "build/commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;
    if ("data" in command && "run" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`
      );
    }
  }
}

const contextMenu = [];

// Grab all the command files from the commands directory you created earlier
const foldersPathCtx = path.join(__dirname, "build/contextmenu");
const commandFoldersCtx = fs.readdirSync(foldersPathCtx);

// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(foldersPathCtx);
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath).default;
  if ("data" in command && "run" in command) {
    contextMenu.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`
    );
  }
}

commands.push(...contextMenu);

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_ID,
        process.env.BOT_GUILD_ID
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }

  // Exit the process when you're done refreshing commands
  process.exit();
})();
