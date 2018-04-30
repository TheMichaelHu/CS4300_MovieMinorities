import React from "react";
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

import '../styles/filter_bar';

class _FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(filter) {
    return (event, index, value) => {
      this.props.mmActions.setFilters({[filter]: value});
    };
  }

  handleReset() {
    this.props.mmActions.resetFilters();
  }

  renderCategory() {
    const categories = ['action', 'adventure', 'animation', 'comedy', 'crime', 'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery', 'romance', 'science fiction', 'thriller', 'war', 'western'];

    return (
      <div className="genre-filter filter">
        <DropDownMenu
          value={this.props.category}
          onChange={this.handleChange("category")}
        >
          <MenuItem value={-1} primaryText="Genre" />
          {
            categories.map(cat =>
              <MenuItem value={cat} primaryText={cat} key={cat} />)
          }
        </DropDownMenu>
      </div>
    );
  }

  renderGender() {
    return (
      <div className="gender-filter filter">
        Female Lines:
        <DropDownMenu
          value={this.props.gender1}
          onChange={this.handleChange("gender1")}
        >
          {
            [...Array(11).keys()].map(x =>
              <MenuItem value={x} primaryText={`${x * 10}%`} key={x} />)
          }
        </DropDownMenu>
        to
        <DropDownMenu
          value={this.props.gender2}
          onChange={this.handleChange("gender2")}
        >
          {
            [...Array(11).keys()].map(x =>
              <MenuItem value={x} primaryText={`${x * 10}%`} key={x} />)
          }
        </DropDownMenu>
      </div>
    );
  }

  renderEthnicity() {
    return (
      <div className="ethnicity-filter filter">
        Minority Lines:
        <DropDownMenu
          value={this.props.ethnicity1}
          onChange={this.handleChange("ethnicity1")}
        >
          {
            [...Array(11).keys()].map(x =>
              <MenuItem value={x} primaryText={`${x * 10}%`} key={x} />)
          }
        </DropDownMenu>
        to
        <DropDownMenu
          value={this.props.ethnicity2}
          onChange={this.handleChange("ethnicity2")}
        >
          {
            [...Array(11).keys()].map(x =>
              <MenuItem value={x} primaryText={`${x * 10}%`} key={x} />)
          }
        </DropDownMenu>
      </div>
    );
  }

  renderBechdel() {
    return (
      <div className="bechdel-filter filter">
        <DropDownMenu
          value={this.props.bechdel}
          onChange={this.handleChange("bechdel")}
        >
          <MenuItem value={-1} primaryText="Bechdel Test" />
          <MenuItem value={1} primaryText="Pass" />
          <MenuItem value={0} primaryText="Fail" />
        </DropDownMenu>
      </div>
    );
  }


  render() {
    return (
      <Paper className="filter-bar">
        {this.renderCategory()}
        {this.renderGender()}
        {this.renderEthnicity()}
        {this.renderBechdel()}
        <div className="reset-btn">
          <FlatButton label="Reset" onClick={this.handleReset} />
        </div>
      </Paper>
    );
  }
}

_FilterBar.propTypes = {
  mmActions: PropTypes.object,
  category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gender1: PropTypes.number,
  gender2: PropTypes.number,
  ethnicity1: PropTypes.number,
  ethnicity2: PropTypes.number,
  bechdel: PropTypes.number,
};

function mapStateToProps(state) {
  return state.filters;
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const FilterBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FilterBar);
