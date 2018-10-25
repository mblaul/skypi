import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class TimegraphPressure extends Component {
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
          label: 'Pressure',
          data: [
            this.props.weatherLogs[4].pressure,
            this.props.weatherLogs[3].pressure,
            this.props.weatherLogs[2].pressure,
            this.props.weatherLogs[1].pressure,
            this.props.weatherLogs[0].pressure
          ],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['rgba(0, 102, 255, .7)'],
          borderWidth: 2,
          pointRadius: 2
        }
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
