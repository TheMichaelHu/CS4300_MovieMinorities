import React from "react";
import PropTypes from 'prop-types';

import '../styles/logo';

export class Logo extends React.Component {
  render() {
    return (
      <div className="logo" onClick={this.props.onClick}>
        <h3>Movie Minorities</h3>
      </div>
    );
  }
}

Logo.propTypes = {
  onClick: PropTypes.func.isRequired,
};
