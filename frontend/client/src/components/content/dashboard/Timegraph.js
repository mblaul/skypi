import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class Timegraph extends Component {
  render() {
    const moment = require('moment');
    const data = {
      labels: 
        (this.props.weatherDates.map((weatherDates, i) => {
          return (moment(this.props.weatherDates[i]).format("h:mm A"));
        })).reverse()
<<<<<<< HEAD
=======
        /*
        moment(this.props.weatherDates[7]).format("h:mm A"),
        moment(this.props.weatherDates[6]).format("h:mm A"),
        moment(this.props.weatherDates[5]).format("h:mm A"),
        moment(this.props.weatherDates[4]).format("h:mm A"), 
        moment(this.props.weatherDates[3]).format("h:mm A"), 
        moment(this.props.weatherDates[2]).format("h:mm A"), 
        moment(this.props.weatherDates[1]).format("h:mm A"), 
        moment(this.props.weatherDates[0]).format("h:mm A")
        */
>>>>>>> 0a6d4305a144e70b410782cadc17f0014f02ef39
      ,
      datasets: [
        {
          label: this.props.chartLabel,
          data: [
            this.props.weatherLogs[7],
            this.props.weatherLogs[6],
            this.props.weatherLogs[5],
            this.props.weatherLogs[4],
            this.props.weatherLogs[3],
            this.props.weatherLogs[2],
            this.props.weatherLogs[1],
            this.props.weatherLogs[0]
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
      scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 5,
                suggestedMax: 50,
            }
        }]
      },
      title: {
        display: true,
        text: this.props.chartLabel,
        fontSize: 18
      }
    };

    return (
      <div className="mt-5">
        <Line data={data} options={options} />
      </div>
    );
  }
}
