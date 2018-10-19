import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicWeatherData } from '../../../actions/weatherActions';

//import pieces of Dashboard
import Radiobutton from '../dashboard/Radiobutton';
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';
import Quickview from '../dashboard/Quickview';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getPublicWeatherData(console.log(this.props));
  }

  render() {
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
          <Radiobutton Type={'radio'} Name={'units'} Checked={'false'} Value={'English'} />
          <Radiobutton Type={'radio'} Name={'units'} Checked={'true'} Value={'Metric'} />
        </div>
        <div className="row mb-3">
          <Quickview Type={'Temperature'} Reading={'26°C'} />
          <Quickview Type={'Wind Speed'} Reading={'17 kph'} />
          <Quickview Type={'Humidity'} Reading={'73%'} />
          <Quickview Type={'Wind Direction'} Reading={'NE'} />
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

Dashboard.propTypes = {
  getPublicWeatherData: PropTypes.func.isRequired,
  weatherLogs: PropTypes.array.isRequired,
  weatherLog: PropTypes.object.isRequired,
  weatherUnit: PropTypes.object.isRequred
};

const mapStateToProps = state => ({
  weatherLogs: state.weatherLogs,
  weatherLog: state.weatherLog,
  weatherUnit: state.weatherUnit,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicWeatherData }
)(Dashboard);
