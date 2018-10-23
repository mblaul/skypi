import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavoriteWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Admin
import Admintable from './AdminTable';

class Admin extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getFavoriteWeatherData();
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { weatherLogs, loading } = this.props.weather;
    const devices = this.props.devices;
    let adminContent;
    if (weatherLogs === undefined || loading) {
      adminContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        adminContent = (
          <div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <Admintable
                  TableHeader={'Users in the System'}
                  TableSubtitle={'View all users and perform administrative actions as necessary'}
                  Column1={'User'}
                  Column2={'Email'}
                  Column3={'Reset Password'}
                  Column4={'Admin?'}
                  Column5={'Delete Account'}
                  weatherLogs={weatherLogs}
                />
              </div>
            </div>
          </div>
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

    return (
      <div className="container mt-2">
        <div className="row mb-3">
          <div className="display-3 my-3">
            Hello, {this.props.auth.user.name}
          </div>
          <hr />
        </div>
        {adminContent}
      </div>
    );
  }
}

Admin.propTypes = {
  getFavoriteWeatherData: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather,
  auth: state.auth,
  devices: state.devices
});

export default connect(
  mapStateToProps,
  { getFavoriteWeatherData, getPublicDevices }
)(Admin);
