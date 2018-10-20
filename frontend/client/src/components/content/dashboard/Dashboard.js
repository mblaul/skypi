import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPublicWeatherData,
  getFavoriteWeatherData
} from '../../../actions/weatherActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Dashboard
import Radiobutton from '../dashboard/Radiobutton';
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';
import Quickview from '../dashboard/Quickview';

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

    if (weatherLogs === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        dashboardContent = (
          <div>
            <div className="row mb-3">
              <Quickview Type={'Temperature'} Reading={quickInfo.temperature + '°C'} />
              <Quickview Type={'Wind Speed'} Reading={quickInfo.wind + ' kph'} />
              <Quickview Type={'Humidity'} Reading={quickInfo.humidity + '%'} />
              <Quickview Type={'Wind Direction'} Reading={quickInfo.winddirection} />
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Stripetable
                  TableHeader={'Recent readings'}
                  TableSubtitle={'Your home station'}
                  Column1={'Time'}
                  Column2={'Temp'}
                  Column3={'Humidity'}
                  Column4={'Wind Speed'}
                  Column5={'Wind Direction'}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph />
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="container mt-2">
        <div className="row mb-3">
          <div className="display-3 my-4">
            Hello, {this.props.auth.user.name}
          </div>
          <hr />
        </div>

        <h2>Weather Station Quick View</h2>
        <div className="row">
          <Radiobutton
            Type={'radio'}
            Name={'units'}
            Checked={'false'}
            Value={'English'}
          />
          <Radiobutton
            Type={'radio'}
            Name={'units'}
            Checked={'true'}
            Value={'Metric'}
          />
        </div>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPublicWeatherData: PropTypes.func.isRequired,
  getFavoriteWeatherData: PropTypes.func.isRequired,
  weatherLogs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicWeatherData, getFavoriteWeatherData }
)(Dashboard);
