from datetime import datetime

"""
[ Today's Date ] - Text 
Write this inside the log file.
"""
def log(text: str):
    with open("Logs.log", "a") as file:
        file.write(f"[{get_today_date()}] - {text}\r\n")
"""
Ex: mar. 28 févr. 2023 11:48:54 CET
"""
def get_today_date():
    return datetime.now().strftime('%a. %d %b. %Y %H:%M:%S %Z')