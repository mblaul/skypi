import React, { Component } from 'react';

export default class Admintable extends Component {
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
    const tableHeaders = ['User', 'Email', 'Reset Password', 'Admin?', 'Delete Account'];
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">{this.props.TableHeader}</h4>
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
                    {'Username'}
                  </td>
                  <td> 
                    {'mail@mail.com'}
                  </td>
                  <td> 
                    {'Yes/No'}
                  </td>
                  <td> 
                    {'Checked/Unchecked'}
                  </td>
                  <td> 
                    {'Yes/No'}
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
