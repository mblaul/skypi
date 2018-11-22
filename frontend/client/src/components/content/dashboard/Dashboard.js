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
import Datepicker from './Datepicker';
import Map from '../../common/Map';
import Quickview from './Quickview';
import Timegraph from './Timegraph';
import UnitConversions from './UnitConversions';
import weatherIcons from './weatherIcons';
//Import Moment for formatting the Dates
//import moment from 'moment';
//import DateRange to allow for the datepicker to return the selected dates
//import DatePicker from 'react-datepicker';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      startDate: '',
      endDate: ''
    };
  }
  //Function to handle DatePicker getting values based on user input
  applyDateRange() {
    //this.endDate = 0;
    //this.startDate = 0;
    //Function to change Admin Privledges in the Database
    window.alert(this.endDate);
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
    const { preferences } = this.props.auth.user;
    const { weatherLogs, loading } = this.props.weather;
    const allDevices = this.props.devices;
    console.log(preferences);
    let myDevice;
    let dashboardContent;
    //Declare a constant to force moment, allowing us to format dates in varables
    const moment = require('moment');

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
        //Declare 2 variables to hold to current start and end dates
        //let startDate = moment(weatherDates[9]).format("YYYY-MM-DD h:mm A");
        //let endDate = moment(weatherDates[0]).format("YYYY-MM-DD h:mm A");
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
                //Reading={quickInfo.temperature + '°C'}
              />
              <Quickview
                Type={'Wind Speed'}
                Reading={UnitConversions(quickInfo.wind, convertUnits, 'Wind')}
                //Reading={quickInfo.wind + ' mps'}
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
                //Reading={quickInfo.pressure + ' hPa'}
              />
              <Quickview
                Type={'Precipitation %'}
                Reading={Number(quickInfo.precipitation) * 100 + '%'}
              />
            </div>
            <div className="row mb-2">
              {/* DatePicker now correctly finds and prints the correctly selected date to the user, still need a reliable way to get the data from the datepicker into a variable in Dashboard.js */}
              {/* <div className="col-sm-12 col-md-12 col-lg-3">
                  Start Time:
                  <Datepicker
                    onSelect={this.handleSelect}
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    value={startDate}
                  />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3">
                  End Time:
                  <Datepicker
                    onSelect={this.handleSelect}
                    selected={this.state.endDate}
                    onChange={this.handleChange}
                    value={this.state.endDate}
                  />
                </div> */}
              {/* Code below here is our latest attempt at getting DatePicker to return data to the page*/}
              <div className="col-sm-12 col-md-12 col-lg-3">
                <Datepicker
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <Datepicker
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <p> </p>
                <button
                  onClick={() => window.alert(this.state.endDate)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Apply Date Range
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Temperature'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherTemperature}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Wind'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherWind}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Humidity'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherHumidity}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Pressure'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherPressure}
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
