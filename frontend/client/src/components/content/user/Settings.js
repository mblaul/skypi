import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser, setUserPreferences } from '../../../actions/authActions';
import DeleteModal from './DeleteModal';

class Settings extends Component {
  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteUser(this.props.auth.user.id);
  }

  onImperialClick() {
    this.props.setUserPreferences('imperial');
  }

  onMetricClick() {
    this.props.setUserPreferences('metric');
  }

  render() {
    const { units } = this.props.auth.preferences;
    return (
      <div>
        <div className="container mt-4">
          <div className="row mb-3">
            <div className="display-3 mx-auto">
              <i className="fas fa-cog" />
              User Settings
            </div>
          </div>
          <div className="col-lg-8 mt-3 mx-auto">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row" />
                  <td className="align-middle">Measurement Units</td>
                  <td>
                    <button
                      className={`btn btn-${
                        units === 'imperial' ? 'success' : 'outline-secondary'
                      } float-right mr-2`}
                      onClick={this.onImperialClick.bind(this)}
                    >
                      Imperial
                    </button>
                    <button
                      className={`btn btn-${
                        units === 'metric' ? 'success' : 'outline-secondary'
                      } float-right mr-2`}
                      onClick={this.onMetricClick.bind(this)}
                    >
                      Metric
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row" />
                  <td className="align-middle">Delete Account</td>
                  <td>
                    <DeleteModal />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  setUserPreferences: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Bring in auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser, setUserPreferences }
)(Settings);
