import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <div className="display-1 mb-3">
                  <strong>SkyPi</strong>
                </div>
                <h2 className="mb-4">
                  Your source for reliable weather information.
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
        <section className="features-icons bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-screen-desktop m-auto text-primary" />
                  </div>
                  <h3>View on any device, at home or on the go</h3>
                  <p className="lead mb-0">
                    This site will look great on any device, be it tablet,
                    phone, or supercomputer!
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary" />
                  </div>
                  <h3>Weather Data stored on a Server</h3>
                  <p className="lead mb-0">
                    Utilizing Raspberry Pis with Ansible and Python!
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-check m-auto text-primary" />
                  </div>
                  <h3>Weather Data in Real-time</h3>
                  <p className="lead mb-0">
                    We use only the most up-to-date information, providing you
                    with the latest in weather data!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
