import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Stripetable extends Component {
  render() {
    // Declare an Array for the headers to display in the table
    const WeatherLogData = [
      this.props.weatherLogs[0], 
      this.props.weatherLogs[1],
      this.props.weatherLogs[2],
      this.props.weatherLogs[3],
      this.props.weatherLogs[4]
      ]
    // Array for Dashboard Headers
    //const tableHeaders = ['Date/Time', 'Temp', 'Humidity', 'Wind Speed', 'Wind Direction'];
    // Attempt to Pass in an array to further dynamic capabilities
    const tableHeaders = this.props.TableHeaders
      return (
      <div className="card">
        <div className="header">
          {/* This takes the passed variable "TableHeader" and Puts it in the top of the table */}
          <h4 className="title">{this.props.TableHeader}</h4>
          {/* This takes the passed variable "TableSubtitle" and Puts it inbelow the tableHeader specified above */}
          <p className="category">{this.props.TableSubtitle}</p>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
              {tableHeaders.map(header => (
                  <th scope="col" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {WeatherLogData.map(DataLog => (
                <tr key={DataLog._id}>
                  <td>                         
                    <Moment format="YYYY/MM/DD h:mm A">
                      {DataLog.date}
                    </Moment>
                  </td>
                  <td> 
                    {DataLog.temperature} °C
                  </td>
                  <td> 
                    {DataLog.humidity} %
                  </td>
                  <td> 
                    {DataLog.wind} KPH
                  </td>
                  <td> 
                    {DataLog.winddirection}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
