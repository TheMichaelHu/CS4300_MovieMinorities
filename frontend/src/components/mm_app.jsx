import React from "react";
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  yellow200, yellow500,
  cyan700,
  grey50, grey400, grey800, grey900,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import { Footer } from "./footer";

import { HomeVc } from "./home_view_controller";
import { BrowseVc } from "./browse_view_controller";
import { MovieVc } from "./movie_view_controller";
import { BrowseCompareVc } from "./browse_compare_view_controller";
import { CompareVc } from "./compare_view_controller";

import { HomeVc_1 } from "../versions/version_1/components/home_view_controller";
import { BrowseVc_1 } from "../versions/version_1/components/browse_view_controller";
import { MovieVc_1 } from "../versions/version_1/components/movie_view_controller";

import { HomeVc_2 } from "../versions/version_2/components/home_view_controller";
import { BrowseVc_2 } from "../versions/version_2/components/browse_view_controller";
import { MovieVc_2 } from "../versions/version_2/components/movie_view_controller";
import { BrowseCompareVc_2 } from "../versions/version_2/components/browse_compare_view_controller";
import { CompareVc_2 } from "../versions/version_2/components/compare_view_controller";

import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

export class _MovieMinoritiesApp extends React.Component {
  componentWillMount() {
    this.props.mmActions.fetchTitles();
  }

  renderContent() {
    let Home = HomeVc;
    let Browse = BrowseVc;
    let Movie = MovieVc;
    let BrowseCompare = BrowseCompareVc;
    let Compare = CompareVc;
    if (this.props.version == 1) {
      Home = HomeVc_1;
      Browse = BrowseVc_1;
      Movie = MovieVc_1;
      BrowseCompare = HomeVc_1;
      Compare = HomeVc_1;
    } else if (this.props.version == 2) {
      Home = HomeVc_2;
      Browse = BrowseVc_2;
      Movie = MovieVc_2;
      BrowseCompare = BrowseCompareVc_2;
      Compare = CompareVc_2;
    }

    return (
      <div className={`version-${this.props.version}`}>
        <Switch>
          <Route
            exact
            path="/"
            component={router => <Home router={router} />}
          />
          <Route
            exact
            path="/movies"
            component={router => <Browse router={router} />}
          />
          <Route
            path="/movie/:id"
            component={router => <Movie router={router} />}
          />
          <Route
            path="/compare/:id1/:id2"
            component={router => <Compare router={router} />}
          />
          <Route
            path="/compare/:id"
            component={router => <BrowseCompare router={router} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color:      grey900,
        primary2Color:      grey800,
        primary3Color:      grey400,
        accent1Color:       yellow500,
        accent2Color:       cyan700,
        accent3Color:       yellow200,
        textColor:          grey50,
        secondaryTextColor: fade(grey50, 0.7),
        alternateTextColor: grey50,
        canvasColor:        fade(grey900, 0.97),
        borderColor:        fade(grey50, 0.3),
        disabledColor:      fade(grey50, 0.3),
        pickerHeaderColor:  fade(grey50, 0.12),
        clockCircleColor:   fade(grey50, 0.12),
      },
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.renderContent()}
      </MuiThemeProvider>
    );
  }
}

_MovieMinoritiesApp.propTypes = {
  mmActions: PropTypes.object,
  version: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    version: state.version,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const MovieMinoritiesApp = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(_MovieMinoritiesApp));
