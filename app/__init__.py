# Gevent needed for sockets
from gevent import monkey
monkey.patch_all()

# Imports
import os
from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
import json
import boto3

# Configure app
socketio = SocketIO()
app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# DB
db = SQLAlchemy(app)

# Initialize app w/SocketIO
socketio.init_app(app)

DATA_DIR = "./app/data"


# Routes
@app.route('/movie_titles')
def get_movie_titles():
    titles_file = DATA_DIR + "/movies.txt"
    if not os.path.isfile(titles_file):
        return jsonify({"titles": []})

    with open(titles_file) as f:
        titles = f.readlines()
        titles = [x.strip() for x in titles]
    return jsonify({"titles": titles})


@app.route('/search')
def search_movies():
    query = request.args.get('q')

    # MH: stubbed document ranking based on query (need tf-idf)
    ranking = ["titanic"] * 20

    # MH: TODO: get rid of json.loads. Only needed for editting results
    movies = [json.loads(get_movie(slug)) for slug in ranking]

    # MH: some result edits for funsies
    movies[0]["movie_metadata"]["name"] = "Definitely %s" % query
    movies[0]["movie_metadata"]["synopsis"] = "This is totally the movie you're looking for."
    for i in range(1, len(movies)):
        movies[i]["movie_metadata"]["name"] = "Probably Not %s %d" % (query, i)

    return jsonify({"results": movies})


@app.route('/movie_data/<movie_slug>')
def get_movie(movie_slug):
    # MH: stubbing out slug until we support more movies
    movie_slug = "avatar"
    if app.config["DEVELOPMENT"]:
        with open("%s/movies/%s.json" % (DATA_DIR, movie_slug)) as f:
            data = f.read()
    else:
        s3 = boto3.resource('s3', aws_access_key_id=app.config["AWS_ACCESS_KEY_ID"], aws_secret_access_key=app.config["AWS_SECRET_ACCESS_KEY"])
        obj = s3.Object("cs4300-movies", "movies/%s.json" % movie_slug)
        data = obj.get()['Body'].read().decode('utf-8')
    return data


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template("404.html"), 404
