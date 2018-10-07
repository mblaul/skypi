import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="./login">
            SkyPi
          </a>
          <div className="button-container">
            <a className="btn btn-primary" href="./login">
              Sign In
            </a>
            <a className="btn btn-primary" href="./register">
              Register
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
