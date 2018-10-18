import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Humidity',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(0, 102, 255, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Temperature (F)',
      data: [10, 150, 50, 10, 90, 85, 43],
      backgroundColor: ['rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(200, 20, 20, .7)'],
      borderWidth: 2,
      pointRadius: 2
    },
    {
      label: 'Wind Speed (mph)',
      data: [100, 90, 80, 70, 60, 50, 40],
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
