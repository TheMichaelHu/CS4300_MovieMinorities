import React from "react";
import PropTypes from 'prop-types';
import { MovieCard } from "./movie_card";
import FontIcon from 'material-ui/FontIcon';

export class MovieCardCollection extends React.Component {
  render() {
    if (this.props.movies.length == 0) {
      return (
        <div className="loading-screen" style={{height: "100vh", textAlign: "center"}}>
          <div className="fa fa-circle-notch fa-spin fa-5x" style={{paddingTop: "20vh"}} />
        </div>
      );
    }

    return (
      <div className="movie-card-collection">
        {
          this.props.movies.map(movie => (
            <MovieCard
              graphs
              clickable
              movie={movie.movie_metadata}
              key={movie.movie_metadata.name}
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
