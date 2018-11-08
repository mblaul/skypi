import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../../actions/adminActions';
import { resetPassword } from '../../../actions/authActions';

class Stripetable extends Component {
  changeAdminStatus(UserID, userName, AdminStatus) {
    var alertMessage = "The User's Admin Status has been updated";
    //Function to change Admin Privledges in the Database
    window.alert(alertMessage);
  }

  onResetPasswordClick(userEmail) {
    this.props.resetPassword(userEmail);
  }

  onDeleteClick(userId, userEmail) {
    if (window.confirm(`Are you sure you want to delete ${userEmail}?`)) {
      this.props.deleteUser(userId);
      this.props.getAllUsers();
    } else {
      alert(`${userEmail} has been spared.`);
    }
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
    } else if (DesiredUnit === 'mb'){
      return (pressureToConvert + 'mbar');
    }  {
      return pressureToConvert + ' hPa';
    }
  }
  render() {
    //Declare an Array of the users perfered units, in furute will be passed from the DB/API
    const PreferedUnit = ['Celsius', 'mps', 'hPa'];

    // Accept an Parameter to dictate when shows as the headers for Table Rows
    const { tableHeaders, data } = this.props;
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
                      onClick={() =>
                        this.onResetPasswordClick({ email: data.email })
                      }
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
                      onClick={() => this.onDeleteClick(data._id, data.email)}
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

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getAllUsers, resetPassword, deleteUser }
)(Stripetable);
