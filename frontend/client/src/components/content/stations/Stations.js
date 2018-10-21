import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDevices } from '../../../actions/deviceActions';

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
    return (
      <div className="container mt-4">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable
              TableHeader={'Active Stations'}
              TableSubtitle={
                'Stations which successfully reported at last request'
              }
              Column1={'ID'}
              Column2={'Name'}
              Column3={'Location'}
              Column4={'Last Reported'}
              Column5={'More Information'}
            />
          </div>
        </div>
      </div>
    );
  }
}

Stations.propTypes = {};

const mapStateToProps = state => ({
  devices: state.devices,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicDevices }
)(Stations);
