from response.requestHandler import RequestHandler

class TemplateHandler(RequestHandler):
    def __init__(self):
        super().__init__()
        self.setContentType('text/html')

    def find(self, filename):
        try:
            template_file = open('dist/{}'.format(filename), 'r', encoding='UTF-8')
            self.contents = template_file
            self.setStatus(200)
            return True
        except:
            self.setStatus(404)
            return False
