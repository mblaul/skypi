import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

//import pieces of Stations
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

class Stations extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { devices, loading } = this.props.devices;
    let stationsContent;

    if (devices === [] || loading) {
      stationsContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (devices.length > 0) {
        stationsContent = (
          <Stripetable
            TableHeader={'Stations'}
            TableSubtitle={
              'Stations which successfully reported at last request'
            }
            Column1={'ID'}
            Column2={'Name'}
            Column3={'Location'}
            Column4={'Last Reported'}
            Column5={'More Information'}
          />
        );
      }
    }

    return (
      <div className="container mt-4">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="my-2">
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autocomplete="off"
                    checked
                  />{' '}
                  Public
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autocomplete="off"
                  />{' '}
                  Mine
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autocomplete="off"
                  />{' '}
                  Official
                </label>
              </div>
            </div>
            {stationsContent}
          </div>
        </div>
      </div>
    );
  }
}

Stations.propTypes = {
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicDevices }
)(Stations);
