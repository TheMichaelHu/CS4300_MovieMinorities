import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';

export class BechdelChart extends React.PureComponent {
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
    const jsonMod = this.props.movie.bechdel_metadata;
    
    const svgWidth = 750;
    const svgHeight = 750;
    const imageWidth = 300;
    const imageHeight = 300;
    const svg = d3.select(node)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bechdel");
    const maxOffset = 0.9 * 600;


    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([1, maxOffset]);

    const yScaleCopy = d3.scaleLinear()
    .domain([0, 1])
    .range([maxOffset, 1]);

    const headingText = "BECHDEL TEST";
    const headingTextColor = "#00007f";
    
    if (!jsonMod){
      return;
    }

    if (jsonMod["passes"]){
      var pic = svg.append("svg:image")
      .attr('x', 100)
      .attr('y', - imageHeight)
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr("xlink:href", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ987IyzCyYCukTrS0Ajo4gTzsy1LdHewT4pOTZcfCXgUC-68DX")
      .attr("class", "bechdel");

      pic.transition().duration(1000)
      .attr("y", svgHeight / 2 - imageHeight / 2);
    }
    else {
      var pic = svg.append("svg:image")
      .attr('x', 100)
      .attr('y', - imageHeight)
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr("xlink:href", "http://www.iconsplace.com/icons/preview/red/thumbs-down-256.png")
      .attr("class", "bechdel");

      pic.transition().duration(1000)
      .attr("y", svgHeight / 2 - imageHeight / 2);
    }

    svg
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
      <div className="metadata-chart">
        <svg ref={node => this.node = node} />
      </div>
    );
  }
}

BechdelChart.propTypes = {
  movie: PropTypes.object,
};
