import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import UnitConversions from './UnitConversions';

export default class Timegraph extends Component {
  render() {
    const moment = require('moment');
    const readingType = this.props.chartLabel;
    const readingsToDisplay = this.props.limitDisplay;
    let weather2Logs = [];
    let weather2Dates = [];

    for (let j = 0; j < readingsToDisplay; j++) {
      weather2Logs[j] = parseFloat(
        UnitConversions(
          this.props.weatherLogs[j],
          this.props.convertUnits,
          readingType
        )
      );
      weather2Dates[j] = moment(this.props.weatherDates[j]).format(
        'MM-DD h:mm A'
      );
    }

    const data = {
      labels: weather2Dates.reverse(),
      datasets: [
        {
          label: this.props.chartLabel,
          data: weather2Logs.reverse(),
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
        yAxes: [
          {
            ticks: {
              suggestedMin: Math.min.apply(null, weather2Logs) - 5,
              suggestedMax: Math.max.apply(null, weather2Logs) + 5
            }
          }
        ]
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
