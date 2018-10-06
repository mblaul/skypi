import React, { Component } from 'react';
import Navbar from './Navbar';

export default class LandingMain extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">
                  Your source for reliable weather information.
                </h1>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form>
                  <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter your email..."
                      />
                    </div>
                    <div className="col-12 col-md-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-lg btn-primary"
                      >
                        Sign up!
                      </button>
                    </div>
                  </div>
                </form>
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
                  <h3>Fully Responsive</h3>
                  <p className="lead mb-0">
                    This theme will look great on any device, no matter the
                    size!
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary" />
                  </div>
                  <h3>Bootstrap 4 Ready</h3>
                  <p className="lead mb-0">
                    Featuring the latest build of the new Bootstrap 4 framework!
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-check m-auto text-primary" />
                  </div>
                  <h3>Easy to Use</h3>
                  <p className="lead mb-0">
                    Ready to use with your own content, or customize the source
                    files!
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
