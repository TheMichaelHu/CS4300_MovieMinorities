import React from "react";
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Logo } from "./logo";

export class HeaderVc extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleLogoClick() {
    console.log("GO HOME");
  }

  handleSearch() {
    console.log("GO SEARCH");
  }

  render() {
    return (
      <div className="header">
        <AppBar
          iconElementRight={
            <FlatButton label="Browse All" onClick={this.handleSearch} />
          }
          iconElementLeft={<Logo onClick={this.handleLogoClick} />}
          iconStyleLeft={{margin: 0, cursor: "pointer"}}
        />
      </div>
    );
  }
}

HeaderVc.propTypes = {
  search: PropTypes.bool,
};

HeaderVc.defaultProps = {
  search: false,
};
