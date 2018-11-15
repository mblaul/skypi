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
    // this.props.weatherLogs.map((weatherLogs, i) => 
    // {
    //   console.log(this.props.weatherLogs[i]);
    //   x = this.props.weatherDates[i];
    //   y = this.props.weatherLogs[i];
    //   return x, y;
    // })
    // .reverse()

    //Creates a new variable and brings the weatherLogs data into it, ideally the data would be modified
    //to whatever range the user wants in Dashboard and then passed into Timegraph
    let weather2Logs = [];
    weather2Logs = this.props.weatherLogs.map((weatherLogs, i) => 
            {
              console.log(this.props.weatherLogs[i]);
              return this.props.weatherLogs[i];
            });
    const data = {
      labels: 
      this.props.weatherDates.map((weatherDates, i) => 
      {
        console.log(this.props.weatherDates[i]);
        return moment(this.props.weatherDates[i]).format("h:mm A");
      })
      .reverse(),
      datasets: [
        {
          label: this.props.chartLabel,
          //Takes data points individually but not in a loop when square brackets present
          //Lack of square brackets allows for the variable to be given flat because science
          data: weather2Logs,
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

