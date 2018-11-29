import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import functions
import { getFavoriteWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';
import { getUserPreferences } from '../../../actions/authActions';

// Import common components
import Spinner from '../../common/Spinner';

// Import pieces of Dashboard
import Map from '../../common/Map';
import Quickview from './Quickview';
import Timegraph from './Timegraph';
import UnitConversions from './UnitConversions';
import weatherIcons from './weatherIcons';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      // displayLimit State is a state of Dashboard.js, created in an attempt to control data points shown by Timegraph.js component
      displayLimit: 4
    };
  }

  //Function to handle user input regarding how many hours of readings to display
  displayedReadingRange(selectedTimeFrame) {
    this.setState({
      displayLimit: selectedTimeFrame * 4
    });
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
    let { preferences } = this.props.auth;
    const { weatherLogs, loading } = this.props.weather;
    const allDevices = this.props.devices;
    let myDevice;
    let dashboardContent;
    if (weatherLogs === undefined || allDevices === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        const weatherDates = weatherLogs.map(logs => logs.date);
        const weatherHumidity = weatherLogs.map(logs => logs.humidity);
        const weatherPressure = weatherLogs.map(logs => logs.pressure);
        const weatherTemperature = weatherLogs.map(logs => logs.temperature);
        const weatherWind = weatherLogs.map(logs => logs.wind);
        const convertUnits = preferences.units === 'metric' ? false : true;

        for (let x = 0; x < allDevices.devices.length; x++) {
          if (allDevices.devices[x].name === weatherLogs[0].source) {
            myDevice = allDevices.devices[x];
          }
        }

        dashboardContent = (
          <div>
            <div className="display-4">
              {quickInfo.source}
              <img
                className="my-0 py-0 h-50"
                src={weatherIcons(quickInfo.description)}
                alt={quickInfo.description}
              />
            </div>
            <div className="text-muted mb-3">
              Last Updated:{' '}
              <Moment format="YYYY/MM/DD h:mm A">{quickInfo.date}</Moment>
            </div>
            <div className="row mb-3">
              <Quickview
                Type={'Temperature'}
                Reading={UnitConversions(
                  quickInfo.temperature,
                  convertUnits,
                  'Temperature'
                )}
              />
              <Quickview
                Type={'Wind Speed'}
                Reading={UnitConversions(quickInfo.wind, convertUnits, 'Wind')}
              />
              <Quickview Type={'Humidity'} Reading={quickInfo.humidity + '%'} />
              <Quickview
                Type={'Wind Direction'}
                Reading={quickInfo.winddirection}
              />
              <Quickview
                Type={'Pressure'}
                Reading={UnitConversions(
                  quickInfo.pressure,
                  convertUnits,
                  'Pressure'
                )}
              />
              <Quickview
                Type={'Precipitation %'}
                Reading={Number(quickInfo.precipitation) * 100 + '%'}
              />
            </div>
            {/* Div below is the container for Time range selector buttons */}
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(2)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 2 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(6)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 6 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(12)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 12 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(24)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 24 Hours
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Temperature'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherTemperature}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Wind'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherWind}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Humidity'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherHumidity}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Pressure'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherPressure}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
            </div>
            <hr />
            <Map devices={[myDevice]} />
            <hr />
          </div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        dashboardContent = (
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
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
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
)(Dashboard);
