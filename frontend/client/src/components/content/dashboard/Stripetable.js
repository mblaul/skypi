import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Stripetable extends Component {

  resetUserPassword(UserID) {
    var alertMessage = "Password Reset Email Sent To User"
    //Delcare Dummy Function for resetting a User's Password
    //Call Function to SEnd a Password Reset
    //this.props.sendResetEmail(UserID);
    window.alert(alertMessage);
  }
  deleteUserAccount(UserID) {
    var alertMessage = "User Sucessfully Deleted"
    //Function to delete user in the Database
    window.alert(alertMessage)
  }
  changeAdminStatus(UserID, userName, AdminStatus) {
    var alertMessage = "The User's Admin Status has been updated"
    //Function to change Admin Privledges in the Database
    window.alert(alertMessage)
  }
  render() {
    // Declare an Array for the headers to display in the table
    const WeatherLogData = [
      this.props.weatherLogs[0], 
      this.props.weatherLogs[1],
      this.props.weatherLogs[2],
      this.props.weatherLogs[3],
      this.props.weatherLogs[4]
      ]
      var DashboardSource = true
      if (this.props.SourcePage === "Dashboard")
      {
        DashboardSource = true
      } else {
        DashboardSource = false
      }
    // Accept an Parameter to dictate when shows as the headers for Table Rows
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
              {/* If this.props.SourcePage = Dashboard Render using the WeatherLogs Parameter */}
              {DashboardSource ?
                /* If source Page is Dashboard.JS render Dashboard Stuff*/
                (
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
                      <td>
                        {DataLog.pressure}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                ):
                /* If source Page is AdminPage.JS render AdminPage Stuff*/
                (
                <tbody>
                  {WeatherLogData.map(DataLog => (
                    <tr key={DataLog._id}>
                      <td>                         
                        {DataLog.userName}
                      </td>
                      <td> 
                        {DataLog.email}
                      </td>
                      <td> 
                        <button 
                          onClick={this.resetUserPassword.bind("Reset Email Sent")} 
                          type="button" 
                          className="btn" >
                          Reset Password
                        </button>
                      </td>
                      <td> 
                        {DataLog.Admin ?
                        (
                          <React.Fragment>
                            <input 
                                type='checkbox' 
                                name={DataLog._id} 
                                onChange={this.changeAdminStatus.bind(DataLog._id, DataLog.Admin)}
                                defaultChecked >
                              </input>
                          </React.Fragment>
                        ): (
                          <React.Fragment>
                            <input 
                                type='checkbox' 
                                name={DataLog._id} 
                                onChange={this.changeAdminStatus.bind(DataLog._id, DataLog.name, DataLog.Admin)} >
                              </input>
                          </React.Fragment>
                        )}
                      </td>
                      <td> 
                        <button 
                          onClick={this.deleteUserAccount.bind("")}
                          type="button" 
                          className="btn" > 
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
  DummyFunction() {

  }
//End Class Bracket
}
