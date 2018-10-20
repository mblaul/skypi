import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const VerifiedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        auth.user.roles.isVerified === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/verify" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

VerifiedRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(VerifiedRoute);
