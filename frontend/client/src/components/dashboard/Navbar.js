import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            SkyPi
          </a>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home</a></li>
                <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" hreft="#">Page 1<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Page 1-1</a></li>
                    <li><a href="#">Page 1-2</a></li>
                    <li><a href="#">Page 1-3</a></li>
                  </ul>
                </li>
                <li><a href="#">Page 2</a></li>
                <li><a href="#">Page 3</a></li>
              </ul>
            </div>
          </nav>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="google.com" className="dropdown-toggle" data-toggle="dropdown">
                  Testing
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="google.com">Account</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
