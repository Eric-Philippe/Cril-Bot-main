import { google } from "googleapis";
import auth from "./auth";

const Sheets = google.sheets({ version: "v4", auth });

export default Sheets;
