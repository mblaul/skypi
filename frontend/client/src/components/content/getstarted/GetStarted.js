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
            <li>Run the following commands:</li>
                <ol>
                <li><pre>cd skypi</pre></li>
                <li><pre>sudo python3 new_station.py</pre></li>
                </ol>
            <li>Follow the instructions to finish setup</li>
            </ol>
            <p></p>
        <h4>Existing Device</h4>
            <ol>
            <li>Ensure that you have Python 3 and Pip for Python 3 installed</li>
            <li>Ensure that Git is installed</li>
                <ol>
                <li><pre>sudo apt install git</pre></li>
                </ol>
            <li>Clone the GitHub repository below:</li>
                <ol>
                <li><pre>git clone https://github.com/alexanderwoodle/skypi</pre></li>
                </ol>
            <li>Enter the following command to change into the SkyPi directory to install the required modules, and register your device</li>
                <ol>
                <li><pre>cd skypi</pre></li>
                <li><pre>sudo pip3 install -r requirements.txt</pre></li>
                <li><pre>sudo python3 new_station.py</pre></li>
                </ol>
            <li>Follow the instructions to finish setup</li>
            </ol>
        <h4>Click <a href="https://drive.google.com/a/oakland.edu/file/d/1q-83aGAs-a4eRIyc31KtDajOA2Egix8C/view?usp=sharing">HERE</a> to download the SkyPi Raspbian Image</h4>  
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