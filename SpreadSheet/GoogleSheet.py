import Activity

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build


class GoogleSheet:
    def __init__(self, credentials_path, spreadsheet_name, sheet_range):
        self.credentials_path = credentials_path
        self.spreadsheet_name = spreadsheet_name
        self.sheet_range = sheet_range

    def authenticate(self)->int:
        """Authenticate with the Google Sheets API."""
        try:
            credentials = Credentials.from_service_account_file(self.credentials_path)
            return build("sheets", "v4", credentials=credentials)
        except FileNotFoundError:
            return None
    
    def is_valid_instance(self):
        # Check if we have a file to work with, and that we have a total of 15 columns
        sheet_id = self.get_spreadsheet_id()
        if isinstance(sheet_id, int): return sheet_id.value
        
        sheet_service = self.authenticate()
        if isinstance(sheet_service, int): return sheet_service
        result = sheet_service.spreadsheets().get(spreadsheetId=sheet_id).execute()
        sheet = result.get("sheets", [])[0]
        if sheet['properties']['gridProperties']['columnCount'] != 13:
            return -1
        return True

    def get_spreadsheet_id(self):
        """Fetch the ID of the most recent Google Sheet with the specified name."""
        credentials = Credentials.from_service_account_file(self.credentials_path)
        drive_service = build("drive", "v3", credentials=credentials)

        query = "mimeType='application/vnd.google-apps.spreadsheet' and name='" + self.spreadsheet_name + "'"
        results = drive_service.files().list(q=query, orderBy="modifiedTime desc", fields="files(id, name)").execute()

        if not results['files']:
            return None
        else:
            sheet_id = results['files'][0]['id']
            return sheet_id
        
    def get_total_columns(self):
        """Fetch the number of columns in the Google Sheet."""
        sheet_id = self.get_spreadsheet_id()
        if sheet_id is None:
            return None
        
        sheet_service = self.authenticate()
        if sheet_service == None: return -1
        result = sheet_service.spreadsheets().get(spreadsheetId=sheet_id).execute()
        sheet = result.get("sheets", [])[0]
        return sheet['properties']['gridProperties']['columnCount']
    
    def title_exists(self, title):
        # Return the content of the first row of the sheet at the given column index
        sheet_id = self.get_spreadsheet_id()
        if sheet_id is None:
            return None
        
        sheet_service = self.authenticate()
        if sheet_service == None: return -1
        result = sheet_service.spreadsheets().values().get(spreadsheetId=sheet_id, range="A1:S1").execute()
        values = result.get("values", [])
        if not values:
            return False
        else:
            for row in values[0]:
                if row == title:
                    return True
            return False

    def get_data(self, debug = False)-> Activity:
        """Fetch data from the specified range of cells in the Google Sheet."""
        isValid = self.is_valid_instance()
        if not isValid: return isValid

        sheet_id = self.get_spreadsheet_id()
        if sheet_id is None:
            return None

        sheet_service = self.authenticate()
        if sheet_service == None: return -1
        result = sheet_service.spreadsheets().values().get(spreadsheetId=sheet_id, range=self.sheet_range).execute()
        values = result.get("values", [])

        if not values:
            if debug : print("No data found.")
            return None
        else:
            activityList = []
            last_row = values[1]
            activityList.append(Activity.Activity().load_row(last_row, last_row))
            for row in values[2:]:
                activity = Activity.Activity().load_row(row, last_row)
                activityList.append(activity)
                last_row = activity.to_row()
            return activityList
        
    def add_column(self, title, index: int, insert: bool):
        # Check if there is not a column with the same title
        # If there is, we don't want to add it
        if self.title_exists(title):
            return None

        sheet_id = self.get_spreadsheet_id()
        if sheet_id is None:
            return None
        
        sheet_service = self.authenticate()
        if sheet_service == None: return -1
        if insert:
            # Also put the title in the first row
            requests = [
                {
                    "insertDimension": {
                        "range": {
                            "sheetId": 0,
                            "dimension": "COLUMNS",
                            "startIndex": index,
                            "endIndex": index + 1
                        },
                        "inheritFromBefore": False
                    }
                },
                {
                    "updateCells": {
                        "rows": {
                            "values": [
                                {
                                    "userEnteredValue": {
                                        "stringValue": title
                                    }
                                }
                            ]
                        },
                        "fields": "userEnteredValue",
                        "range": {
                            "sheetId": 0,
                            "startRowIndex": 0,
                            "endRowIndex": 1,
                            "startColumnIndex": index,
                            "endColumnIndex": index + 1
                        }
                    }
                }
            ]
        else:
            requests = [
                {
                    "updateDimensionProperties": {
                        "range": {
                            "sheetId": 0,
                            "dimension": "COLUMNS",
                            "startIndex": index,
                            "endIndex": index + 1
                        },
                        "properties": {
                            "hiddenByUser": False
                        },
                        "fields": "hiddenByUser"
                    }
                }
            ]
        body = {
            "requests": requests
        }
        try :
            result = sheet_service.spreadsheets().batchUpdate(spreadsheetId=sheet_id, body=body).execute()
        except Exception as e:
            return None
        

    def auto_resize(self):
        isValid = self.is_valid_instance()
        if isValid < 0: return isValid

        sheet_id = self.get_spreadsheet_id()
        
        sheet_service = self.authenticate()
        requests = [
            {
                "autoResizeDimensions": {
                    "dimensions": {
                        "sheetId": 0,
                        "dimension": "COLUMNS",
                        "startIndex": 0,
                        "endIndex": 20
                    }
                }
            }
        ]
        body = {
            "requests": requests
        }
        try:
            result = sheet_service.spreadsheets().batchUpdate(spreadsheetId=sheet_id, body=body).execute()
        except Exception as e:
            return -1

            
