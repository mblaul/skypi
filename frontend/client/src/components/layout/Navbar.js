import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import LogoutModal from './LogoutModal';

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    let adminButton;
    if (isAuthenticated) {
      if (user.roles.isAdmin) {
        adminButton = (
          <li className="nav-item">
            <Link className="btn btn-danger mr-2" to="/admin">
              Admin
            </Link>
          </li>
        );
      }
    }

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {adminButton}
        <li className="nav-item">
          <Link className="btn btn-info mr-2" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-info mr-2" to="/getstarted">
            Get Started
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-info mr-2" to="/stations">
            Stations
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-info mr-2" to="/locations">
            Locations
          </Link>
        </li>
        <LogoutModal />
        <li className="nav-item">
          <Link className="btn btn-secondary mr-2" to="/settings">
            <i className="fas fa-cog" />
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="btn btn-primary mr-2" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-primary" to="/login">
            Log In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar  navbar-expand-sm navbar-light bg-light static-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img alt="logo" src="./img/logo.png" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Bring in auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
