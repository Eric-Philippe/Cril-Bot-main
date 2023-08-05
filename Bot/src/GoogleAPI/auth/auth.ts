import { google } from "googleapis";
import { credentials } from "../../config/config.google";

const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
  undefined
);

export default auth;
