from enum import Enum

class ErrorManager(Enum):
    """
    SHEET ERROR CODES
    """
    """ Error code when the Credentials file is not found """
    CREDENTIALS_NOT_FOUND = -1
    CREDENTIALS_NOT_FOUND_MSG = "Credentials file not found. Please create it."
    """ Error code when the Today Sheet is not found """
    TODAY_NOT_FOUND = -100
    TODAY_NOT_FOUND_MSG = "Today Sheet not found. Please create it."
    """ Error code when a sheet with a given name is not found """
    SHEET_NOT_FOUND = -101
    SHEET_NOT_FOUND_MSG = "Sheet not found. Please create it."
    """ Error code when the column has not been formatted correctly """
    COLUMN_FORMAT_ERROR = -102
    COLUMN_FORMAT_ERROR_MSG = "Column format error. Please format them correctly before."
    """ Error code when no data has been found in the sheet """
    NO_DATA_FOUND = -103
    NO_DATA_FOUND_MSG = "No data found. Please fill the sheet before."
    """ Error code when a column has been asked to be added but the column already exists """
    COLUMN_ALREADY_EXISTS = -104
    COLUMN_ALREADY_EXISTS_MSG = "Column already exists."
    """ Error code when an auto-resize has been asked following an error """
    AUTO_RESIZE_ERROR = -105
    AUTO_RESIZE_ERROR_MSG = "Auto-resize error. Please resize the columns manually."
    """
    JSON ERROR CODES
    """
    """ Error code when the json file is empty """
    EMPTY_JSON = -200
    EMPTY_JSON_MSG = "Json file is empty. Please fill it before."
    """ Error code when the json file is not found """
    JSON_NOT_FOUND = -201
    JSON_NOT_FOUND_MSG = "Json file not found. Please create it."
    """ Error code when the json file is not formatted correctly """
    JSON_FORMAT_ERROR = -202
    JSON_FORMAT_ERROR_MSG = "Json file format error. Please format it correctly before."
    """ Generic error code for a json error """
    JSON_ERROR = -203
    JSON_ERROR_MSG = "Json error. Please contact the administrator."
    """
    INTERNAL ERROR CODES
    """
    """ Error code for an internal error """
    INTERNAL_ERROR = -400
    INTERNAL_ERROR_MSG = "Internal error. Please contact the administrator."