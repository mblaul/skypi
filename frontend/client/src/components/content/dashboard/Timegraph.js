import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import UnitConversions from './UnitConversions';

export default class Timegraph extends Component {
  render() {
    const moment = require('moment');
    //Temp boolean called 'convertUnits' to control if units are converted
    const convertUnits = false;
    // true => Convert Readings to the Imperial system
    // false => Don't convert (keep readings in the Metric system)
    //Declare a String variable for what readingType to convert, initalized to whatever the Chart's label is
    const readingType = this.props.chartLabel;
    let visibleData = [];
    const data = {
      labels: 
      this.props.weatherDates.map((weatherDates, i) => 
      {
        return moment(this.props.weatherDates[i]).format("YYYY/MM/DD h:mm A");
      })
      .reverse(),
      datasets: [
        {
          label: this.props.chartLabel,
          data: [
            this.props.weatherLogs.map((weatherLogs, i) => 
            {
              visibleData = parseFloat(
                UnitConversions(
                  this.props.weatherLogs[i], convertUnits, readingType
                )
              )
              return visibleData;
            })
            .reverse()
            /* parseFloat(
              UnitConversions(
                this.props.weatherLogs[0],
                convertUnits,
                readingType
              )
            ) */
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
        yAxes: [
          {
            ticks: {
              suggestedMin: 5,
              suggestedMax: 50
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
