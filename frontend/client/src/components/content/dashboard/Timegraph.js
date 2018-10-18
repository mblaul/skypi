import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['0200', '0400', '0600', '0800', '1000', '1200', '1400'],
  datasets: [
    {
      label: 'Humidity',
      data: [65, 68, 73, 75, 71, 67, 72],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(0, 102, 255, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Temperature (F)',
      data: [33, 54, 50, 40, 67, 63, 43],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(200, 20, 20, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Wind Speed (mph)',
      data: [13, 18, 26, 19, 22, 19, 18],
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
