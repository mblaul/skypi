import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    console.log(users);
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
          // <div>
          //   <div className="row mb-2">
          //     <div className="col-sm-12 col-md-12 col-lg-12">
          //       <Stripetable
          //         TableHeader={'All Users in the System'}
          //         TableSubtitle={
          //           'View all users and perform administrative actions as necessary'
          //         }
          //         TableHeaders={AdminHeader}
          //         weatherLogs={AdminDummyData}
          //         SourcePage={'AdminPage'}
          //       />
          //     </div>
          //   </div>
          // </div>
          <div>HEllo</div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        adminContent = (
          <div className="mx-auto">
            <p className="lead alert alert-warning">
              You need to favorite a device!
              <br />
              Please follow the link below to find a favorite.
            </p>
            <Link to="/stations" className="btn btn-lg btn-info">
              Device List
            </Link>
          </div>
        );
      }
    }

    return <div className="container mt-2">{adminContent}</div>;
  }
}

Admin.propTypes = {
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(Admin);
