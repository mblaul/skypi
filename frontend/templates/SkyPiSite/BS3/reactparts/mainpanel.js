import React, { Component } from 'react'

export default class mainpanel extends Component {
  render() {
    return (
      <div>
        <div className="main-panel">
        <nav className="navbar navbar-default navbar-fixed">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Dashboard</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-left">
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-dashboard"></i>
                            </a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li>
                           <a href="">
                               Account
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </div>
    </div>
    )
  }
}
