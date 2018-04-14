import React from "react";
import PropTypes from 'prop-types';

import '../styles/logo';

export class Logo extends React.PureComponent {
  render() {
    return (
      <div className="logo">
        <h3>Movie Minorities</h3>
      </div>
    );
  }
}
