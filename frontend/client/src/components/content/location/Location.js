import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import _ from 'lodash';
import queryString from 'query-string';

//Import functions
import { getLocationWeatherData } from '../../../actions/weatherActions';
import { getUserPreferences } from '../../../actions/authActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Dashboard
import Quickview from '../dashboard/Quickview';
import Timegraph from '../dashboard/Timegraph';
import UnitConversions from '../dashboard/UnitConversions';
import weatherIcons from '../dashboard/weatherIcons';

class Location extends Component {
  constructor() {
    super();
    this.state = {
      // displayLimit State is a state of Dashboard.js, created in an attempt to control data points shown by Timegraph.js component
      displayLimit: 1
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
    const locationData = queryString.parse(this.props.location.search);
    //Get the user's preferences on unit conversions
    this.props.getUserPreferences();
    this.props.getLocationWeatherData(locationData);
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { weatherLogs, loading } = this.props.weather;
    let locationContent;
    //Create a variable to hold the data from the getPreferences function
    let { preferences } = this.props.auth;
    //Declare a temp variable to control unit conversions
    const convertUnits = preferences.units === 'metric' ? false : true;
    if (weatherLogs === undefined || loading) {
      locationContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        let aggData = _.values(
          _.reduce(
            weatherLogs,
            (result, obj) => {
              const formattedDate = moment(obj.date).format('MM/DD/YYYY');
              //console.log(this);
              result[formattedDate] = {
                date: formattedDate,
                temperature: [obj.temperature]
                // wind: result[formattedDate].wind.push(obj.wind),
                // humidity: result[formattedDate].humidity.push(obj.humidity),
                // pressure: result[formattedDate].pressure.push(obj.pressure),
                // precipitation: result[formattedDate].precipitation.push(
                //   obj.precipitation
                //)
              };
              return result;
            },
            {}
          )
        );
        const weatherDates = weatherLogs.map(logs => logs.date);
        const weatherHumidity = weatherLogs.map(logs => logs.humidity);
        const weatherPressure = weatherLogs.map(logs => logs.pressure);
        const weatherTemperature = weatherLogs.map(logs => logs.temperature);
        const weatherWind = weatherLogs.map(logs => logs.wind);

        locationContent = (
          <div>
            <div className="display-4">
              {quickInfo.city}, {quickInfo.state}
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
            <br />
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
          </div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        locationContent = (
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

    return <div className="container mt-2">{locationContent}</div>;
  }
}

Location.propTypes = {
  getFavoriteWeatherData: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getLocationWeatherData, getUserPreferences }
)(Location);
