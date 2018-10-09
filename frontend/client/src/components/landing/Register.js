import React, { Component } from 'react';
import Navbar from './Navbar';

class Register extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 w-25">
          <h2 className="mb-3">Register</h2>
          <form>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label for="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password2"
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
