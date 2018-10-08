import React, { Component } from 'react';

export default class Navbar extends Component {
  //Changed the Login and register buttons to anchors, because the redirect functionality works for them
  render() {
    return (
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="/Dashboard">
            SkyPi
          </a>
          <div className="button-container">
            <a className="btn btn-primary mr-2" href="./login">
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
