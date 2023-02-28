import GoogleSheet
from JsonManager import JsonManager
from Logger import log

from datetime import datetime
import sys

TOTAL_COLUMNS = 14

class App:
    def __init__(self, debug=False):
        self.depth = len(sys.argv)
        self.range = self.build_range()
        self.credentials_path = "credentials.json"
        self.today = datetime.now().strftime('%d%m%Y')
        self.jsonManager = JsonManager()
        self.sheet = GoogleSheet.GoogleSheet(self.credentials_path, self.today, self.range)
        self.debug = debug
        self.cmdHander()

    def build_range(self)-> str:
        myRange = "A1:"
        myRange += chr(ord('A') + TOTAL_COLUMNS - 1)
        myRange += "150"
        return myRange
    
    def msg(self, msg):
        if self.debug:
            print(msg)
        else:
            log(msg)
    
    def cmdHander(self):
        if self.depth > 1:
            if sys.argv[1] == "refresh":
                self.refresh()
            if sys.argv[1] == "clear":
                self.clear()
            if sys.argv[1] == "add":
                self.add()
            if sys.argv[1] == "resize":
                self.resize()
        else:
            self.help()

    def refresh(self):
        activities = self.sheet.get_data()
        self.jsonManager.load_activities(activities)
        self.jsonManager.refresh_json()

    def clear(self):
        self.jsonManager.empty_json()

    def add(self):
        # If the second argument is here
        if self.depth < 2:
            self.msg("Please enter the activity name.")
            return
        column_name = sys.argv[2]
        if self.depth < 3:
            self.msg("Please enter the column index.")
            return
        if not sys.argv[3].isdigit():
            self.msg("Please enter a valid column index.")
            return
        column_index = int(sys.argv[3])
        if column_index < 0 or column_index >= TOTAL_COLUMNS:
            self.msg("Please enter a valid column index.")
            return
        self.sheet.add_column(column_name, column_index, True)

    def resize(self):
        self.sheet.auto_resize()

    def help(self):
        self.msg(" ")
        self.msg("Shell for Sheet Manager")
        self.msg("Usage: python main.py [command]")
        self.msg("Commands:")
        self.msg("  - refresh: Refresh the json file with the data from the Google Sheet.")
        self.msg("  - clear: Clear the json file.")
        self.msg("  - add [column_name] [column_index] : Add a column to the Google Sheet.")
        self.msg("  - resize: Resize the columns of the Google Sheet.")
        self.msg("  - help: Display this message.")
        self.msg(" ")


if __name__ == "__main__":
    app = App(True)



