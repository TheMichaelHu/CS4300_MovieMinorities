import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class RaceChart extends React.PureComponent {
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
    const jsonMod = this.props.movie.distribution_metadata.race_dist;
    const categories = ["By character", "By line"];
    const categoryColors = ["#DFCFFC", "#997DCA", "#633FA2", "#300D6E"];

    const len = Object.keys(jsonMod).length;
    const svgWidth = 750;
    const svgHeight = 750;
    const svg = d3.select(node)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bar");
    const maxOffset = 0.9 * 600;

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([1, maxOffset]);

    const yScaleCopy = d3.scaleLinear()
    .domain([0, 1])
    .range([maxOffset, 1]);

    const headingText = "RACE DISTRIBUTION";
    const headingTextColor = "#00007f";

    let pushX = 100;
    const pushY = 260;
    const interBarSpace = 120;
    const barWidth = 30;
    let ctr = 0;
    let flag = 0;
    let bars;

    // plot bars
    for (var ind in jsonMod) {
        var jsonData = jsonMod[ind];
        var entries = Object.entries(jsonData);

        if (flag == 0) {
            var yMax = d3.max(entries, (d, i) => { return d[1]; });
            flag++;
        }

        // data join
        bars = svg.selectAll("#rect" + ind)
          .data(entries)
          .enter();

        const div = d3.select(".metadata-chart").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        // tool tip
        bars.append("rect")
          .attr("width", barWidth)
          .attr("height", (d, i) => { return yScale(entries[i][1]) * .75; })
          .attr("x",  (d, i) => { return pushX + 15 + interBarSpace * ctr + barWidth * i; })
          .attr("y", (d, i) => { return pushY - 267 + maxOffset - yScale(entries[i][1]) * .75; })
          .attr("fill", (d, i) => { return categoryColors[i];})
          .on("mouseover", function(d) {

            const rect = d3.select(this)._groups[0][0]
            const rectX = Number(rect.attributes["x"].nodeValue);
            const rectY = Number(rect.attributes["y"].nodeValue);
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
    };

    // x-axis titles

    bars
      .append("text")
      .text((d, i) => { console.log(i); console.log(categories[i]); return categories[i]; } )
      .attr("x",(d, i) => { return pushX - 50 + (interBarSpace + 53) * i; })
      .attr("y",(d, i) => { return pushY - 260 + maxOffset + 20; })
      .attr("fill", "black")
      .style("font-size", 18);

    const pushTextX = 270;
    const pushTextY = 300;
    const legendBarSize = 20;

    const yAxis = d3.axisLeft(yScaleCopy);

    svg.append('g')
    .attr("id", "g_x")
    .attr('transform', 'translate(' + (pushX - 120) + ',' + (pushY - 135) + ') scale(0.75, 0.75)')
    .style('font-size', 18)
    .call(yAxis);
    
    if (Object.keys(jsonMod.by_line).length == 1){
      bars
      .append("text")
      .text((d, i) => { return categories[1]; } )
      .attr("x",(d, i) => { return pushX - 50 + (interBarSpace + 53) * 1; })
      .attr("y",(d, i) => { return pushY - 260 + maxOffset + 20; })
      .attr("fill", "black")
      .style("font-size", 18);
    }

    // legend
    entries.forEach((d, ind) => {
      bars
        .append("text")
        .text( d => { return entries[ind][0]; } )
        .attr("x", d => { return pushTextX - 300 + interBarSpace * 4; })
        .attr("y", d => { return pushTextY - 80 + 25 * ind; })
        .attr("fill", "black")
        .style("font-size", 18);

      bars
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", d => { return pushTextX - 310 + interBarSpace * 4 - 15; })
        .attr("y", d => { return pushTextY - 80 + 25 * ind - 15; })
        .attr("fill", d => {return categoryColors[ind]; })
        .style("font-size", 18);
    });

    bars
      .append("text")
      .text( d => { return headingText; })
      .attr("x", d => { return 150; })
      .attr("y", d => { return 50; })
      .attr("fill", d => { return headingTextColor; })
      .style("font-family", "Roboto")
      .style("font-weight", 500)
      .style("font-size", 30);

  }

  render() {
    return (
      <div className="chart">
        <svg ref={node => this.node = node} />
        <p className="description">
          <b>By character</b>: percentage of characters of a race<br />
          <b>By line</b>: percentage of lines spoken by a race<br />
        </p>
      </div>
    );
  }
}

RaceChart.propTypes = {
  movie: PropTypes.object,
};
