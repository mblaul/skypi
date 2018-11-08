import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword, deleteUser } from '../../../actions/authActions';
import { getAllUsers } from '../../../actions/adminActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Admin
import Stripetable from '../dashboard/Stripetable';

class Admin extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getAllUsers();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { users, loading } = this.props.admin;

    let adminContent;
    const AdminHeader = [
      'User',
      'E-Mail',
      'Reset Password',
      'Admin?',
      'Delete Account'
    ];
    if (users === undefined || loading) {
      adminContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (users.length > 0) {
        adminContent = (
          <div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <Stripetable
                  tableHeader={'Users'}
                  TableSubtitle={
                    'View all users and perform administrative actions as necessary'
                  }
                  tableHeaders={AdminHeader}
                  data={users}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    return <div className="container mt-2">{adminContent}</div>;
  }
}

Admin.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUser, forgotPassword }
)(Admin);
