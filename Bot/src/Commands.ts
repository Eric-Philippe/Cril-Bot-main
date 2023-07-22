import { readdirSync } from "fs";
import * as path from "path";

import { Command } from "./Command";

/**
 * @description This file is used to load dynamically all commands from the commands folder
 */

const Commands: Command[] = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles: string[] = [];

for (const folder of readdirSync(commandsPath)) {
  const folderPath = path.join(commandsPath, folder);
  if (!folder.endsWith(".js") && !folder.endsWith(".ts")) {
    for (const file of readdirSync(folderPath)) {
      if (file.endsWith(".js") || file.endsWith(".ts")) {
        commandFiles.push(path.join(folder, file));
      }
    }
  } else {
    commandFiles.push(folder);
  }
}

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file)).default;
  // if command has not a data property
  if (!command.data) console.warn(`Command ${file} has not a data property`);
  Commands.push(command);
}

export default Commands;
