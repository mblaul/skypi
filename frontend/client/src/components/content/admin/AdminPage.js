import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavoriteWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Admin
import Stripetable from '../dashboard/Stripetable';

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
    const AdminDummyData = [
      {_id:"abcdefg0",userName:"Daniel W", email:"NotDanW@SkiPi.com", Admin:true},
      {_id:"abcdefg1",userName:"Daniel C", email:"NotDanC@SkiPi.com", Admin:false},
      {_id:"abcdefg2",userName:"Troy B", email:"NotTroyB@SkiPi.com", Admin:false},
      {_id:"abcdefg3",userName:"Matt B", email:"NotMattB@SkiPi.com", Admin:true},
      {_id:"abcdefg4",userName:"Jacob B", email:"NotJacobB@SkiPi.com", Admin:true}
    ];
    const { weatherLogs, loading } = this.props.weather;
    let adminContent;
    const AdminHeader = ['User','E-Mail','Reset Password','Admin?','Delete Account']
    if (weatherLogs === undefined || loading) {
      adminContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        adminContent = (
          <div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <Stripetable
                  TableHeader={'All Users in the System'}
                  TableSubtitle={'View all users and perform administrative actions as necessary'}
                  TableHeaders={AdminHeader}
                  weatherLogs={AdminDummyData}
                  SourcePage ={'AdminPage'}
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
