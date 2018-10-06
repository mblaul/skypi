import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light static-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            SkyPi
          </a>
          <a class="btn btn-primary" href="#">
            Sign In
          </a>
        </div>
      </nav>
    );
  }
}
