import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { SearchBar } from "./search_bar";
import { MovieCardCollection } from "./movie_card_collection";

import { grey900 } from 'material-ui/styles/colors';

// import '../styles/home_view_controller';

export class BrowseVc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {
          title: "Star War Treks: Stardust Crusaders with the Stars",
          description: "dio dio dio dio dio",
          imgUrl: "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
          slug: "imma-slug",
        },
        {
          title: "Spamilton Goes to Spamalot 1",
          description: "tis a silly place",
          imgUrl: "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          slug: "imma-slug",
        },
        {
          title: "Spamilton Goes to Spamalot 2",
          description: "tis a silly place",
          imgUrl: "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          slug: "imma-slug",
        },
        {
          title: "Spamilton Goes to Spamalot 3",
          description: "tis a silly place",
          imgUrl: "https://ia.media-imdb.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          slug: "imma-slug",
        }
      ],
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
    }
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

BrowseVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

BrowseVc.defaultProps = {
  router: {},
};
