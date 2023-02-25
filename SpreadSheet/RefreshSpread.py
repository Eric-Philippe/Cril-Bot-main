import datetime
import json
import os

from google.oauth2.credentials import Credentials
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.auth.transport.requests import Request

# Constants
CLIENT_SECRET_FILE = 'credentials.json'
API_NAME = 'sheets'
API_VERSION = 'v4'
SCOPES_SHEETS = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SCOPES_DRIVE = ['https://www.googleapis.com/auth/drive.readonly']
SERVICE_ACCOUNT_FILE = 'drive.json'

def get_sheets_service():
    # Create or get credentials
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES_SHEETS)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    # Build the service object
    service = build(API_NAME, API_VERSION, credentials=creds)

    return service

def get_drive_service():
    # Build the service account credentials
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES_DRIVE)

    # Build the Drive API client
    drive_service = build('drive', 'v3', credentials=creds)

    return drive_service

def get_last_sheet_id():
    # Make a call to list the sheets in the drive
    drive_service = get_drive_service()
    results = drive_service.files().list(
        q="mimeType='application/vnd.google-apps.spreadsheet'",
        fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])

    # Get the id of the last sheet in the drive
    if items:
        last_sheet_id = items[-1]['id']
        print('Last sheet ID: %s' % last_sheet_id)
        return last_sheet_id
    else:
        print('No sheets found in the drive.')
        return None

def read_spreadsheet_values(spreadsheet_id, range_name, save_to_file=True):
    # Call the Sheets API
    sheets_service = get_sheets_service()
    result = sheets_service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_name).execute()
    values = result.get('values', [])

# Build an array of objects
    # Remember the last object if empty
    objects = []
    last_type = values[0][0]
    last_activity = values[0][1]
    last_time = values[0][2]
    last_language = values[0][3]
    for row in values:
        if row[0] == '':
            row[0] = last_type
        else:
            last_type = row[0]
        if row[1] == '':
            row[1] = last_activity
        else:
            last_activity = row[1]
        if row[2] == '':
            row[2] = last_time
        else:
            last_time = row[2]
        if row[3] == '':
            row[3] = last_language
        else:
            last_language = row[3]
       
        objects.append(row)

    if not save_to_file : print(objects)
    else:
        # Check if activities.json exists
        if os.path.exists('activities.json'):
            # Read the file
            with open('activities.json', 'r') as f:
                data = json.load(f)
            # Add the new objects to the file "currently = {}"
            data[get_title(spreadsheet_id)] = objects
            # Write the file
            with open('activities.json', 'w') as f:
                json.dump(data, f)

        else:
            # Write the file
            with open('activities.json', 'w') as f:
                json.dump(objects, f)

def is_today_id(spreadsheet_id):
    # Call the Sheets API
    sheets_service = get_sheets_service()
    result = sheets_service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    properties = result.get('properties', [])
    title = properties.get('title', [])
    # Title = DDMMYYYY
    todayDay = datetime.datetime.today().strftime('%d')
    todayMonth = datetime.datetime.today().strftime('%m')
    todayYear = datetime.datetime.today().strftime('%Y')
    today = todayDay + todayMonth + todayYear
    return title == today

def get_title(spreadsheet_id):
    # Call the Sheets API
    sheets_service = get_sheets_service()
    result = sheets_service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    properties = result.get('properties', [])
    title = properties.get('title', [])
    return title

# Main function
if __name__ == '__main__':
    # Get the id of the last sheet in the drive
    last_sheet_id = get_last_sheet_id()

    # Read values from the last sheet
    if last_sheet_id:
        RANGE_NAME = 'Sheet1!A1:I100'  # Replace with the range of cells you want to read
        read_spreadsheet_values(last_sheet_id, RANGE_NAME)