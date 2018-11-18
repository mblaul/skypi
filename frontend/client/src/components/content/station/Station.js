import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeviceWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

// Import pieces of Station
import Datepicker from '../dashboard/Datepicker';
import Map from '../../common/Map';
import Quickview from '../dashboard/Quickview';
import Timegraph from '../dashboard/Timegraph';
import UnitConversions from '../dashboard/UnitConversions';

class Station extends Component {
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
    this.props.getDeviceWeatherData(this.props.match.params.deviceId);
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
    let myDevice;
    let stationContent;
    // Check to see if values have fully loaded for weather data
    if (weatherLogs === undefined || loading) {
      //If it hasn't loaded display spinner
      stationContent = <Spinner />;
    } else {
      //If it has loaded, ensure weatherLogs' length isn't zero then display data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        const weatherDates = weatherLogs.map(logs => logs.date);
        const weatherHumidity = weatherLogs.map(logs => logs.humidity);
        const weatherPressure = weatherLogs.map(logs => logs.pressure);
        const weatherTemperature = weatherLogs.map(logs => logs.temperature);
        const weatherWind = weatherLogs.map(logs => logs.wind);
        const convertUnits = true;

        for(let x=0 ; x<devices.devices.length ; x++){
          if(devices.devices[x].name === weatherLogs[0].source){
            myDevice = devices.devices[x]
          }
        };

        stationContent = (
          <div>
            <div className="row my-4">
              <div className="text-center mx-auto">
                <div className="strong display-2">{quickInfo.source}</div>
                <div className="text-muted mb-3">
                  Last Updated:{' '}
                  <Moment format="YYYY/MM/DD h:mm A">{quickInfo.date}</Moment>
                </div>
              </div>
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
              <div className="col-sm-12 col-md-12 col-lg-3">
                Start Date:
                <Datepicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                End Date:
                <Datepicker
                  selected={this.state.endDate}
                  onChange={this.handleChange}
                />
                
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Temperature'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherTemperature}
                  limitDisplay={true}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Wind'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherWind}
                  limitDisplay={true}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Humidity'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherHumidity}
                  limitDisplay={true}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Pressure'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherPressure}
                  limitDisplay={true}
                />
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        stationContent = (
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

    return <div className="container mt-2">
      {stationContent}
      <hr />
      <Map
        devices={myDevice}
      />
      <hr />
    </div>;
  }
}

Station.propTypes = {
  getDeviceWeatherData: PropTypes.func.isRequired,
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
  { getDeviceWeatherData, getPublicDevices }
)(Station);
