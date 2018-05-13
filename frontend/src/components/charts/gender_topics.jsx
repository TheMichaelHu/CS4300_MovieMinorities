import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class GenderTopicsChart extends React.PureComponent {
  renderTopics(group1, group2, n) {
    const genderKey = [group1.toLowerCase(), "/", group2.toLowerCase()].join("");
    const topics = this.props.movie.empath_metadata.gender_category_metadata[genderKey];
    console.log(this.props.movie.empath_metadata.gender_category_metadata);
    console.log(genderKey);
    console.log(topics)

    const lightGreen = "#43A047";
    const green = "#388E3C";
    const darkGreen = "#2E7D32";

    const g1Color = group1 === "Male" ? lightGreen : darkGreen;
    const g2Color = group2 === "Male" ? lightGreen : darkGreen;
    let topicColor = g1Color;

    if (group1 != group2) {
      topicColor = green;
    }

    return (
      <div className="topics" style={{color: topicColor}}>
        <h3>
          <span style={{color: g1Color}}>{group1}</span>/<span style={{color: g2Color}}>{group2}</span>
        </h3>
        <ol>
          {
            topics.map(topic => (
              <li>{topic}</li>
            ))
          }
        </ol>
      </div>
    );
  }

  render() {
    const chartStyle = {
      width: 750,
      height: 750,
      backgroundColor: "#eee",
      textAlign: "center",
      fontFamily: "Roboto",
      color: "#388E3C",
    };

    return (
      <div className="chart" style={chartStyle}>
        <h1 style={{fontWeight: 500, fontSize: 30, paddingTop: 25}}>
          GENDER CONVERSATION TOPICS
        </h1>
        <div className="row" style={{padding: "40px 0", margin: 20, backgroundColor: "#ddd"}}>
          <div className="col-xs-4">
            {this.renderTopics("Male", "Male", 5)}
          </div>
          <div className="col-xs-4">
            {this.renderTopics("Male", "Female", 5)}
          </div>
          <div className="col-xs-4">
            {this.renderTopics("Female", "Female", 5)}
          </div>
        </div>
        <p className="description">Top 10 topics brought up in conversations between different pairs of genders.</p>
      </div>
    );
  }
}

GenderTopicsChart.propTypes = {
  movie: PropTypes.object,
};
