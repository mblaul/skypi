import React, { Component } from 'react';

export default class Test extends Component {
  render() {
    return (
      <div className="wrapper">
        <div
          className="sidebar"
          data-color="purple"
          data-image="assets/img/sidebar-5.jpg"
        >
          <div className="sidebar-wrapper">
            <div className="logo">
              <a href="http://www.creative-tim.com" className="simple-text">
                Creative Tim
              </a>
            </div>

            <ul className="nav">
              <li>
                <a href="dashboard.html">
                  <i className="pe-7s-graph" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li>
                <a href="user.html">
                  <i className="pe-7s-user" />
                  <p>User Profile</p>
                </a>
              </li>
              <li className="active">
                <a href="table.html">
                  <i className="pe-7s-note2" />
                  <p>Table List</p>
                </a>
              </li>
              <li>
                <a href="typography.html">
                  <i className="pe-7s-news-paper" />
                  <p>Typography</p>
                </a>
              </li>
              <li>
                <a href="icons.html">
                  <i className="pe-7s-science" />
                  <p>Icons</p>
                </a>
              </li>
              <li>
                <a href="maps.html">
                  <i className="pe-7s-map-marker" />
                  <p>Maps</p>
                </a>
              </li>
              <li>
                <a href="notifications.html">
                  <i className="pe-7s-bell" />
                  <p>Notifications</p>
                </a>
              </li>
              <li className="active-pro">
                <a href="upgrade.html">
                  <i className="pe-7s-rocket" />
                  <p>Upgrade to PRO</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-panel">
          <nav className="navbar navbar-default navbar-fixed">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="#">
                  Table List
                </a>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-left">
                  <li>
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-dashboard" />
                      <p className="hidden-lg hidden-md">Dashboard</p>
                    </a>
                  </li>
                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-globe" />
                      <b className="caret hidden-sm hidden-xs" />
                      <span className="notification hidden-sm hidden-xs">
                        5
                      </span>
                      <p className="hidden-lg hidden-md">
                        5 Notifications
                        <b className="caret" />
                      </p>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">Notification 1</a>
                      </li>
                      <li>
                        <a href="#">Notification 2</a>
                      </li>
                      <li>
                        <a href="#">Notification 3</a>
                      </li>
                      <li>
                        <a href="#">Notification 4</a>
                      </li>
                      <li>
                        <a href="#">Another notification</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa fa-search" />
                      <p className="hidden-lg hidden-md">Search</p>
                    </a>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="">
                      <p>Account</p>
                    </a>
                  </li>
                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <p>
                        Dropdown
                        <b className="caret" />
                      </p>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">Action</a>
                      </li>
                      <li>
                        <a href="#">Another action</a>
                      </li>
                      <li>
                        <a href="#">Something</a>
                      </li>
                      <li>
                        <a href="#">Another action</a>
                      </li>
                      <li>
                        <a href="#">Something</a>
                      </li>
                      <li className="divider" />
                      <li>
                        <a href="#">Separated link</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <p>Log out</p>
                    </a>
                  </li>
                  <li className="separator hidden-lg hidden-md" />
                </ul>
              </div>
            </div>
          </nav>

          <div id="stripetable" />

          <div id="plaintable" />

          <footer className="footer">
            <div className="container-fluid">
              <nav className="pull-left">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Portfolio</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
              </nav>
              <p className="copyright pull-right">
                &copy; <script>document.write(new Date().getFullYear())</script>{' '}
                <a href="http://www.creative-tim.com">Creative Tim</a>, made
                with love for a better web
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
