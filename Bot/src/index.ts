import client from "./client";
import interactionCreate from "./events/interactionCreate";
import ready from "./events/ready";

ready(client);
interactionCreate(client);
