import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class MetadataChart extends React.PureComponent {
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
    const jsonMod = this.props.movie.distribution_metadata.gender_dist;
    const categories = ["By movie", "By line"];
    const categoryColors = ["#03353e", "#0294a5"];

    const len = Object.keys(jsonMod).length;
    const svgWidth = 1000;
    const svgHeight = 1000;
    const svg = d3.select(node)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar");


    const maxOffset = 0.9 * 600;

    // scale
    const yScale = d3.scaleLinear()
    .domain([0, 1])
    // percentage between 0 and 1
    .range([0, maxOffset]);

    const yScaleCopy = d3.scaleLinear()
    .domain([0, 1])
    // percentage between 0 and 1
    .range([maxOffset, 0]);

    // var pushX = 120;
    // var pushY = 60;

    const interBarSpace = 100;
    const barWidth = 40;

    const ctr = 0;

    const flag = 0;
    const bars;

    // plot bars

    for (let ind in jsonMod) {

        // console.log(ind);
        const jsonData = jsonMod[ind];

        const entries = Object.entries(jsonData);
        console.log(entries);

        if (flag == 0) {
            var yMax = d3.max(entries, function (d, i) { return d[1]; });
            flag++;
        }

        // data join
        bars = svg.selectAll("#rect" + ind)
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

    };

    // x-axis titles
    pushX = 270;

    bars
    .append("text")
    .text( function(d, i) { return entries[i][0]; } )
    .attr("x", function(d, i) { return pushX + interBarSpace * i; })
    .attr("y", function(d, i) { return pushY - 5 + yScale(yMax) + 20; })
    .attr("fill", "black")
    .style("font-size", 14);

    // legend

    var pushTextX = 270;
    var pushTextY = 300;

    var legendBarSize = 20;

    var yAxis = d3.axisRight(yScaleCopy);

    svg.append('g')
    .attr("id", "g_x")
    .attr('transform', 'translate(' + (pushX - 75) + ', 120) scale(0.75, 0.75)')
    .call(yAxis);


    categories.forEach( function(d, ind) {


        bars
        .append("text")
        .text( function(d) { return categories[ind]; } )
        .attr("x", function(d) { return pushTextX + interBarSpace * (entries.length + 1); })
        .attr("y", function(d) { return pushTextY + 25 * ind; })
        .attr("fill", "black")
        .style("font-size", 18);


        bars
        .append("rect")
        .attr("width", legendBarSize)
        .attr("height", legendBarSize)
        .attr("x", function(d) { return pushTextX + interBarSpace * (entries.length + 1) - 25; })
        .attr("y", function(d) { return pushTextY + 25 * ind - 15; })
        .attr("fill", function(d) {return categoryColors[ind]; })
        .style("font-size", 18);

    } );

  }

  render() {
    return (
      <div className="metadata-chart">
        <svg ref={node => this.node = node} width={1000} height={1000} />
      </div>
    );
  }
}

MetadataChart.propTypes = {
  movie: PropTypes.object,
};
