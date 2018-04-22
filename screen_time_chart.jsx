import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/screen_time_chart';

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

    // length is 2
    const len = Object.keys(jsonMod).length;

    const svgWidth = 1000;
    const svgHeight = 1000;

    const svg = d3.select(node)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar");

    var maxOffset = 0.9 * 600;

    // scale
    var yScale = d3.scaleLinear()
    .domain([0, 1])
    // percentage between 0 and 1
    .range([0, maxOffset]);

    var yScaleCopy = d3.scaleLinear()
    .domain([0, 1])
    // percentage between 0 and 1
    .range([maxOffset, 0]);

    // var pushX = 120;
    // var pushY = 180;

    var interBarSpace = 60;
    var barWidth = 40;

    var ctr = 0;

    var flag = 0;
    var bars;

    // plot bars

      var yMax = d3.max(entries, function (d, i) { return d[1]; });

        // data join
        bars = svg.selectAll("#rect")
        .data(entries)
        .enter();

        var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

        // tool tip
        bars.append("rect")
        .attr("width", barWidth)
        .attr("height", function(d, i) {return yScale(entries[i][1]); })
        .attr("x", function (d, i) { return pushX + interBarSpace * i; })
        .attr("y", function (d, i) { return pushY + yScale(yMax) - yScale(entries[i][1]); })
        .attr("fill", categoryColors[ctr])
        .on("mouseover", function(d) {
            let rect = d3.select(this)._groups[0][0]
            let rectX = Number(rect.attributes["x"].nodeValue) + 10;
            let rectY = Number(rect.attributes["y"].nodeValue);
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div.html(Math.round(Number(d[1] * 100) * 100) / 100 + "%")
            .style("left", rectX + "px")
            .style("top", rectY - 10 + "px");
        })
        .on("mouseout", function(d) {
        div.transition()
        .duration(500)
        .style("opacity", 0);
        });

        pushX += barWidth;

        ctr++;

    // x-axis titles

    bars
    .append("text")
    .text( function(d, i) { return entries[i][0]; } )
    .attr("x", function(d, i) { return pushX + interBarSpace * i - 20; })
    .attr("y", function(d, i) { return pushY + yScale(yMax) - yScale(entries[i][1]) - 10; })
    .attr("transform", function(d, i) {
        let x = pushX + interBarSpace * i - 20;
        let y = pushY + yScale(yMax) - yScale(entries[i][1]) - 10;

        return "rotate(-90," + x + "," + y + ")";
    })
    .attr("fill", "black")
    .style("font-size", 14);

    // legend

    var pushTextX = pushX;
    var pushTextY = pushY;

    var legendBarSize = 20;

    var yAxis = d3.axisRight(yScaleCopy);

    svg.append('g')
    .attr("id", "g_x")
    .attr('transform', 'translate(' + (pushX - 75) + ', 40) scale(0.75, 0.75)')
    .call(yAxis);

    categories.forEach( function(d, ind) {

        bars
        .append("text")
        .text( function(d) { return categories[ind]; } )
        .attr("x", function(d) { return pushTextX + interBarSpace * (entries.length + 1) - 20; })
        .attr("y", function(d) { return pushTextY + 25 * ind; })
        .attr("fill", "black")
        .style("font-size", 18);


        bars
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", function(d) { return pushTextX + interBarSpace * (entries.length + 1) - 45; })
        .attr("y", function(d) { return pushTextY + 25 * ind - 15; })
        .attr("fill", function(d) {return categoryColors[ind]; })
        .style("font-size", 18);

      });

}

  render() {
    return (
      <div className="screen-time-chart">
        <svg ref={node => this.node = node} />
      </div>
    );
  }
}

ScreenTimeChart.propTypes = {
  movie: PropTypes.object,
};
