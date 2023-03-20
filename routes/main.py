import os
from response.templateHandler import TemplateHandler
from response.staticHandler import StaticHandler
from response.dataHandler import DataHandler
from response.badRequestHandler import BadRequestHandler

routes = {
    "": {
        "handler": TemplateHandler,
        "filename": "index.html"
    },
    "/data": {
        "handler": DataHandler,
        "filename": "streets"
    }
}


def chooseHandler(path):
    if path.endswith('/'): path = path[:-1]
    ext = os.path.splitext(path)[1]
    if ext == '.py':
        Handler = BadRequestHandler
        filename = None
    else:
        if path in routes:
            Handler = routes[path]['handler']
            filename = routes[path]['filename']
        else:
            Handler = StaticHandler
            filename = path
    handler = Handler()
    handler.find(filename)
    return handler
