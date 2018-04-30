import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";
import { MovieCardCollection } from "./movie_card_collection";

import { grey900 } from 'material-ui/styles/colors';

import '../styles/browse_view_controller';

export class BrowseVc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: false,
      loadMore: true,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    const searchParams = this.props.router.location.search || "";
    fetch(`/search${searchParams}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => this.setState({movies: json.movies}));
  }

  handleLoadMore() {
    const place = this.state.movies.length;
    const searchParams = this.props.router.location.search || "?";
    this.setState({loading: true});
    fetch(`/search${searchParams}&place=${place}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        movies: [...this.state.movies, ...json.movies],
        loading: false,
        loadMore: json.loadMore,
      })
    });
  }

  renderMovies() {
    if (!this.state.movies) {
      return (
        <p>
          No movies found!
        </p>
      );
    }
    return (
      <MovieCardCollection movies={this.state.movies} />
    );
  }

  renderLoadMore() {
    if (!this.state.loadMore || !this.state.movies) {
      return null;
    } else if (this.state.loading) {
      return (
        <div className="load-more-btn">
          <FlatButton disabled label="Loading..." />
        </div>
      );
    }
    return (
      <div className="load-more-btn">
        <FlatButton
          label="Load More"
          onClick={this.handleLoadMore} />
      </div>
    );
  }

  render() {
    return (
      <div className="browse-vc">
        <div className="logo-wrapper">
          <HeaderVc search filter />
        </div>
        <div className="logo-wrapper-hidden">
          <HeaderVc search filter />
        </div>
        <div className="browse-content">
          <MovieCardCollection movies={this.state.movies} />
        </div>
        {this.renderLoadMore()}
      </div>
    );
  }
}

BrowseVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

BrowseVc.defaultProps = {
  router: {},
};
