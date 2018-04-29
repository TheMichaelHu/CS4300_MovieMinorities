import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";
import { MovieCardCollection } from "./movie_card_collection";
import { MovieCard } from "./movie_card";

import { grey900 } from 'material-ui/styles/colors';

import '../styles/browse_compare_view_controller';

export class BrowseCompareVc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      compare: null,
      loading: true,
      showCard: false,
      loadingMore: false,
      loadMore: true,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    if (this.props.router.match.params.id) {
      fetch(`/movie_data/${this.props.router.match.params.id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => this.setState({compare: json.movie_metadata, loading: false}));
    }

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
    this.setState({loadingMore: true});
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
        loadingMore: false,
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
        <div className="load-more">
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

  renderCard() {
    if (!this.state.showCard) {
      return null;
    }

    return (
      <div className="compare-card">
        <MovieCard movie={this.state.compare} />
      </div>
    );
  }

  renderCompare() {
    if (this.state.loading) {
      return (
        <div className="loading-screen" style={{height: "100vh", textAlign: "center"}}>
          <div className="fa fa-circle-notch fa-spin fa-5x" style={{paddingTop: "20vh"}} />
        </div>
      );
    }
    return (
      <Paper onClick={() => {this.setState({showCard: !this.state.showCard})}}>
        <div className="compare-txt" >
          Compare to: <b>{this.state.compare.name}</b>
        </div>
        {this.renderCard()}
      </Paper>
    );
  }

  render() {
    const path = this.state.loading ? "/movies" : `/compare/${this.state.compare.slug}`;

    return (
      <div className="browse-compare-vc">
        <div className="logo-wrapper">
          <HeaderVc path={path} search filter >
            {this.renderCompare()}
          </HeaderVc>
        </div>
        <div className="logo-wrapper-hidden">
          <HeaderVc path={path} search filter >
            {this.renderCompare()}
          </HeaderVc>
        </div>
        <div className="browse-content">
          <MovieCardCollection
            movies={this.state.movies}
            path={path} />
        </div>
        {this.renderLoadMore()}
      </div>
    );
  }
}

BrowseCompareVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

BrowseCompareVc.defaultProps = {
  router: {},
};
