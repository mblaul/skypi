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
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="my-4">
            <div className="display-4 my-3">
              So you want to bake a{' '}
              <span role="img" aria-label="pi">
                🥧
              </span>
              ?
            </div>
            <lead className="muted">
              Listed below are instructions for adding your own Pi to our
              system.
            </lead>
          </div>
          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h5>New Device with SkyPi Image</h5>
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <ol>
                    <li>Download Image and install on micro SD</li>
                    <li>
                      On your Mobile Device, install Berry Lan and Termius
                    </li>
                    <ul>
                      <li>Click{' '} <a href="https://berrylan.app/">
                          here</a>{' '}
                          to visit the BerryLan website
                      </li>
                      <li>Click{' '} <a href="https://www.termius.com/">
                          here</a>{' '}
                          to visit the Termius website
                      </li>
                    </ul>
                    <li>Open Berry Lan and select your device (skypi)</li>
                    <li>Select your wifi Network, and enter the credentials</li>
                    <li>Make note of the displayed IP address</li>
                    <li>
                      Connect to your device in Termius using the username skypi
                      and password weather
                    </li>
                    <li>Run the following commands:</li>
                    <ul>
                        <li>
                          <pre>cd skypi</pre>
                          </li>
                        <li>
                          <pre>sudo python3 new_station.py</pre>
                        </li>
                    </ul>
                    <li>Follow the instructions to finish setup</li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <h5>Existing Device</h5>
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <ol>
                    <li className="mb-2">Please use the following table to ensure the BME280 sensor is plugged into
                      the correct GPIO pins
                    </li>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Signal</th>
                          <th scope="col">Raspberry Pi Pin Number</th>
                          <th scope="col">BME280 Pin</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Power +5V</td>
                          <td>Pin2</td>
                          <td>VIN Pin</td>
                        </tr>
                        <tr>
                          <td>Data SDA</td>
                          <td>Pin 3</td>
                          <td>SDI Pin</td>
                        </tr>
                        <tr>
                          <td>Clock SCL</td>
                          <td>Pin 5</td>
                          <td>SCK Pin</td>
                        </tr>
                        <tr>
                          <td>Ground</td>
                          <td>Pin 6</td>
                          <td>GND PIN</td>
                        </tr>
                      </tbody>
                    </table>
                    <li>Ensure the BME280 sensor is setup</li>
                      <ol>
                        <li>Run the following command
                          <ul>
                            <pre>sudo raspi-config</pre>
                          </ul>
                          <ul>
                            <li>Use the down arrow to select 5 Interfacing Options</li>
                            <li>Arrow down to P5 I2C</li>
                            <li>Select yes when it asks you to enable I2C</li>
                            <li>Also select yes if it asks about automatically loading the kernel module</li>
                            <li>Use the right arrow to select the Finish button</li>
                            <li>Select yes if/when it asks to reboot</li>
                          </ul>
                          <li>The system will reboot. when it comes back up, log in and enter the following command</li>
                            <ul>
                              <li><pre>ls /dev/*i2c*</pre></li>
                            </ul>
                          <li>The Pi should respond with the following</li>
                          <ul>
                            <li><pre>/dev/i2c-1</pre></li>
                          </ul>
                          <li>Enter the following command</li>
                          <ul>
                            <li><pre>sudo apt-get install -y i2c-tools</pre></li>
                            <li><pre>sudo i2cdetect -y 1</pre></li>
                            <li><pre>sudo apt-get update</pre></li>
                            <li><pre>sudo apt-get install build-essential python-pip python-dev python-smbus git</pre></li>
                          </ul>
                        </li>
                      </ol>
                    <li>Ensure that you have Python 3 and Pip for Python 3</li>
                    <li>Ensure that Git is installed</li>
                    <ul>
                      <li>
                        <pre>sudo apt install git</pre>
                      </li>
                    </ul>
                    <li>Clone the GitHub repository below:</li>
                    <ul>
                      <li>
                        <pre>
                          git clone https://github.com/alexanderwoodle/skypi
                        </pre>
                      </li>
                    </ul>
                    <li>
                      Enter the following command to change into the SkyPi
                      directory to install the required modules, and register
                      your device
                    </li>
                    <ul>
                      <li>
                        <pre>cd skypi</pre>
                      </li>
                      <li>
                        <pre>sudo pip3 install -r requirements.txt</pre>
                      </li>
                      <li>
                        <pre>sudo python3 new_station.py</pre>
                      </li>
                    </ul>
                    <li>Follow the instructions to finish setup</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <h4 className="mt-4">
            Click{' '}
            <a href="https://drive.google.com/a/oakland.edu/file/d/1q-83aGAs-a4eRIyc31KtDajOA2Egix8C/view?usp=sharing">
              HERE
            </a>{' '}
            to download the SkyPi Raspbian Image
          </h4>
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
