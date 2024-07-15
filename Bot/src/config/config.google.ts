require("dotenv").config();

const {
  GOOGLE_PROJECT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_EMAIL,
  GOOGLE_CLIENT_ID,
  EMAIL,
} = process.env;

if (
  !GOOGLE_PROJECT_ID ||
  !GOOGLE_PRIVATE_KEY_ID ||
  !GOOGLE_PRIVATE_KEY ||
  !GOOGLE_EMAIL ||
  !GOOGLE_CLIENT_ID ||
  !EMAIL
) {
  let missing_variables = "";
  if (!GOOGLE_PROJECT_ID) missing_variables += "GOOGLE_PROJECT_ID ";
  if (!GOOGLE_PRIVATE_KEY_ID) missing_variables += "GOOGLE_PRIVATE_KEY_ID ";
  if (!GOOGLE_PRIVATE_KEY) missing_variables += "GOOGLE_PRIVATE_KEY ";
  if (!GOOGLE_EMAIL) missing_variables += "GOOGLE_EMAIL ";
  if (!GOOGLE_CLIENT_ID) missing_variables += "GOOGLE_CLIENpT_ID ";
  if (!EMAIL) missing_variables += "EMAIL ";
  throw new Error(`Missing environment variables: ${missing_variables}`);
}

const credentials = {
  type: "service_account",
  project_id: GOOGLE_PROJECT_ID,
  private_key_id: GOOGLE_PRIVATE_KEY_ID,
  private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: GOOGLE_EMAIL,
  client_id: GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/bot-discord-cril%40cril-spreadsheet-api.iam.gserviceaccount.com",
};

export { credentials, EMAIL };
