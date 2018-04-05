import React from "react";
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class FilterBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      val1: 1,
      val2: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(filter) {
    if (filter == "val1") {
      return (event, index, value) => this.setState({val1: value});
    }
    return (event, index, value) => this.setState({val2: value});
  }

  render() {
    return (
      <Paper className="filter-bars">
        <DropDownMenu
          value={this.state.val1}
          onChange={this.handleChange("val1")}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>
        <DropDownMenu
          value={this.state.val2}
          onChange={this.handleChange("val2")}
        >
          <MenuItem value={1} primaryText="Custom width" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>
      </Paper>
    );
  }

}
