import React, { Component } from 'react'

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar-wrapper">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text">
                    Creative Tim
                </a>
            </div>

            <ul className="nav">
                <li className="active">
                    <a href="dashboard.html">
                        <i class="pe-7s-graph"></i>
                        <p>SkyPi Dashboard</p>
                    </a>
                </li>

            </ul>
    	</div>
    </div>
    )
  }
}
