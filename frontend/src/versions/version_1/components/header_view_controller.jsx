import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Logo } from "./logo";
import { SearchBar } from "./search_bar";
import { FilterBar } from "./filter_bar";
import { VersionDropdown } from "./version_dropdown";

export class HeaderVc extends React.Component {
  renderTitle() {
    if (!this.props.search) {
      return null;
    }
    return (<SearchBar />);
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
          <Link to="/movies" style={{float: "right"}}>
            <FlatButton label="Browse All" />
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
        <div className="filters-wrapper">
          {this.renderFilters()}
        </div>
      </div>
    );
  }
}

HeaderVc.propTypes = {
  search: PropTypes.bool,
  filter: PropTypes.bool,
};

HeaderVc.defaultProps = {
  search: false,
  filter: false,
};
