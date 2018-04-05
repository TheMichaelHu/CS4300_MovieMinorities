import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { MovieCard } from "./movie_card";

import '../styles/movie_view_controller';

export class MovieVc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "Star War Treks: Stardust Crusaders with the Stars",
        description: "dio dio dio dio dio",
        imgUrl: "https://ia.media-imdb.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg"
      },
    };
  }

  render() {
    return (
      <div className="movie-vc">
        <div className="logo-wrapper">
          <HeaderVc search />
        </div>
        <div className="movie-content">
          <Paper className="hero">
            <MovieCard movie={this.state.movie} />
          </Paper>
          <Section title="Graphs">
            <p>Lots of graphs</p>
          </Section>
          <Section title="Graphs">
            <p>Lots of graphs</p>
          </Section>
        </div>
      </div>
    );
  }
}

MovieVc.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

MovieVc.defaultProps = {
  router: {},
};
