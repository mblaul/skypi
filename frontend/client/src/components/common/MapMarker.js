import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapMarkerStyle } from './MapMarkerStyle';

class MapMarker extends Component {

    render() {
        return (
            <div style={MapMarkerStyle}>
                {this.props.text}
            </div>
        );
    }
}

MapMarker.propTypes = {
    text: PropTypes.string
};

export default connect(
)(MapMarker);