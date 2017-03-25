import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import classes from './lineChart.css';

class LineChart extends React.Component {
  _renderLine = () => {
    const { data, width, height } = this.props;

    data.forEach((d) => {
      d.date = new Date(d.timestamp);
    });

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.loadavg)])
      .range([height, 0]);

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
