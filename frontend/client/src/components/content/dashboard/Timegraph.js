import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['0200', '0400', '0600', '0800', '1000', '1200', '1400'],
  datasets: [
    {
      label: 'Humidity',
      data: [
        this.props.weatherLogs[0].humidity,
        this.props.weatherLogs[1].humidity,
        this.props.weatherLogs[2].humidity,
        this.props.weatherLogs[3].humidity,
        this.props.weatherLogs[4].humidity
      ],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(0, 102, 255, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Temperature (F)',
      data: [
        this.props.weatherLogs[0].temperature,
        this.props.weatherLogs[1].temperature,
        this.props.weatherLogs[2].temperature,
        this.props.weatherLogs[3].temperature,
        this.props.weatherLogs[4].temperature
      ],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(200, 20, 20, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Wind Speed (mph)',
      data: [
        this.props.weatherLogs[0].wind,
        this.props.weatherLogs[1].wind,
        this.props.weatherLogs[2].wind,
        this.props.weatherLogs[3].wind,
        this.props.weatherLogs[4].wind
      ],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(41, 163, 41, .7)'],
      borderWidth: 2,
      pointRadius: 2
    }
  ]
};

const options = {
  responsive: true
};

export default class Timegraph extends Component {
  render() {
    return (
      <div className="mt-5">
        <Line data={data} options={options} />
      </div>
    );
  }
}
