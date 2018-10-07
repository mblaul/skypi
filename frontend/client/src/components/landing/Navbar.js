import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            SkyPi
          </a>
          <div className="button-container">
            <button className="btn btn-primary" href="/login">
              Sign In
            </button>
            <button className="btn btn-primary" href="/register">
              Register
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
