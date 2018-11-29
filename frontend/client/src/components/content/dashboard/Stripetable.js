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
  render() {
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
