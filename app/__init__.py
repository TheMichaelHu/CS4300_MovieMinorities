# Gevent needed for sockets
from gevent import monkey
monkey.patch_all()

# Imports
import os
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

# Configure app
socketio = SocketIO()
app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# DB
db = SQLAlchemy(app)

# Initialize app w/SocketIO
socketio.init_app(app)

DATA_DIR = "./app/data/"


# Routes
@app.route('/movie_titles')
def get_movie_titles():
    titles_file = DATA_DIR + "movies.txt"
    if not os.path.isfile(titles_file):
        return jsonify({"titles": []})

    with open(titles_file) as f:
        titles = f.readlines()
        titles = [x.strip() for x in titles]
    return jsonify({"titles": titles})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template("404.html"), 404
