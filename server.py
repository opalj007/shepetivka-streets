from http.server import BaseHTTPRequestHandler
from routes.main import chooseHandler

class Server(BaseHTTPRequestHandler):
    def do_HEAD(self):
        return
    
    def do_POST(self):
        return
    
    def do_GET(self):
        handler = chooseHandler(self.path)
        response = self.handle_http(handler)
        self.wfile.write(response)
    
    def handle_http(self, handler):
        status_code = handler.getStatus()
        self.send_response(status_code)

        if status_code == 200:
            content = handler.getContents()
            self.send_header('Content-type', handler.getContentType())
        else:
            content = "404 Not Found"
       
        self.end_headers()

        if isinstance( content, (bytes, bytearray) ):
            return content
        
        return bytes(content, 'UTF-8')
    