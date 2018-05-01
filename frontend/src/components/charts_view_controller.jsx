import React from "react";
import PropTypes from 'prop-types';
import { MetadataChart } from "./charts/metadata_chart";
import { ScreenTimeChart } from "./charts/screen_time_chart";
import { RaceChart } from "./charts/race_chart";
import { BechdelChart } from "./charts/bechdel";
import { EmpathGenderChart } from "./charts/empath_gender";
import { EmpathRaceChart } from "./charts/empath_race";

export class ChartsVc extends React.PureComponent {
  renderMultiCol() {
    return (
    <div className="contain">
      <div className="charts-wrapper row">
        <div className="col-xs-12 col-md-6">
          <MetadataChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <ScreenTimeChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <RaceChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <BechdelChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <EmpathGenderChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <EmpathRaceChart movie={this.props.movie} />
        </div>
      </div>
    </div>
    );
  }

  renderSingleCol() {
    return (
      <div className="charts-wrapper" style={{overflow: "hidden"}}>
        <MetadataChart movie={this.props.movie} />
        <ScreenTimeChart movie={this.props.movie} />
        <RaceChart movie={this.props.movie} />
        <BechdelChart movie={this.props.movie} />
        <EmpathGenderChart movie={this.props.movie} />
        <EmpathRaceChart movie={this.props.movie} />
      </div>
    );
  }

  render() {
    if (this.props.single) {
      return this.renderSingleCol();
    }
    return this.renderMultiCol();
  }
}

ChartsVc.propTypes = {
  movie: PropTypes.object.isRequired,
  single: PropTypes.bool,
};

ChartsVc.defaultProps = {
  single: false,
};
