import weatherIcons from '../content/dashboard/weatherIcons';

const MARKER_WIDTH = 20;
const MARKER_HEIGHT = 20;

const MapMarkerStyle = {
    //map object has left top corner at lat lng coordinates by default
    position: 'absolute',
    width: MARKER_WIDTH,
    height: MARKER_HEIGHT,
    left: -MARKER_WIDTH / 2,
    top: -MARKER_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: MARKER_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
}

export {MapMarkerStyle};