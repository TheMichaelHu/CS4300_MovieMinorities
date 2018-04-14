import React from "react";
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  lightGreen200, lightGreen500,
  cyan700,
  grey50, grey400, grey800, grey900,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

import { HomeVc } from "./home_view_controller";
import { BrowseVc } from "./browse_view_controller";
import { MovieVc } from "./movie_view_controller";
import { Footer } from "./footer";

import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

export class _MovieMinoritiesApp extends React.Component {
  componentWillMount() {
    this.props.mmActions.fetchTitles();
  }

  renderContent() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={router => <HomeVc router={router} />}
          />
          <Route
            exact
            path="/movies"
            component={router => <BrowseVc router={router} />}
          />
          <Route
            path="/movie/:id"
            component={router => <MovieVc router={router} />}
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
        accent1Color:       lightGreen500,
        accent2Color:       cyan700,
        accent3Color:       lightGreen200,
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
};

function mapStateToProps(state) {
  return {};
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
