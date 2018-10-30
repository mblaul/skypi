import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavoriteWeatherData } from '../../../actions/weatherActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Dashboard
import Stripetable from './Stripetable';
import Timegraph from './Timegraph';
import Quickview from './Quickview';
import weatherIcons from './weatherIcons';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getFavoriteWeatherData();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { weatherLogs, loading } = this.props.weather;
    let dashboardContent;
    const TableHeaderArray = ['Date/Time', 'Temp', 'Humidity', 'Wind Speed', 'Wind Direction', 'Pressure']
    if (weatherLogs === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        const weatherDates = weatherLogs.map((logs) => logs.date);
        const weatherHumidity = weatherLogs.map((logs) => logs.humidity);
        const weatherPressure = weatherLogs.map((logs) => logs.pressure);
        const weatherTemperature = weatherLogs.map((logs) => logs.temperature);
        const weatherWind = weatherLogs.map((logs) => logs.wind);
        dashboardContent = (
          <div>
            <div className="display-4">
            {quickInfo.source}
            <img className = "my-0 py-0 h-50" src = {weatherIcons(quickInfo.description)} 
                alt = {quickInfo.description} />
            </div>
            <div className="text-muted mb-3">
              Last Updated:{' '}
              <Moment format="YYYY/MM/DD h:mm A">{quickInfo.date}</Moment>
            </div>
            <div className="row mb-3">
              <Quickview
                Type={'Temperature'}
                Reading={quickInfo.temperature + '°C'}
              />
              <Quickview
                Type={'Wind Speed'}
                Reading={quickInfo.wind + ' mps'}
              />
              <Quickview 
                Type={'Humidity'} 
                Reading={quickInfo.humidity + '%'} 
                />
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
                  chartLabel={"Temperature"}
                  weatherDates={weatherDates}
                  weatherLogs={weatherTemperature} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph 
                  chartLabel={"Wind"}
                  weatherDates={weatherDates}
                  weatherLogs={weatherWind} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph 
                  chartLabel={"Humidity"}
                  weatherDates={weatherDates}
                  weatherLogs={weatherHumidity} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph 
                  chartLabel={"Pressure"}
                  weatherDates={weatherDates}
                  weatherLogs={weatherPressure} />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <Stripetable
                  TableHeader={'Weather Readings'}
                  TableSubtitle={'Recent Data From Favorited Station'}
                  weatherLogs={weatherLogs}
                  TableHeaders = {TableHeaderArray}
                  SourcePage = {"Dashboard"}
                />
              </div>
            </div>
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
  weather: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  weather: state.weather,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getFavoriteWeatherData },
)(Dashboard);
