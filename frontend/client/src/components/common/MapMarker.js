import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapMarkerStyle } from './MapMarkerStyle';

class MapMarker extends Component {

    render() {
        console.log(this.props.text);
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

// const mapStateToProps = state => ({
//   text: state.text,
// });

export default connect(
//   mapStateToProps
)(MapMarker);