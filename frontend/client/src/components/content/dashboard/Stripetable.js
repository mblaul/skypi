import React, { Component } from 'react';
import Moment from 'react-moment';

class Stripetable extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    console.log(this.props.deleteUser);
  }

  resetUserPassword(UserID) {
    var alertMessage = 'Password Reset Email Sent To User';
    //Delcare Dummy Function for resetting a User's Password
    //Call Function to SEnd a Password Reset
    //this.props.sendResetEmail(UserID);
    window.alert(alertMessage);
  }

  changeAdminStatus(UserID, userName, AdminStatus) {
    var alertMessage = "The User's Admin Status has been updated";
    //Function to change Admin Privledges in the Database
    window.alert(alertMessage);
  }

  onDeleteClick(userId, userEmail) {}
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
    //Declare an Array of the users perfered units, in furute will be passed from the DB/API
    const PreferedUnit = ['Celsius', 'mps', 'hPa'];

    // Accept an Parameter to dictate when shows as the headers for Table Rows
    const { tableHeaders, data } = this.props;
    const { forgotPassword } = this.props.functions;

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
              {data.map(data => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      onClick={forgotPassword({ email: data.email })}
                      type="button"
                      className="btn btn-secondary"
                    >
                      Reset Password
                    </button>
                  </td>
                  <td>
                    {data.roles.isAdmin ? (
                      <React.Fragment>
                        <input
                          type="checkbox"
                          name={data._id}
                          onChange={this.changeAdminStatus.bind(
                            data._id,
                            data.Admin
                          )}
                          defaultChecked
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <input
                          type="checkbox"
                          name={data._id}
                          onChange={this.changeAdminStatus.bind(
                            data._id,
                            data.name,
                            data.Admin
                          )}
                        />
                      </React.Fragment>
                    )}
                  </td>
                  <td>
                    <button
                      onCLick={this.onDeleteClick(data._id, data._email)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete User
                    </button>
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

export default Stripetable;
