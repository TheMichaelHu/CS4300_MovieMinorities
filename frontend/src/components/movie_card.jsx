import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/movie_card';

export class MovieCard extends React.PureComponent {
  renderGraphs() {
    if (!this.props.graphs) {
      return null;
    }

    return (
      <p></p>
    );
  }

  renderContents() {
    const fallback = "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg";
    let imgUrl = this.props.movie.poster_image_url;
    if (!imgUrl || imgUrl === "N/A") {
      imgUrl = fallback;
    }

    let synopsis = this.props.movie.synopsis;
    if (this.props.clickable) {
      synopsis = this.truncate_txt(synopsis);
    }

    return (
      <div className="row row-no-padding">
        <div className="col-xs-3">
          <img className="poster-img" src={imgUrl} />
        </div>
        <div className="col-xs-9">
          <h2 className="title">{this.props.movie.name}</h2>
          <hr align="left" width="90%" />
          <h4 className="synopsis">{synopsis}</h4>
          <br />
          {this.renderGraphs()}
        </div>
      </div>
    );
  }

  truncate_txt(text) {
    const limit = 300;
    let trunc_text = text.slice(0, limit);
    let curr = limit;
    while (curr < text.length && text[curr] !== " ") {
      trunc_text += text[curr];
      curr += 1;
    }
    return trunc_text + "...";
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
