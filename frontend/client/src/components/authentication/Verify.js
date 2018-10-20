import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  emailUserVerification,
  confirmUserVerification
} from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class Verify extends Component {
  constructor() {
    super();

    this.state = {
      verifyusertoken: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onVerificationStartSubmit = this.onVerificationStartSubmit.bind(this);
    this.onVerificationSubmit = this.onVerificationSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.user.roles.isVerified) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.roles.isVerified) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onVerificationStartSubmit(e) {
    e.preventDefault();
    console.log('Button clicked');
    this.props.emailUserVerification();
  }

  onVerificationSubmit(e) {
    e.preventDefault();

    const verificationData = {
      verifyusertoken: this.state.verifyusertoken
    };

    this.props.confirmUserVerification(verificationData);
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container col-lg-4 mt-5">
          <h2 className="mb-1">Verify your account</h2>
          <div className="mt-3 mb-4">
            <div className="text-muted">
              Click the button below to send an verification code to your email
            </div>
            <form onSubmit={this.onVerificationStartSubmit}>
              <input type="submit" className="btn btn-primary btn-block mt-3" />
            </form>
          </div>
          <div className="text-muted">
            Use the verification code that was emailed to you to verify your
            account
          </div>
          <form className="mt-3" onSubmit={this.onVerificationSubmit}>
            <TextFieldGroup
              placeholder="Verification Code"
              name="verifyusertoken"
              type="text"
              value={this.state.verifyusertoken}
              onChange={this.onChange}
              error={errors.verifyusertoken}
            />
            <input type="submit" className="btn btn-primary btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

Verify.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { emailUserVerification, confirmUserVerification }
)(Verify);
