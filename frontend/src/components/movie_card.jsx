import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import '../styles/logo';

export class MovieCard extends React.PureComponent {
  renderGraphs() {
    if (!this.props.graphs) {
      return null;
    }

    return (
      <p>[Some example graphs and stuff]</p>
    );
  }

  renderContents() {
    const fallback = "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg";

    return (
      <div className="row">
        <div className="col-xs-3">
          <img src={this.props.movie.poster_image_url || fallback} />
        </div>
        <div className="col-xs-9">
          <p>{this.props.movie.name}</p>
          <p>{this.props.movie.synopsis}</p>
          <br />
          {this.renderGraphs()}
        </div>
      </div>
    );
  }

  renderCard() {
    if (!this.props.movie) {
      return null;
    }
    
    if (this.props.clickable) {
      return (
        <Link to={`/movie/${this.props.movie.slug}`}>
          {this.renderContents()}
        </Link>
      );
    } else {
      return this.renderContents();
    }
  }

  render() {
    return (
      <div className="movie-card">
        {this.renderCard()}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object,
  graphs: PropTypes.bool,
  clickable: PropTypes.bool,
};

MovieCard.defaultProps = {
  graphs: false,
  clickable: false,
}
