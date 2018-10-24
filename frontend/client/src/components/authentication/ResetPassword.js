import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      passwordResetToken: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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

    const passwordResetData = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      passwordresettoken: this.props.match.params.token
    };
    //Second parameter allows us to redirect within the resetPassword action
    this.props.resetPassword(passwordResetData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container col-lg-4 mt-5 mx-auto">
          <h2 className="mb-3">Reset Password</h2>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="New Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ResetPassword));
