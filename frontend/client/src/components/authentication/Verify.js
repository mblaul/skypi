import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';

class Verify extends Component {
  constructor() {
    super();

    this.state = {
      verifyusertoken: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    const verifyUserToken = this.state.verifyusertoken;

    //Call the action to login a user
    // TBD: this.props.verifyUser(verifyUserToken);
  }
  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container col-lg-4 mt-5">
          <h2 className="mb-1">Verify your account</h2>
          <lead className="text-muted">
            Use the verification code that was emailed to you to verify your
            account
          </lead>
          <form className="mt-3" onSubmit={this.onSubmit}>
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
  {}
)(Verify);
