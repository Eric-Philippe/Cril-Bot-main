from datetime import datetime
from ErrorManager import *
from Logger import log
import sys

import json

CURRNENT_PATH = sys.path[0]
FILE_NAME = CURRNENT_PATH + "/Activities.json"

class JsonManager:
    def __init__(self):
        self.json = None
        self.load_json(FILE_NAME)
    """
    Load the json file from the given path.
    """
    def load_json(self, json_path):
        self.json_path = json_path
        try:
            with open(json_path, 'r') as file:
                self.json = json.load(file)
        except FileNotFoundError:
            with open(json_path, 'w') as file:
                json.dump({}, file)
            self.load_json(json_path)
        except json.decoder.JSONDecodeError:
            raise JsonInternalError(-201, "Json file is corrupted.")
        return 0

    def empty_json(self):
        today = datetime.now().strftime('%d%m%Y')
        self.json = {
            today: []
        }
        self.save_json()
        log(f"Json file has been emptied.")

    def refresh_json(self):
        self.clear_outdated()
        self.save_json()

    def clear_today(self):
        today = datetime.now().strftime('%d%m%Y')
        self.json[today] = []
        self.save_json()

    def clear_outdated(self):
        # Delete every json property that is not today's date (DDMMYYYY)
        soft_copy = self.json.copy()
        for key in soft_copy:
            today = datetime.now().strftime('%d%m%Y')
            if key != today:
                del self.json[key]
                log(f"Deleted outdated json property: {key}")


    def save_json(self)-> int:
        try:
            with open(self.json_path, 'w') as file:
                json.dump(self.json, file, indent=4)
                log (f"Json file has been saved.")
                return 0
        except FileNotFoundError:
            raise JsonNotFoundError(-200, "No json file found at " + self.json_path)

    def get_json(self):
        return self.json
    
    def load_activities(self, activities):
        today = datetime.now().strftime('%d%m%Y')
        # If today's date is not in the json file, create it
        if today not in self.json:
            self.json[today] = []
        for activity in activities:
            self.json[today].append(activity.to_json())