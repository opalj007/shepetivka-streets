import glob, mimetypes, os
from flask import Flask, render_template, send_from_directory
import dataHandler as data
# from markupsafe import escape

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

app = Flask(__name__, static_url_path='/')

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'static'),
        'index.html', mimetype='text/html')

@app.route('/without_filter')
def without_filter():
    css_files = glob.glob(os.path.join(app.static_folder, 'index.*.css'))
    latest_css = os.path.basename(max(css_files, key=os.path.getctime))
    return render_template('streets.html', css_file='/'+latest_css, data=data.getAll())

@app.route('/data')
def get_data():
    return data.getAll()

@app.route('/settlements')
def get_settlements():
    return data.getSettlements()

@app.route('/object_types')
def get_object_types():
    return data.getObjectTypes()

@app.route('/old_names')
def get_old_names():
    return data.getOldNames()

@app.route('/new_names')
def get_new_names():
    return data.getNewNames()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
