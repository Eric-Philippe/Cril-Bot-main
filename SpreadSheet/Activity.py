class Activity:
    """
    This class represents an activity in the spreadsheet
    """
    def __init__(self):
        self.type = ""
        self.activity = ""
        self.time = ""
        self.place = ""
        self.language = ""
        self.level = ""
        self.lastname = ""
        self.firstname = ""
        self.group = ""
        self.observation = ""
        self.eng_level = ""
        self.esp_level = ""  # Add new attribute here
        self.presence = ""
        self.coach = ""

    def load_row(self, row: list, last_row: list) -> "Activity":
        """
        Load the attributes of the activity from a row of the spreadsheet.
        """
        attribute_names = ["type", "activity", "time", "place", "language", "level",
                        "lastname", "firstname", "group", "observation", "eng_level",
                        "esp_level", "presence", "coach"]
        
        for i, value in enumerate(row):
            if i < len(attribute_names):
                default_value = last_row[i] if i < len(last_row) else None
                setattr(self, attribute_names[i], value if value != "" else default_value)
        
        # Set default values for any missing attributes
        for i in range(len(row), len(attribute_names)):
            setattr(self, attribute_names[i], "")

        return self


    def to_json(self) -> dict:
        """
        Return a dictionary representing the activity.
        """
        return {
            "type": self.type,
            "activity": self.activity,
            "time": self.time,
            "place": self.place,
            "language": self.language,
            "level": self.level,
            "lastname": self.lastname,
            "firstname": self.firstname,
            "group": self.group,
            "observation": self.observation,
            "eng_level": self.eng_level,
            "esp_level": self.esp_level,
            "presence": self.presence,
            "coach": self.coach
        }
    
    def to_row(self) -> list:
        """
        Return a list representing the activity.
        """
        return [
            self.type,
            self.activity,
            self.time,
            self.place,
            self.language,
            self.level,
            self.lastname,
            self.firstname,
            self.group,
            self.observation,
            self.eng_level,
            self.esp_level,
            self.presence,
            self.coach
        ]

    def __str__(self) -> str:
        """
        Return a string representing the activity.
        """
        return f"""
        Type: {self.type}
        Activity: {self.activity}
        Time: {self.time}
        Place: {self.place}
        Language: {self.language}
        Level: {self.level}
        Lastname: {self.lastname}
        Firstname: {self.firstname}
        Group: {self.group}
        Observation: {self.observation}
        Eng_level: {self.eng_level}
        Esp_level: {self.esp_level}
        Presence: {self.presence}
        Coach: {self.coach}
        """
