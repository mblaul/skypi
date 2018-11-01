import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Stripetable extends Component {
  resetUserPassword(UserID) {
    var alertMessage = 'Password Reset Email Sent To User';
    //Delcare Dummy Function for resetting a User's Password
    //Call Function to SEnd a Password Reset
    //this.props.sendResetEmail(UserID);
    window.alert(alertMessage);
  }
  deleteUserAccount(UserID) {
    var alertMessage =
      'Are you sure you want to delete this Account? This action cannot be undone';
    var confirmDelete = window.confirm(alertMessage);
    if (confirmDelete === true) {
      window.alert('User Sucessfully Deleted');
    } else {
      //Safely exit without deleting the account
    }
  }
  changeAdminStatus(UserID, userName, AdminStatus) {
    var alertMessage = "The User's Admin Status has been updated";
    //Function to change Admin Privledges in the Database
    window.alert(alertMessage);
  }
  /*
    Units for Temp, WindSpeed, and Pressure repectivly
    Database uses °C , mps, and hPa
    Temp Units °C and °F
    WindSpd Units are KpH and MPH
    Pressure Unitrs are KPa,  and PSI
  */
  tempConversions(DesiredUnit, tempToConvert) {
    if (DesiredUnit === 'Fahrenheit') {
      return (tempToConvert * 1.8 + 32).toFixed(2) + ' °F';
    } else {
      return tempToConvert + '°C';
    }
  }
  speedConversions(DesiredUnit, speedToConvert) {
    if (DesiredUnit === 'MPH') {
      return (speedToConvert * 2.23694).toFixed(2) + ' MPH';
    } else if (DesiredUnit === 'KPH') {
      return (speedToConvert * 3.6).toFixed(2) + ' KPH';
    } else {
      return speedToConvert + ' mps';
    }
  }
  pressureConversions(DesiredUnit, pressureToConvert) {
    if (DesiredUnit === 'PSI') {
      return (pressureToConvert * 0.0145037738).toFixed(2) + ' PSI';
    } else if (DesiredUnit === 'KPa') {
      return (pressureToConvert * 0.1).toFixed(2) + ' KPa';
    } else {
      return pressureToConvert + ' hPa';
    }
  }
  render() {
    // Declare an Array for the headers to display in the table
    const WeatherLogData = [
      this.props.weatherLogs[0],
      this.props.weatherLogs[1],
      this.props.weatherLogs[2],
      this.props.weatherLogs[3],
      this.props.weatherLogs[4]
    ];
    var DashboardSource = true;
    //Declare an Array of the users perfered units, in furute will be passed from the DB/API
    const PreferedUnit = ['Celsius', 'mps', 'hPa'];
    if (this.props.SourcePage === 'Dashboard') {
      DashboardSource = true;
    } else {
      DashboardSource = false;
    }
    // Accept an Parameter to dictate when shows as the headers for Table Rows
    const tableHeaders = this.props.TableHeaders;
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
            {DashboardSource ? (
              /* If source Page is Dashboard.JS render Dashboard Stuff*/
              <tbody>
                {WeatherLogData.map(DataLog => (
                  <tr key={DataLog._id}>
                    <td>
                      <Moment format="YYYY/MM/DD h:mm A">{DataLog.date}</Moment>
                    </td>
                    <td>
                      {this.tempConversions(
                        PreferedUnit[0],
                        DataLog.temperature
                      )}
                    </td>
                    <td>{DataLog.humidity} %</td>
                    <td>
                      {this.speedConversions(PreferedUnit[1], DataLog.wind)}
                    </td>
                    <td>{DataLog.winddirection}</td>
                    <td>
                      {this.pressureConversions(
                        PreferedUnit[2],
                        DataLog.pressure
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              /* If source Page is AdminPage.JS render AdminPage Stuff*/
              <tbody>
                {WeatherLogData.map(DataLog => (
                  <tr key={DataLog._id}>
                    <td>{DataLog.name}</td>
                    <td>{DataLog.email}</td>
                    <td>
                      <button
                        onClick={this.resetUserPassword.bind(
                          'Reset Email Sent'
                        )}
                        type="button"
                        className="btn"
                      >
                        Reset Password
                      </button>
                    </td>
                    <td>
                      {DataLog.Admin ? (
                        <React.Fragment>
                          <input
                            type="checkbox"
                            name={DataLog._id}
                            onChange={this.changeAdminStatus.bind(
                              DataLog._id,
                              DataLog.Admin
                            )}
                            defaultChecked
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <input
                            type="checkbox"
                            name={DataLog._id}
                            onChange={this.changeAdminStatus.bind(
                              DataLog._id,
                              DataLog.name,
                              DataLog.Admin
                            )}
                          />
                        </React.Fragment>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={this.deleteUserAccount.bind('')}
                        type="button"
                        className="btn"
                      >
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
    //End Render Bracket
  }
  //End Class Bracket
}
