import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/authActions';
import DeleteModal from './DeleteModal';

class Settings extends Component {
  
  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteUser(this.props.auth.user.id);
  }

  render() {
    return (
      <div>
        <div className="container mt-4">
          <div className="row mb-3">
            <div className="display-3 mx-auto">
              <i className="fas fa-cog" /> User Settings
            </div>
          </div>
          <div className="col-lg-8 mt-3 mx-auto">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" />
                  <td className="align-middle">Measurement Units</td>
                  <td>
                    <button className="btn btn-info float-right">Metric</button>
                    <button className="btn btn-primary float-right mr-2">Imperial</button>
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
  auth: PropTypes.object.isRequired
};

// Bring in auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(Settings);