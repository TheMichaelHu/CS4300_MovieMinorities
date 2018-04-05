import React from "react";
import PropTypes from 'prop-types';
// import '../styles/home_view_controller';

export class BrowseVc extends React.Component {
  renderHeader() {
    return (
      <div className="nav-header">
        Header
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="nav-footer">
        Footer
      </div>
    );
  }

  render() {
    return (
      <div className="home-vc">
        {this.renderHeader()}
        <div className="home-content">
          Browse
        </div>
        {this.renderFooter()}
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
