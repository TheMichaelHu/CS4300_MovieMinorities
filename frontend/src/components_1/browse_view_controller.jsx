import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";
import { MovieCardCollection } from "./movie_card_collection";

import { grey900 } from 'material-ui/styles/colors';

// import '../styles_1/home_view_controller';

export class BrowseVc_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentWillMount() {
    if (this.props.router.location.search) {
      fetch(`/search${this.props.router.location.search}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => this.setState({movies: json.results}));
    } else {
      fetch(`/search`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => this.setState({movies: json.results}));
    }
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

  render() {
    return (
      <div className="browse-vc">
        <div className="logo-wrapper">
          <HeaderVc search filter />
        </div>
        <div className="browse-content">
          <MovieCardCollection movies={this.state.movies} />
        </div>
      </div>
    );
  }
}

BrowseVc_1.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

BrowseVc_1.defaultProps = {
  router: {},
};
