from response.requestHandler import RequestHandler

class TemplateHandler(RequestHandler):
    def __init__(self):
        super().__init__()
        self.setContentType('text/html')

    def find(self, filename):
        try:
            template_file = open('dist/{}'.format(filename), 'rb')
            self.contents = template_file
            self.setStatus(200)
            return True
        except:
            self.setStatus(404)
            return False
