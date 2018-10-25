import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class TimegraphTemperature extends Component {
  render() {
    const moment = require('moment');
    const data = {
      labels: [
        moment(this.props.weatherLogs[4].date).format("h:mm A"), 
        moment(this.props.weatherLogs[3].date).format("h:mm A"), 
        moment(this.props.weatherLogs[2].date).format("h:mm A"), 
        moment(this.props.weatherLogs[1].date).format("h:mm A"), 
        moment(this.props.weatherLogs[0].date).format("h:mm A")
      ],
      datasets: [
        {
          label: 'Temperature',
          data: [
            this.props.weatherLogs[4].temperature,
            this.props.weatherLogs[3].temperature,
            this.props.weatherLogs[2].temperature,
            this.props.weatherLogs[1].temperature,
            this.props.weatherLogs[0].temperature
          ],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['rgba(200, 20, 20, .7)'],
          borderWidth: 2,
          pointRadius: 2
        },
      ],
      xAxisID: 'x-axis'
    };
    const options = {
      responsive: true,
    };

    return (
      <div className="mt-5">
        <Line data={data} options={options} />
      </div>
    );
  }
}
