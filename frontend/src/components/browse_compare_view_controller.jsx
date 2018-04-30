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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

import '../styles/browse_compare_view_controller';

class _BrowseCompareVc extends React.Component {
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

    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.filters != this.props.filters) {
      this.handleSearch();
    }
  }

  handleSearch() {
    const searchParams = this.getSearchParams(this.props.router.location.search);
    const filterParams = this.getFilterParams(this.props.filters);
    fetch(`/search?${searchParams}&${filterParams}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => this.setState({
      movies: json.results,
      loading: false,
      loadMore: json.loadMore,
    }));
  }

  handleLoadMore() {
    const place = this.state.movies.length;
    const searchParams = this.getSearchParams(this.props.router.location.search);
    const filterParams = this.getFilterParams(this.props.filters);
    this.setState({loading: true});
    fetch(`/search?${searchParams}&place=${place}&${filterParams}`, {
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
        movies: [...this.state.movies, ...json.results],
        loadingMore: false,
        loadMore: json.loadMore,
      })
    });
  }

  getSearchParams(search) {
    if (!search) {
      return "";
    }
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let query = ""
    hashes.forEach(hash => {
      let [key, val] = hash.split('=')
      if (key === "q") {
        query = hash;
      }
    });
    return query;
  }

  getFilterParams(filters) {
    return Object.keys(filters).map(k => `${k}=${filters[k]}`).join('&');
  }

  renderMovies() {
    if (!this.state.loadMore && this.state.movies.length === 0) {
      return (
        <p style={{height: "100vh"}}>
          No movies found!
        </p>
      );
    }
    return (
      <MovieCardCollection
        movies={this.state.movies}
        loading={this.state.movies.length === 0} />
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
          {this.renderMovies()}
        </div>
        {this.renderLoadMore()}
      </div>
    );
  }
}

_BrowseCompareVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
  mmActions: PropTypes.object,
  filters: PropTypes.object,
};

_BrowseCompareVc.defaultProps = {
  router: {},
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const BrowseCompareVc = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BrowseCompareVc);
