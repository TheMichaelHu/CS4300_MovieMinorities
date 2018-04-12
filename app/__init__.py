# Gevent needed for sockets
from gevent import monkey
monkey.patch_all()

# Imports
import os
from flask import Flask, render_template, jsonify, request
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


@app.route('/search')
def search_movies():
    query = request.args.get('q')
    movies = [
        {
          "title": "Star War Treks: Stardust Crusaders with the Stars",
          "description": "dio dio dio dio dio",
          "imgUrl": "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "slug": "imma-slug",
        },
        {
          "title": "%s 1" % query,
          "description": "tis a silly place",
          "imgUrl": "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "slug": "imma-slug",
        },
        {
          "title": "%s 2" % query,
          "description": "tis a silly place",
          "imgUrl": "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "slug": "imma-slug",
        },
        {
          "title": "%s 3" % query,
          "description": "tis a silly place",
          "imgUrl": "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          "slug": "imma-slug",
        }
    ]
    return jsonify({"results": movies})


@app.route('/movie_data/<movie>')
def get_movie(movie):
    movie = {
      "title": "%s test" % movie,
      "description": "tis a silly place",
      "imgUrl": "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
      "slug": "imma-slug",
    }
    return jsonify({"movie": movie})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template("404.html"), 404
