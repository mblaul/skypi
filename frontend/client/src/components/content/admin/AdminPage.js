import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavoriteWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Dashboard
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';
import Quickview from '../dashboard/Quickview';

class Admin extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getFavoriteWeatherData();
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { weatherLogs, loading } = this.props.weather;
    let adminContent;

    if (weatherLogs === undefined || loading) {
      adminContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (weatherLogs.length > 0) {
        const quickInfo = weatherLogs[0];
        adminContent = (
          <div>
            <div className="display-4">{quickInfo.source}</div>
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
                Reading={quickInfo.wind + ' kph'}
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
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Stripetable
                  TableHeader={'Recent readings'}
                  TableSubtitle={'Your home station'}
                  Column1={'Date/Time'}
                  Column2={'Temp'}
                  Column3={'Humidity'}
                  Column4={'Wind Speed'}
                  Column5={'Wind Direction'} 
                  weatherLogs={weatherLogs}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph 
                  weatherLogs={weatherLogs} />
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        adminContent = (
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
        {adminContent}
      </div>
    );
  }
}

Admin.propTypes = {
  getFavoriteWeatherData: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
  getPublicDevices: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getFavoriteWeatherData },
  { getPublicDevices }
)(Admin);
