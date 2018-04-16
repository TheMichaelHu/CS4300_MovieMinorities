from __future__ import print_function
import pickle
import numpy as np


DATA_DIR = "./app/data"

ranker = pickle.load(open(DATA_DIR + "/tf_idf.pkl", "r"))
doc_by_vocab, movies, tfidf_vec = ranker["tf-idf"], ranker["movies"], ranker["transformer"]


def calc_cossim(query_vec, movie_vec):
    norm1 = np.sum(query_vec**2)**.5
    norm2 = np.sum(movie_vec**2)**.5
    return query_vec.dot(movie_vec) / (norm1 * norm2)


def rank_movies(query):
    query_vec = tfidf_vec.transform([query]).toarray()[0]
    scores = np.apply_along_axis(lambda x: calc_cossim(query_vec, x), 1, doc_by_vocab)
    ranking = [movies[index]["slug"] for index in np.argsort(-scores)]
    return ranking
