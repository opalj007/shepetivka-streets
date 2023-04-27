import mimetypes
import os
from flask import Flask, send_from_directory
from dataHandler import getData
# from markupsafe import escape

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

app = Flask(__name__, static_url_path='/')

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'static'),
        'index.html', mimetype='text/html')

@app.route('/data')
def get_data():
    return getData()
