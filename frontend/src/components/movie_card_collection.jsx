import React from "react";
import PropTypes from 'prop-types';
import { MovieCard } from "./movie_card";

// import '../styles/logo';

export class MovieCardCollection extends React.Component {
  render() {
    return (
      <div className="movie-card-collection">
        {
          this.props.movies.map(movie => (
            <MovieCard
              graphs
              clickable
              movie={movie}
              key={movie.title}
            />
          ))
        }
      </div>
    );
  }
}

MovieCardCollection.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
