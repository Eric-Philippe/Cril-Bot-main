import { google } from "googleapis";
import { credentials } from "../config/config.google";

async function listGoogleDriveFiles() {
  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ["https://www.googleapis.com/auth/drive"],
    undefined
  );

  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.list({
      fields: "files(id, name)",
    });

    const files = response.data.files;
    if (files && files.length) {
      console.log("Files in Google Drive:");
      files.forEach((file: any) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log("No files found in Google Drive.");
    }
  } catch (err) {
    console.error("Error retrieving files:", err.message);
  }

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1KtSgNFxDswlme7J_oCz-r0iVT-eJ9yfS_NHogCj_32s",
      range: "A1:D5",
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      console.log("Rows in Google Spreadsheet:");
      rows.forEach((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`);
      });
    } else {
      console.log("No data found in Google Spreadsheet.");
    }
  } catch (err) {
    console.error("Error retrieving data:", err.message);
  }
}

listGoogleDriveFiles();
