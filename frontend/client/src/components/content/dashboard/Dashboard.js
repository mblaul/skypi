import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicWeatherData } from '../../../actions/weatherActions';

//import pieces of Dashboard
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';
import Quickview from '../dashboard/Quickview';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getPublicWeatherData();
    console.log(this.props.weatherLogs);
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

        <h2>Weather Station Quick View</h2>
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Quickview Type={'Temperature'} Reading={'77°F'} />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Quickview Type={'Wind Speed'} Reading={'17 mph'}/>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Quickview Type={'Humidity'} Reading={'73%'}/>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Quickview Type={'Wind Direction'} Reading={'NorthEast'}/>
          </div>

        </div>
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable  
              TableHeader={'Striped Table Header'}
              TableSubtitle={'Here is a Subtitle for this table'}
              Column1={'ID'}
              Column2={'Name'}
              Column3={'Salary'}
              Column4={'Country'}
              Column5={'City'}
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
