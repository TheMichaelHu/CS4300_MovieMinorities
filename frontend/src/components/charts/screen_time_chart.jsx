import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class ScreenTimeChart extends React.PureComponent {
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
    const jsonMod = this.props.movie.char_metadata;
    const arr_entries = Object.entries(jsonMod);
    let entries = [];

    for (let actors in arr_entries) {
        entries.push([arr_entries[actors][0], arr_entries[actors][1]["screen_time"]]);
    };

    const categories = ["Screen Time"];
    const categoryColors = ["darkorange"];

    const headingText = "SCREEN TIME";
    const headingTextColor = "darkorange";

    // length is 2
    const len = Object.keys(jsonMod).length;

    // console.log(entries);

    entries.sort(function(a1, a2){
      return a2[1] - a1[1];
    });

    // console.log(entries.slice(0, 6));

    entries = entries.slice(0, 6);

    const svgWidth = 750;
    const svgHeight = 750;

    const svg = d3.select(node)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar");

    const maxOffset = 0.9 * 600;
    const yScale = d3.scaleLinear().domain([0, 1]).range([1, maxOffset]);
    const yScaleCopy = d3.scaleLinear().domain([0, 1]).range([maxOffset, 1]);

    let pushX = 100;
    const pushY = 240;
    const interBarSpace = 60;
    const barWidth = 30;
    let ctr = 0;
    const flag = 0;

    // plot bars
    const yMax = d3.max(entries, (d, i) => { return d[1]; });

    // data join
    let bars = svg.selectAll("#rect")
      .data(entries)
      .enter();

    const div = d3.select(".screen-time-chart").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // tool tip
    bars.append("rect")
      .attr("width", barWidth)
      .attr("height", (d, i) => {return yScale(entries[i][1]) * .75; })
      .attr("x", (d, i) => { return pushX + interBarSpace * i; })
      .attr("y", (d, i) => { return maxOffset - yScale(entries[i][1]) * .75; })
      .attr("fill", categoryColors[ctr])
      .on("mouseover", function(d) {
          var rect = d3.select(this)._groups[0][0];
          var rectX = Number(rect.attributes["x"].nodeValue);
          var rectY = Number(rect.attributes["y"].nodeValue);
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html(Math.round(Number(d[1] * 100) * 100) / 100 + "%")
            .style("left", rectX + "px")
            .style("top", rectY - 10 + "px")
            .style("height", "40px")
            .style("width", "40px")
            .style("font-size", "18px")
            .style("font-weight", "300")
            .style("color", "black");
      })
      .on("mouseout", d => {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    pushX += barWidth;
    ctr++;

    // x-axis titles
    pushX = 200 - 10;

    bars
      .append("text")
      .text( (d, i) => { return entries[i][0]; } )
      .attr("x", (d, i) => { return pushX + interBarSpace * i - 20; })
      .attr("y", (d, i) => { return pushY + 130 + yScale(yMax) - yScale(entries[i][1]) - 10; })
      .attr("transform", (d, i) => {
          var x = pushX + interBarSpace * i - 70;
          var y = pushY + 130 + yScale(yMax) - yScale(entries[i][1]) - 10;
          return "rotate(-90," + x + "," + y + ")";
      })
      .attr("fill", "black")
      .style("font-size", 18);

    const pushTextX = pushX;
    const pushTextY = pushY;
    const legendBarSize = 20;

    const yAxis = d3.axisLeft(yScaleCopy);

    svg.append('g')
    .attr("id", "g_x")
    .attr('transform', 'translate(' + (pushX - 140) + ',' + (pushY - 110) + ') scale(0.75, 0.75)')
    .style('font-size', 18)
    .call(yAxis);

    // legend
    categories.forEach((d, ind) => {
      bars
        .append("text")
        .text( d => { return categories[ind]; } )
        .attr("x", d => { return interBarSpace * (entries.length + 1 ) - 70; })
        .attr("y", d => { return 220; })
        .attr("fill", "black")
        .style("font-size", 18);

      bars
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", d => { return interBarSpace * (entries.length + 1) - 100; })
        .attr("y", d => { return 200; })
        .attr("fill", d => {return categoryColors[ind]; })
        .style("font-size", 18);
    });

    bars
      .append("text")
      .text( d => { return headingText; })
      .attr("x", d => { return 200; })
      .attr("y", d => { return 50; })
      .attr("fill", d => { return headingTextColor; })
      .style("font-family", "Bebas Neue")
      .style("font-weight", 500)
      .style("font-size", 20);

  }

  render() {
    return (
      <div className="chart">
        <svg ref={node => this.node = node} />
        <p className="description"><b>Screen time</b>: percentage of lines spoken by an actor</p>
      </div>
    );
  }
}

ScreenTimeChart.propTypes = {
  movie: PropTypes.object,
};
