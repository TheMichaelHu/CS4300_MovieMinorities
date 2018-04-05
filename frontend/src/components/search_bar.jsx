import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import '../styles/search_bar';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.getSearchUrl = this.getSearchUrl.bind(this);
  }

  handleUpdateInput(value) {
    this.setState({
      titles: [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  getSearchUrl() {
    return "/movies?q=foo";
  }

  render() {
    return (
      <div className="search-bar">
        <div className="bar-wrapper">
          <AutoComplete
            style={{width: "100%"}}
            fullWidth
            hintText="Search for a movie"
            dataSource={this.state.titles}
            onUpdateInput={this.handleUpdateInput}
          />
        </div>
        <Link to={this.getSearchUrl()}>
          <FlatButton>
            &nbsp;<div className="fa fa-search"/>&nbsp;
          </FlatButton>
        </Link>
      </div>
    );
  }
}
