import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import classes from './lineChart.css';

class LineChart extends React.Component {
  state = {
    x: null,
    y: null,
  }

  componentWillReceiveProps(nextProps) {
    const { data, width, height } = nextProps;
    data.forEach((d) => {
      d.date = new Date(d.timestamp);
    });
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.loadavg)])
      .range([height, 0]);

    this.setState({ x, y });
  }

  componentDidMount() {
    const { x, y } = this.state;

    // Add the X Axis
    const xAxis = d3.axisBottom(x).tickArguments(5);
    d3.select(this.svg).append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0,${this.props.height})`)
      .call(xAxis);

    // Add the Y Axis
    const yAxis = d3.axisLeft(y).tickArguments(5);
    d3.select(this.svg).append('g')
      .attr('class', 'yAxis')
      .call(yAxis)
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Load Average");
  }

  componentDidUpdate() {
    const { x, y } = this.state;

    // // Add the X Axis
    // const xAxis = d3.axisBottom(x).tickArguments(5);
    // d3.select(this.svg).append('g')
    //   .attr('class', 'x axis')
    //   .attr('transform', `translate(0,${this.props.height})`)
    //   .call(xAxis);

    // Add the Y Axis
    const yAxis = d3.axisLeft(y).tickArguments(5);
    const svg = d3.select(this.svg).transition();
    svg.select('.yAxis').call(yAxis);
  }

  _renderLine = () => {
    const { data } = this.props;
    const { x, y } = this.state;

    data.forEach((d) => {
      d.date = new Date(d.timestamp);
    });

    // Add the valueline path.
    const valueline = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.loadavg));
    return valueline(data);
  }

  render() {
    const d = this._renderLine();
    const xTicks = null;
    return (
      <svg
        width={600}
        height={300}
      >
        <g ref={ref => { this.svg = ref; }} >
          <g>
            <path />
            {xTicks}
          </g>
          <path
            className={classes.line}
            d={d}
            transform={`translate(${20},${20})`}
          />
        </g>
      </svg>
    );
  }
}

LineChart.defaultProps = {
  width: 600,
  height: 300,
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LineChart;
