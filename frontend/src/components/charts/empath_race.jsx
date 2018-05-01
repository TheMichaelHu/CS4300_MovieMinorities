import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class EmpathRaceChart extends React.PureComponent {
  constructor(props){
      super(props)
      this.createChart = this.createChart.bind(this)
   }
   componentDidMount() {
      this.createChart()
   }
   componentDidUpdate() {
      this.createChart()
   }

  createChart() {
    if (!this.props.movie) {
      return null;
    }

    const node = this.node;
    const j = this.props.movie.empath_metadata.race_emotion_metadata;

    const races = this.props.movie.distribution_metadata.race_dist.by_line;

     var categories = Object.keys(j).sort(function(a, b) {
        return races[b] - races[a];
    });

    categories = categories.slice(0,2);

    const categoryColors = ["#DFCFFC", "#997DCA", "#633FA2", "#300D6E"];

    const jsonMod = this.props.movie.empath_metadata.race_emotion_metadata[categories[0]];
    const jsonMod2 = this.props.movie.empath_metadata.race_emotion_metadata[categories[1]];

    var legendBarSize = 20;

    const headingText = "EMOTION OF LINES BY RACE";
    const headingTextColor = "#00007f";

    var jsonMod3 = {}
    for (var ind in jsonMod){
      if (jsonMod2){
        jsonMod3[ind] = jsonMod2[ind] - jsonMod[ind] / (jsonMod2[ind]+0.00001);
      } else {
        jsonMod3[ind] = 1
      }
    }

    var result = Object.keys(jsonMod3).sort(function(a, b) {
        return jsonMod3[b] - jsonMod3[a];
    })

    jsonMod3 = {}


    const len = Object.keys(jsonMod).length;
    const svgWidth = 750;
    const svgHeight = 750;
    const barHeight = 40;
    const svg = d3.select(node)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bar");

    var barScale = d3.scaleLinear().domain([0,1]).range([0,350]);
    var barScale2 = d3.scaleLinear().domain([0,1]).range([350,0]);
    var ctr = 0;

    for (var key in result){
        svg.append("rect")
            .attr("width", barScale(jsonMod[result[key]]))
            .attr("height", barHeight)
            .attr("x", svgWidth / 2)
            .attr("y", 100 + (barHeight + 5) * ctr )
            .attr("fill", categoryColors[Object.keys(races).indexOf(categories[0])]);
        if (categories.length >= 2){
          svg.append("rect")
              .attr("width", barScale(jsonMod2[result[key]]))
              .attr("height", barHeight)
              .attr("x", svgWidth / 2 - barScale(jsonMod2[result[key]]))
              .attr("y", 100 + (barHeight + 5) * ctr)
              .attr("fill", categoryColors[Object.keys(races).indexOf(categories[1])]);
        }

        svg
                    .append("text")
                    .text( result[key] )
                    .attr("x", svgWidth / 2 + barScale(jsonMod[result[key]]) + 10 ) // change
                    .attr("y", 120 + (barHeight + 5) * ctr)
                    .attr("fill", "black")
                    .style("font-size", 18);

        ctr++;

    }



    var xAxis = d3.axisBottom(barScale);
    var xAxis2 = d3.axisBottom(barScale2)

    svg.append('g')
    .attr("id", "g_x")
    .attr('transform', 'translate(' + (svgWidth/2) + ',' + (95 + (barHeight + 5) * ctr) + ')')
    .style("font-size", 18)
    .call(xAxis);

    if (categories.length >= 2){
      svg.append('g')
      .attr("id", "g_x2")
      .attr('transform', 'translate(' + 25 + ',' + (95 + (barHeight + 5) * ctr) + ')')
      .style("font-size", 18)
      .call(xAxis2);
    };

    // legend
    categories.forEach((d, ind) => {
      svg
        .append("text")
        .text( d => { return categories[ind]; } )
        .attr("x", 625)
        .attr("y", d => { return 30 + 25 * ind; })
        .attr("fill", "black")
        .style("font-size", 18);

      svg
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", 600)
        .attr("y", d => { return 15 + 25 * ind; })
        .attr("fill", d => {return categoryColors[Object.keys(races).indexOf(categories[ind])]; })
        .style("font-size", 18);
    });

    svg
    .append("text")
      .text(headingText)
      .attr("x", 180)
      .attr("y", 50)
      .attr("fill", headingTextColor)
      .style("font-family", "Roboto")
      .style("font-weight", 500)
      .style("font-size", 30);

  }

  render() {
    return (
      <div className="chart" id="empath-race">
        <svg ref={node => this.node = node} />
        <p className="description">Emotions by how pervasive they are in lines from a race</p>
      </div>
    );
  }
}

EmpathRaceChart.propTypes = {
  movie: PropTypes.object,
};
