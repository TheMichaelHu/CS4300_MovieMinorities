import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { HeaderVc } from "./header_view_controller";
import { Section } from "./section";
import { MovieCard } from "./movie_card";
import { ChartsVc } from "./charts_view_controller";

import '../styles/compare_view_controller';

export class CompareVc_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie1: null,
      movie2: null,
      loading1: true,
      loading2: true,
    }
  }

  componentWillMount() {
    if (this.props.router.match.params.id1) {
      fetch(`/movie_data/${this.props.router.match.params.id1}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => this.setState({movie1: json, loading1: false}));
    }
    if (this.props.router.match.params.id2) {
      fetch(`/movie_data/${this.props.router.match.params.id2}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => this.setState({movie2: json, loading2: false}));
    }
  }

  renderMovieCard() {
    if (!this.state.movie1 || !this.state.movie2) {
      return null;
    }
    return (
      <div className="row row-no-padding">
        <div className="col-xs-6">
          <MovieCard movie={this.state.movie1.movie_metadata} />
        </div>
        <div className="col-xs-6">
          <MovieCard movie={this.state.movie2.movie_metadata} />
        </div>
      </div>
    );
  }

  renderMovieContent() {
    if (this.state.loading1 || this.state.loading2) {
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
          <div className="row row-no-padding">
            <div className="col-xs-6">
              <ChartsVc movie={this.state.movie1} single />
            </div>
            <div className="col-xs-6">
              <ChartsVc movie={this.state.movie2} single />
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

CompareVc_2.propTypes = {
  router: PropTypes.objectOf(PropTypes.object),
};

CompareVc_2.defaultProps = {
  router: {},
};
