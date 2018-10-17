import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicWeatherData } from '../../../actions/weatherActions';

//import pieces of Dashboard
import Textdata from '../dashboard/Textdata';
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getPublicWeatherData();
  }

  render() {
    return (
      <div className="container mt-2">
        <header className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 mx-auto">
                <div className="display-3 mb-3 my-2">
                  <h1>Hello {`<get name from user state>`}</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Timegraph />
          </div>
        </div>
        <Textdata />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPublicWeatherData: PropTypes.func.isRequired,
  weatherLogs: PropTypes.array.isRequired,
  weatherLog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weatherLogs: state.weatherLogs,
  weatherLog: state.weatherLog
});

export default connect(
  mapStateToProps,
  { getPublicWeatherData }
)(Dashboard);
