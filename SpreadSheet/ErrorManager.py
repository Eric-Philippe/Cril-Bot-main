class InternalSheetError(Exception):
    """
    Internal Sheet Error Class. Generic error for the sheet.
    """
    def __init__(self):
        self.errno = -400
        self.message = "Internal Sheet Error. Please contact the administrator."
    def __str__(self):
        return "InternalError: " + "[Errno " + str(self.errno) + "] " + self.message

class ColonFormatError(Exception):
    """
    Colon Format Error Class. Error for the colon format.
    """
    def __init__(self, errno , message):
        self.errno = errno
        self.message = message
    def __str__(self):
        return "ColonFormatError: " + "[Errno " + str(self.errno) + "] " + self.message
    
class TitleAlreadyExistsError(Exception):
    """
    Title Already Exists Error Class. Error for the title already exists.
    """
    def __init__(self, errno , message):
        self.errno = errno
        self.message = message
    def __str__(self):
        return "TitleAlreadyExistsError: " + "[Errno " + str(self.errno) + "] " + self.message

class JsonNotFoundError(Exception):
    """
    Json Not Found Error Class. Error for the json not found.
    """
    def __init__(self, errno , message):
        self.errno = errno
        self.message = message
    def __str__(self):
        return "JsonNotFoundError: " + "[Errno " + str(self.errno) + "] " + self.message

class JsonInternalError(Exception):
    """
    Json Internal Error Class. Error for the json internal error.
    """
    def __init__(self, errno , message):
        self.errno = errno
        self.message = message
    def __str__(self):
        return "JsonInternalError: " + "[Errno " + str(self.errno) + "] " + self.message