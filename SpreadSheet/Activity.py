class Activity:
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


    def load_row(self, row: list, last_row: list) -> None:
        attribute_names = ["type", "activity", "time", "place", "language", "level",
                        "lastname", "firstname", "group", "observation", "eng_level",
                        "esp_level", "presence", "coach"]
        
        for i, value in enumerate(row):
            setattr(self, attribute_names[i], last_row[i] if value == "" else value)
        
        # Set default values for any missing attributes
        self.observation = self.observation or ""
        self.eng_level = self.eng_level or ""
        self.esp_level = self.esp_level or ""
        self.presence = self.presence or ""
        self.coach = self.coach or ""

        return self

    def to_json(self) -> dict:
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
        return f"{self.type} {self.activity} {self.time} {self.language} {self.level} {self.lastname} {self.firstname} {self.group} {self.observation} {self.coach}"