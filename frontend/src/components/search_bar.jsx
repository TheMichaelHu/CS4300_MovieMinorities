import React from "react";
import PropTypes from 'prop-types';

import '../styles/search_bar';

export class SearchBar extends React.Component {
  render() {
    return (
      <form className="form-inline global-search">
          <h1 style={{
              fontSize: "55px",
              fontFamily: "Futura",
              color: "#4285F4",
            }}>
              C&nbsp;
              <font color="#EA4335">S&nbsp;</font>
              <font color="#FBBC05">4&nbsp;</font>
              3&nbsp;
              <font color="#34A853">0&nbsp;</font>
              <font color="#EA4335">0</font>
          </h1>

          <br /><br />

          <div className="form-group">
              <input id="input" type="text" name="search" className="form-control" placeholder="Your Input" />
          </div>
          <button type="submit" className="btn btn-info"> Go! </button>
      </form>
    );
  }
}
