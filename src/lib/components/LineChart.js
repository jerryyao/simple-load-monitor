import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import cx from 'classnames';
import classes from './lineChart.css';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    const { width, height, margin } = props;
    const x = d3.scaleTime()
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleLinear()
      .range([height - margin.top - margin.bottom, 0]);

    const xAxis = d3.axisBottom(x).tickArguments([5, d3.timeFormat('%I:%M:%S')]);
    const yAxis = d3.axisLeft(y).tickArguments(5);

    this.state = { x, y, xAxis, yAxis };
  }

  componentWillMount() {
    const x = this.state.x.domain(d3.extent(this.props.data, d => d.date));
    const y = this.state.y.domain(this.props.yDomain);
    this.setState({ x, y });
  }

  componentWillReceiveProps(nextProps) {
    const x = this.state.x.domain(d3.extent(nextProps.data, d => d.date));
    const y = this.state.y.domain(nextProps.yDomain);
    this.setState({ x, y });
  }

  componentDidMount() {
    const { height, margin } = this.props;
    const { xAxis, yAxis } = this.state;

    // Add the X Axis
    d3.select(this.svg).append('g')
      .attr('class', cx(classes.axis, classes.xAxis))
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis);

    // Add the Y Axis
    d3.select(this.svg).append('g')
      .attr('class', cx(classes.axis, classes.yAxis))
      .call(yAxis)
      .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Load Average');
  }

  componentDidUpdate() {
    // Update the axes
    const { xAxis, yAxis } = this.state;
    const svg = d3.select(this.svg).transition();
    svg.select(`.${classes.xAxis}`)
      .duration(100)
      .call(xAxis);
    svg.select(`.${classes.yAxis}`)
      .duration(100)
      .call(yAxis);
  }

  _renderLine = () => {
    const { data } = this.props;
    const { x, y } = this.state;

    // Add the valueline path.
    const valueline = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.loadavg));
    return valueline(data);
  }

  render() {
    const { width, height, margin } = this.props;
    const d = this._renderLine();
    return (
      <svg
        width={width}
        height={height}
      >
        <g
          ref={ref => { this.svg = ref; }}
          transform={`translate(${margin.left},${margin.top})`}
        >
          <path
            className={classes.line}
            d={d}
          />
        </g>
      </svg>
    );
  }
}

LineChart.defaultProps = {
  width: 600,
  height: 300,
  margin: { top: 20, right: 20, bottom: 30, left: 50 },
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  yDomain: PropTypes.array.isRequired,
};

export default LineChart;
