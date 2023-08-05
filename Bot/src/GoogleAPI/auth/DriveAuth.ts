import { google } from "googleapis";
import auth from "./auth";

const Drive = google.drive({ version: "v3", auth });

export default Drive;
