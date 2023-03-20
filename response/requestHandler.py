class MockFile():
    def read(self):
        return False

class RequestHandler():
    def __init__(self):
        self.status = None
        self.contentType = "text/plain"
        self.contents = MockFile()
    
    def find(self):
        return False
    
    def getContents(self):
        return self.contents.read()
    
    # def read(self):
    #     return self.contents
    
    def setStatus(self, status):
        self.status = status
    
    def getStatus(self):
        return self.status
    
    def setContentType(self, contentType):
        self.contentType = contentType
    
    def getContentType(self):
        return self.contentType
    
    def getType(self):
        return 'static'
