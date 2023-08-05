import { readdirSync } from "fs";
import * as path from "path";
import { ContextMenu } from "./models/ContextMenu";

/**
 * @description This file is used to load dynamically all commands from the commands folder
 */

const ContextMenuCommands: ContextMenu[] = [];

const commandsPath = path.join(__dirname, "contextmenu");
const commandFiles: string[] = [];

readdirSync(commandsPath).forEach((file) => {
  if (file.endsWith(".js") || file.endsWith(".ts")) {
    commandFiles.push(file);
  }
});

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file)).default;
  // if command has not a data property
  if (!command.data)
    console.warn(`Context Menu Command ${file} has not a data property`);
  ContextMenuCommands.push(command);
}

export default ContextMenuCommands;
