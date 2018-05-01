import React from "react";
import PropTypes from 'prop-types';

import '../../styles/charts/metadata_chart';
import thumbUp from "../../images/thumb-up.png";
import thumbDown from "../../images/thumb-down.png";

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

    console.log(!jsonMod);

    if (!jsonMod){
      return;
    }

    if (jsonMod["passes"]){
      var pic = svg.append("svg:image")
      .attr('x', 100)
      .attr('y', - imageHeight)
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr("xlink:href", thumbUp)
      .attr("class", "bechdel");

      pic.transition().duration(1000)
      .attr("y", (svgHeight - imageHeight) / 3);
    }
    else {
      var pic = svg.append("svg:image")
      .attr('x', 100)
      .attr('y', - imageHeight)
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr("xlink:href", thumbDown)
      .attr("class", "bechdel");

      pic.transition().duration(1000)
      .attr("y", (svgHeight - imageHeight) / 3);
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

  renderConversation() {
    const data = this.props.movie.bechdel_metadata;
    if (!data.passes) {
      return null;
    }

    return (
      <p className="conversation">
        <i>{data.conversation[0].speaker}</i>: {data.conversation[0].utterance}<br />
        <i>{data.conversation[1].speaker}</i>: {data.conversation[1].utterance}
      </p>
    );
  }

  render() {
    return (
      <div className="chart">
        <svg ref={node => this.node = node} />
        {this.renderConversation()}
        <p className="description">A movie passes the Bechdel test if it has a conversation between two named female characters talking about something other than a man.<br/><i>Disclaimer: May not be accurate</i></p>
      </div>
    );
  }
}

BechdelChart.propTypes = {
  movie: PropTypes.object,
};
