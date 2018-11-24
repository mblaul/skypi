import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import functions
import { getFavoriteWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';
import { getUserPreferences } from '../../../actions/authActions';


class GetStarted extends Component {
  constructor() {
    super();

    this.state = {
      startDate: '',
      endDate: ''
    };
  }
  
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getUserPreferences();
    this.props.getFavoriteWeatherData();
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="container mt-2">
        <div className="row mb-3">
          <div className="display-3 my-3">
            Hello, {this.props.auth.user.name}
          </div>
          <hr />
        </div>
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-8">
        <p>Listed below are instructions for adding your own Pi to our system.</p>
        <h4>New Device with SkyPi Image</h4>
            <ol>
            <li>Download Image and install on micro SD</li>
            <li>On your Mobile Device, install Berry Lan and Termius</li>
            <li>Open Berry Lan and select your device (skypi)</li> 
            <li>Select your wifi Network, and enter the credentials</li>
            <li>Make note of the displayed IP address</li> 
            <li>Connect to your device in Termius using the username skypi and password weather</li>
            <li>Run the command ‘sudo python3 newStation.py’</li>
            <li>Follow the instructions to finish setup</li>
            </ol>
            <p></p>
        <h4>Existing Device</h4>
            <ol>
            <li>Download the required python3 module list and newStation.py</li>
            <li>Run the command ‘sudo pip3 install -r requirements.txt’</li>
            <li>Run the command ‘sudo python3 newStation.py’</li>
            <li>Follow the instructions to finish setup</li>
            </ol>
        </div>
        </div>
      </div>
    );
  }
}

GetStarted.propTypes = {
  getFavoriteWeatherData: PropTypes.func.isRequired,
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  devices: state.devices,
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { getUserPreferences, getFavoriteWeatherData, getPublicDevices }
)(GetStarted);
