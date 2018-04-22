import React from "react";
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mmActions from '../actions/mm_actions';

// import '../styles_1/search_bar';

export class _VersionDropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.mmActions.setVersion(value);
  }
  
  render() {
    return (
      <div className="version-selector" style={{display: "inline"}}>
        <DropDownMenu
          value={this.props.version}
          onChange={this.handleChange}
        >
          <MenuItem value={0} primaryText="Default Version" />
          <MenuItem value={1} primaryText="Version 1 (P03)" />
        </DropDownMenu>
      </div>
    );
  }

}

_VersionDropdown.propTypes = {
  mmActions: PropTypes.object,
  version: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    version: state.version,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mmActions: bindActionCreators(mmActions, dispatch)
  };
}

export const VersionDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(_VersionDropdown);
