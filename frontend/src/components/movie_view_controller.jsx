import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { MovieCard } from "./movie_card";

import { MetadataChart } from "./charts/metadata_chart";
import { ScreenTimeChart } from "./charts/screen_time_chart";

import '../styles/movie_view_controller';

export class MovieVc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
    }
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
      .then(json => this.setState({movie: json, loading: false}));
    }
  }

  renderMovieCard() {
    if (!this.state.movie) {
      return null;
    }
    return (
      <MovieCard movie={this.state.movie.movie_metadata} />
    );
  }

  renderMovieContent() {
    if (this.state.loading) {
      return (
        <div className="loading-screen" style={{height: "100vh", textAlign: "center"}}>
          <div className="fa fa-circle-notch fa-spin fa-5x" style={{paddingTop: "20vh"}} />
        </div>
      );
    }

    return (
      <div className="movie-content">
        <Paper className="hero">
          {this.renderMovieCard()}
        </Paper>
        <Section title="Charts">
          <div className="charts-wrapper row">
            <div className="col-xs-12 col-md-6">
              <MetadataChart movie={this.state.movie} />
            </div>
            <div className="col-xs-12 col-md-6">
              <ScreenTimeChart movie={this.state.movie} />
            </div>
          </div>
        </Section>
      </div>
    );
  }

  render() {
    return (
      <div className="movie-vc">
        <div className="logo-wrapper">
          <HeaderVc search />
        </div>
        {this.renderMovieContent()}
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
