import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const forgotPasswordData = {
      email: this.state.email
    };
    //Second parameter allows us to redirect within the resetPassword action
    this.props.forgotPassword(forgotPasswordData);
    alert('Password reset email has been sent!');
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container col-lg-4 mt-5 mx-auto">
          <h2 className="mb-3">Forgot Password</h2>
          <div className="lead">Don't worry, it happens to the best of us!</div>
          <div className="lead mb-2">
            Enter your email below to receive a password reset link.
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(withRouter(ResetPassword));
