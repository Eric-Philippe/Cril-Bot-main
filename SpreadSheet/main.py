from JsonManager import JsonManager
from datetime import datetime
from Logger import log

import GoogleSheet
import sys

TOTAL_COLUMNS = 14
ENV_ENUM = {
    "USER": 0,
    "BOT": 1
}

class App:
    """
    Main class of the application.
    """
    def __init__(self, env, debug=False):
        self.depth = len(sys.argv)
        self.range = self.build_range()
        self.credentials_path = "credentials.json"
        self.today = datetime.now().strftime('%d%m%Y')
        self.jsonManager = JsonManager()
        self.sheet = GoogleSheet.GoogleSheet(self.credentials_path, self.today, self.range)
        self.debug = debug
        self.env = env
        self.cmdDone = False

    def callback_builder(self, index = 0, msg = "OK"):
        """
        Build a callback object.
        """
        return {
            "index": index,
            "msg": msg
        }

    def build_range(self)-> str:
        """
        Build the range of the sheet.
        """
        myRange = "A1:"
        myRange += chr(ord('A') + TOTAL_COLUMNS - 1)
        myRange += "150"
        return myRange
    
    def msg(self, msg):
        """
        Print a message if debug is enabled, else log it.
        """
        if self.debug:
            print(msg)
        else:
            log(msg)
    
    def cmdHandler(self, cmds = sys.argv)-> dict:
        """
        Handle the command line arguments.
        """
        if self.cmdDone : return
        method = None
        self.depth = len(cmds)
        if self.depth > 1:
            if cmds[1] == "load":
                method = self.sheet_load
            if cmds[1] == "refresh":
                method = self.refresh
            if cmds[1] == "clear":
                method = self.clear
            if cmds[1] == "add":
                method = self.add
            if cmds[1] == "resize":
                method = self.resize
        else:
            method = self.help
        
        if method is not None:
            try:
                method()
            except Exception as e:
                index_error = -1
                msg_error = "An error occured while executing the command."
                # If e.errno exists, it's a custom error
                if hasattr(e, "errno"): index_error = e.errno
                if hasattr(e, "message"): msg_error = e.message
                if self.env == ENV_ENUM["BOT"]:
                    self.msg("An error occured while executing the command.")
                else:
                    self.msg(e)
                return self.callback_builder(index_error, msg_error)
        self.cmdDone = True
        return self.callback_builder()

    def sheet_load(self):
        """
        Load the sheet, format it and load the activities.
        """
        if self.debug : print("Loading the sheet...")
        self.sheet.add_column("Lieu", 3, True)
        self.sheet.add_column("Presence", 12, True)
        self.sheet.add_column("Coaching Commentaire", 13, True)
        self.sheet.auto_resize()
        self.jsonManager.clear_outdated()
        activities = self.sheet.get_data()
        self.jsonManager.load_activities(activities)
        self.jsonManager.refresh_json()

    def refresh(self):
        """
        Refresh the json file with the data from the Google Sheet.
        """
        activities = self.sheet.get_data()
        self.jsonManager.load_activities(activities)
        self.jsonManager.refresh_json()

    def clear(self):
        """
        Clear the json file.
        """
        self.jsonManager.empty_json()

    def add(self):
        """
        Add a column to the Google Sheet.
        """
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
        """
        Resize the columns of the Google Sheet.
        """
        self.sheet.auto_resize()

    def help(self):
        """
        Display the help message.
        """
        self.msg(" ")
        self.msg("Shell for Sheet Manager")
        self.msg("Usage: python main.py [command]")
        self.msg("Commands:")
        self.msg("  - load: Load and format the Google Sheet and create the json file.")
        self.msg("  - refresh: Refresh the json file with the data from the Google Sheet.")
        self.msg("  - clear: Clear the json file.")
        self.msg("  - add [column_name] [column_index] : Add a column to the Google Sheet.")
        self.msg("  - resize: Resize the columns of the Google Sheet.")
        self.msg("  - help: Display this message.")
        self.msg(" ")


# if __name__ == "__main__":
#     # If the last argument is debug
#     if len(sys.argv) > 1 and sys.argv[-1] == "debug":
#         app = App(ENV_ENUM["USER"], True)
#     else:
#         app = App(ENV_ENUM["USER"])

#     callback = app.cmdHander()
#     print(callback)



