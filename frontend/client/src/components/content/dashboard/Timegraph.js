import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import UnitConversions from './UnitConversions';

export default class Timegraph extends Component {
  render() {
    const moment = require('moment');
    //Temp boolean called 'convertUnits' to control if units are converted
    const convertUnits = true;
    // true => Convert Readings to the Imperial system
    // false => Don't convert (keep readings in the Metric system)
    //Declare a String variable for what readingType to convert, initalized to whatever the Chart's label is
    const readingType = this.props.chartLabel;
    //Declare variable to limit how many records are displayed
    var readingsToDisplay = this.props.weatherLogs.length;
    const switcher = this.props.limitDisplay;
    if (switcher === true){
      readingsToDisplay = 10;
    }
    //const readingsToDisplay = 100;
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
    for (let j = 0; j < readingsToDisplay; j++) 
    {
      weather2Logs[j] = parseFloat(UnitConversions(this.props.weatherLogs[j], convertUnits, readingType));
    }
    let weather2Dates = [];     
    for (let j = 0; j < readingsToDisplay; j++) 
    {
      weather2Dates[j] = moment(this.props.weatherDates[j]).format("MM-DD h:mm A");
    }
    // Creating A for loop to allow for control of how many values are displayed
    // weather2Logs = this.props.weatherLogs.map((weatherLogs, i) => 
    //   {
    //     //console.log(this.props.weatherLogs[i]);
    //     //NewReturn Statement does convert data
    //     return parseFloat(UnitConversions(this.props.weatherLogs[i], convertUnits, readingType))
    //     //Old Return statement doesn't convert data
    //     //return this.props.weatherLogs[i];
    //   });
    const data = {
      labels: weather2Dates
      // Converting to a for loop to limit how many records are displayed
      // this.props.weatherDates.map((weatherDates, i) => 
      // {
      //   //console.log(this.props.weatherDates[i]);
      //   return moment(this.props.weatherDates[i]).format("h:mm A");
      // })
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
              //Trying to Dynamically change ticks
              suggestedMin: ((Math.min.apply(null, weather2Logs) - 5)),
              suggestedMax: ((Math.max.apply(null, weather2Logs) + 5))
              //Old way of declaring ticks
              //suggestedMin: 5,
              //suggestedMax: 50
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

