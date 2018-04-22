import React from "react";
import PropTypes from 'prop-types';
import { MetadataChart } from "./charts/metadata_chart";
import { ScreenTimeChart } from "./charts/screen_time_chart";

// import '../styles/logo';

export class ChartsVc extends React.PureComponent {
  renderMultiCol() {
    return (
      <div className="charts-wrapper row">
        <div className="col-xs-12 col-md-6">
          <MetadataChart movie={this.props.movie} />
        </div>
        <div className="col-xs-12 col-md-6">
          <ScreenTimeChart movie={this.props.movie} />
        </div>
      </div>
    );
  }

  renderSingleCol() {
    return (
      <div className="charts-wrapper" style={{overflow: "hidden"}}>
        <MetadataChart movie={this.props.movie} />
        <ScreenTimeChart movie={this.props.movie} />
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
