import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">
              Dashboard
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-dashboard" />
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="">Account</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
