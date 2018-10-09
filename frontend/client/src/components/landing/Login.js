import React, { Component } from 'react';
import Navbar from './Navbar';

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 w-25">
          <h2 className="mb-3">Login</h2>
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
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
