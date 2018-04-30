import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";
import { MovieCardCollection } from "./movie_card_collection";

import { grey900 } from 'material-ui/styles/colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

import '../styles/browse_view_controller';

export class _BrowseVc extends React.Component {
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
    const searchParams = this.props.router.location.search || "?";
    const filterParams = this.getFilterParams(this.props.filters);
    fetch(`/search${searchParams}&${filterParams}`, {
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
    const filterParams = this.getFilterParams(this.props.filters);
    this.setState({loading: true});
    fetch(`/search${searchParams}&place=${place}&${filterParams}`, {
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

  getFilterParams(filters) {
    return Object.keys(filters).map(k => `${k}=${filters[k]}`).join('&');
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

_BrowseVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

_BrowseVc.defaultProps = {
  router: {},
};

_BrowseVc.propTypes = {
  mmActions: PropTypes.object,
  filters: PropTypes.object,
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

export const BrowseVc = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BrowseVc);
