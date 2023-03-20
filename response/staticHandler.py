import os
from response.requestHandler import RequestHandler

class StaticHandler(RequestHandler):
    def __init__(self):
        self.filetypes = {
            ".js" : "text/javascript",
            ".css" : "text/css",
            ".jpg" : "image/jpeg",
            ".jpeg" : "image/jpeg",
            ".png" : "image/png",
            ".ico" : "image/x-icon"
        }

    def find(self, file_path):
        split_path = os.path.splitext(file_path)
        extension = split_path[1]

        try:
            if extension in (".jpg", ".jpeg", ".png", ".ico"):
                self.contents = open("dist/{}".format(file_path), 'rb')
            else:
                self.contents = open("dist/{}".format(file_path), 'r')
            
            self.setContentType(self.filetypes[extension])
            self.setStatus(200)
            return True
        except:
            self.setStatus(404)
            return False
