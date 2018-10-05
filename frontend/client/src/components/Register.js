import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="FormControl">
        <h2>Register Account</h2>
        <br />
        <form name="RegisterForm" action="DataBasePost">
          <label id="Name">
            {' '}
            Enter Name:
            <input type="text" name="name" defaultValue="" />
          </label>
          <br />
          <label id="Email">
            {' '}
            Enter Email:
            <input type="text" name="email" defaultValue="" />
          </label>
          <br />
          <label id="ConfirmEmail">
            {' '}
            Confirm Email:
            <input type="text" name="emailConfirm" defaultValue="" />
          </label>
          <br />
          <label id="Password">
            {' '}
            Enter Password:
            <input type="password" name="password" defaultValue="" />
          </label>
          <br />
          <label id="ConfirmPassword">
            {' '}
            Confirm Password:
            <input type="password" name="passwordConfirm" defaultValue="" />
          </label>
          <br />
          <button className="btn btn-primary"> Register </button>
        </form>
      </div>
    );
  }
}
export default Register;
