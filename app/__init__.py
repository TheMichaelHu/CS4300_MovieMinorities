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
from ranker import rank_movies
import pandas as pd

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
MOVIE_FEATURES = pd.read_csv("%s/movie_features.csv" % DATA_DIR)


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
    place = request.args.get('place')
    place = int(place) if place else 0

    ranking = rank_movies(query)
    ranking = filter_ranking(ranking, request.args)
    results = ranking[place:place + 10]
    movies = [json.loads(get_movie(slug)) for slug in results]

    return jsonify({"results": movies, "loadMore": place + 10 < len(ranking)})


def filter_ranking(ranking, args):
    category = args.get("category") or "-1"
    gender_start = float(args.get("gender1") or "0") * .1
    gender_end = float(args.get("gender2") or "10") * .1
    ethnicity_start = float(args.get("ethnicity1") or "0") * .1
    ethnicity_end = float(args.get("ethnicity2") or "10") * .1
    bechdel = float(args.get("bechdel") or "-1")

    movie_features = MOVIE_FEATURES.set_index("slug")
    movie_features = movie_features.loc[ranking]
    if category != "-1":
        movie_features = movie_features[movie_features[category] == 1]
    if gender_start != 0 or gender_end != 1:
        movie_features = movie_features[movie_features["nonmale"].between(gender_start, gender_end)]
    if ethnicity_start != 0 or ethnicity_end != 1:
        movie_features = movie_features[movie_features["nonwhite"].between(ethnicity_start, ethnicity_end)]
    if bechdel != -1:
        movie_features = movie_features[movie_features["bechdel"] == bechdel]

    return list(movie_features.index.values)


@app.route('/movie_data/<movie_slug>')
def get_movie(movie_slug):
    # MH: stubbing out slug until we support more movies
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
