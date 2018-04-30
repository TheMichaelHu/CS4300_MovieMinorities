import React from "react";
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

import '../styles/search_bar';

class _SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.getSearchUrl = this.getSearchUrl.bind(this);
  }

  handleUpdateInput(value) {
    this.props.mmActions.setSearch(value);
  }

  getSearchUrl() {
    const filterParams = this.getFilterParams(this.props.filters);
    return `${this.props.path}?q=${this.props.search}&${filterParams}`;
  }

  getFilterParams(filters) {
    return Object.keys(filters).map(k => `${k}=${filters[k]}`).join('&');
  }

  filterSearch(searchText, key) {
    return key.toLowerCase().includes(searchText.toLowerCase());
  }

  render() {
    return (
      <div className="search-bar">
        <div className="bar-wrapper">
          <AutoComplete
            style={{width: "100%"}}
            fullWidth
            hintText="Search for a movie"
            dataSource={this.props.titles}
            onUpdateInput={this.handleUpdateInput}
            searchText={this.props.search}
            filter={this.filterSearch}
            maxSearchResults={10}
            onNewRequest={() => this.props.history.push(this.getSearchUrl())}
          />
        </div>
        <Link to={this.getSearchUrl()}>
          <FlatButton>
            <div className="fa fa-search"/>
          </FlatButton>
        </Link>
      </div>
    );
  }
}

_SearchBar.propTypes = {
  mmActions: PropTypes.object,
  search: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string,
  filters: PropTypes.object,
};

_SearchBar.defaultProps = {
  path: "/movies",
};

function mapStateToProps(state) {
  return {
    search: state.search,
    titles: state.titles,
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_SearchBar));
