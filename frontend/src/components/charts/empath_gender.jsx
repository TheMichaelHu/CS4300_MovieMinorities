import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class EmpathGenderChart extends React.PureComponent {
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
    const jsonMod = this.props.movie.empath_metadata.gender_emotion_metadata.female;
    const jsonMod2 = this.props.movie.empath_metadata.gender_emotion_metadata.male;

    var legendBarSize = 20;

    const headingText = "EMOTION OF LINES BY GENDER";
    const headingTextColor = "#00007f";

    var jsonMod3 = {}
    for (var ind in jsonMod){
        jsonMod3[ind] = jsonMod2[ind] - jsonMod[ind] / (jsonMod2[ind] + 0.000001);
    }

    var result = Object.keys(jsonMod3).sort(function(a, b) {
        return jsonMod3[b] - jsonMod3[a];
    })

    jsonMod3 = {}

    console.log(result);

    const len = Object.keys(jsonMod).length;
    const svgWidth = 750;
    const svgHeight = 750;
    const barHeight = 40;
    const svg = d3.select(node)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bar");

    const categories = ["female", "male"]
    const categoryColors = ["#03353e", "#0294a5", "#0EBFE9"];

    var barScale = d3.scaleLinear().domain([0,1]).range([0,350]);
    var barScale2 = d3.scaleLinear().domain([0,1]).range([350,0]);
    var ctr = 0;

    console.log(barScale(.5))

    for (var key in result){

        svg.append("rect")
            .attr("width", barScale(jsonMod[result[key]]))
            .attr("height", barHeight)
            .attr("x", svgWidth / 2)
            .attr("y", 100 + (barHeight + 5) * ctr )
            .attr("fill", "#03353e");

        svg.append("rect")
            .attr("width", barScale(jsonMod2[result[key]]))
            .attr("height", barHeight)
            .attr("x", svgWidth / 2 - barScale(jsonMod2[result[key]]))
            .attr("y", 100 + (barHeight + 5) * ctr)
            .attr("fill", "#0294a5");

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

    svg.append('g')
    .attr("id", "g_x2")
    .attr('transform', 'translate(' + 25 + ',' + (95 + (barHeight + 5) * ctr) + ')')
    .style("font-size", 18)
    .call(xAxis2);

    // legend
    categories.forEach((d, ind) => {
      svg
        .append("text")
        .text( d => { console.log(categories[ind]); return categories[ind]; } )
        .attr("x", 675)
        .attr("y", d => { return 30 + 25 * ind; })
        .attr("fill", "black")
        .style("font-size", 18);

      svg
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", 650)
        .attr("y", d => { return 15 + 25 * ind; })
        .attr("fill", d => {return categoryColors[ind]; })
        .style("font-size", 18);
    });

    svg
    .append("text")
      .text(headingText)
      .attr("x", 150)
      .attr("y", 50)
      .attr("fill", headingTextColor)
      .style("font-family", "Roboto")
      .style("font-weight", 500)
      .style("font-size", 30);

  }

  render() {
    return (
      <div className="chart" id="empath-gender">
        <svg ref={node => this.node = node} />
        <p className="description">Emotions by how pervasive they are in lines from a gender</p>
      </div>
    );
  }
}

EmpathGenderChart.propTypes = {
  movie: PropTypes.object,
};
