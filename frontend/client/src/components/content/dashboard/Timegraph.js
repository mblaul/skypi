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
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[7],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[6],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[5],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[4],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[3],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[2],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[1],
                convertUnits,
                readingType
              )
            ),
            parseFloat(
              UnitConversions(
                this.props.weatherLogs[0],
                convertUnits,
                readingType
              )
            )
          ],
          /*
           *-----Previous Data Initalization-----
           *data: [
           *  this.props.weatherLogs[7],
           *  this.props.weatherLogs[6],
           *  this.props.weatherLogs[5],
           *  this.props.weatherLogs[4],
           *  this.props.weatherLogs[3],
           *  this.props.weatherLogs[2],
           *  this.props.weatherLogs[1],
           *  this.props.weatherLogs[0]
           *],
           */
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
