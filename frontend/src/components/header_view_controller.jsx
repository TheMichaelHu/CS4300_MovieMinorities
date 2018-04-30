import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Logo } from "./logo";
import { SearchBar } from "./search_bar";
import { FilterBar } from "./filter_bar";
import { VersionDropdown } from "./version_dropdown";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

class _HeaderVc extends React.Component {
  renderTitle() {
    if (!this.props.search) {
      return null;
    }
    return (<SearchBar path={this.props.path} />);
  }

  renderLogo() {
    return (
      <Link to="/">
        <Logo />
      </Link>
    );
  }

  renderBrowse() {
    return (
      <div className="row row-no-padding browse">
        <div className="col-xs-6" style={{margin: "-10px"}}>
          <VersionDropdown />
        </div>
        <div className="col-xs-6">
          <Link to={this.props.path} style={{float: "right"}}>
            <FlatButton
              label="Browse All"
              onClick={this.props.mmActions.resetFilters} />
          </Link>
        </div>
      </div>
    );
  }

  renderFilters() {
    if (!this.props.filter) {
      return null;
    }
    return (<FilterBar />);
  }

  render() {
    return (
      <div className="header">
        <AppBar
          title={this.renderTitle()}
          titleStyle={{textAlign: "center"}}
          iconElementRight={this.renderBrowse()}
          iconElementLeft={this.renderLogo()}
          iconStyleLeft={{margin: 0, paddingRight: 20}}
          iconStyleRight={{margin: 0, paddingTop: 13}}
          zDepth={0}
        />
        {this.props.children}
        <div className="filters-wrapper">
          {this.renderFilters()}
        </div>
      </div>
    );
  }
}

_HeaderVc.propTypes = {
  search: PropTypes.bool,
  filter: PropTypes.bool,
  path: PropTypes.string,
};

_HeaderVc.defaultProps = {
  search: false,
  filter: false,
  path: "/movies",
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const HeaderVc = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HeaderVc);
