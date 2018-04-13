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
    return (
      <div className="row">
        <div className="col-xs-3">
          <img src={this.props.movie.imgUrl} />
        </div>
        <div className="col-xs-9">
          <p>{this.props.movie.title}</p>
          <p>{this.props.movie.description}</p>
          <br />
          {this.renderGraphs()}
        </div>
      </div>
    );
  }

  renderCard() {
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
  movie: PropTypes.objectOf(PropTypes.string).isRequired,
  graphs: PropTypes.bool,
  clickable: PropTypes.bool,
};

MovieCard.defaultProps = {
  graphs: false,
  clickable: false,
}
