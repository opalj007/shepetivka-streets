import sys, time
from http.server import HTTPServer
from server import Server
from logger import Logger

HOST_NAME = '127.0.0.1'
PORT_NUMBER = 8000

sys.stderr = Logger('error.log', 'w')

if __name__ == '__main__':
    httpd = HTTPServer((HOST_NAME, PORT_NUMBER), Server)
    print(time.asctime(), 'Server UP - %s:%s' % (HOST_NAME, PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), 'Server DOWN - %s:%s' % (HOST_NAME, PORT_NUMBER))
