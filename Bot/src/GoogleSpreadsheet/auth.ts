import { google } from "googleapis";
import { credentials } from "../config/config.google";

const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ["https://www.googleapis.com/auth/drive.readonly"],
  undefined
);

export default auth;
