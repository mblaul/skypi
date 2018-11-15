import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { getLocationWeatherData } from '../../../actions/weatherActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Dashboard
import Timegraph from '../dashboard/Timegraph';
import Quickview from '../dashboard/Quickview';
import weatherIcons from '../dashboard/weatherIcons';

class Location extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    const locationData = queryString.parse(this.props.location.search);
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
              console.log(obj.date, obj.temperature);
              result[formattedDate] = {
                date: formattedDate,
                temperature: obj.temperature,
                wind: obj.wind,
                humidity: obj.humidity,
                pressure: obj.pressure,
                precipitation: obj.precipitation
              };
              return result;
            },
            {}
          )
        );

        const weatherDates = aggData.map(logs => logs.date);
        const weatherHumidity = aggData.map(logs => logs.humidity);
        const weatherPressure = aggData.map(logs => logs.pressure);
        const weatherTemperature = aggData.map(logs => logs.temperature);
        const weatherWind = aggData.map(logs => logs.wind);

        console.log(aggData);

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
                Reading={quickInfo.temperature + '°C'}
              />
              <Quickview
                Type={'Wind Speed'}
                Reading={quickInfo.wind + ' mps'}
              />
              <Quickview Type={'Humidity'} Reading={quickInfo.humidity + '%'} />
              <Quickview
                Type={'Wind Direction'}
                Reading={quickInfo.winddirection}
              />
              <Quickview
                Type={'Pressure'}
                Reading={quickInfo.pressure + ' hPa'}
              />
              <Quickview
                Type={'Precipitation %'}
                Reading={quickInfo.precipitation + '%'}
              />
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
  { getLocationWeatherData }
)(Location);
