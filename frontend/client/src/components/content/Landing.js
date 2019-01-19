import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <div className="display-1 mb-3">
                  <strong className="header-title">SkyPi</strong>
                </div>
                <img
                  className="mb-4"
                  src="./img/logo.png"
                  alt="logo"
                  style={{ height: '350px' }}
                />
                <h2 className="header-subtitle mb-4">
                  Your source for reliable weather information. Join now to view
                  crowd-sourced weather data at the best price... Free!
                </h2>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="form-row">
                  <a
                    className="btn btn-lg btn-primary mx-auto"
                    href="./register"
                  >
                    Sign up!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
