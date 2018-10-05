import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <div
        class="sidebar"
        data-color="purple"
        data-image="assets/img/sidebar-5.jpg"
      >
        {/* <!--
    
            Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
            Tip 2: you can also add an image using data-image tag
    
        --> */}

        <div className="sidebar-wrapper">
          <div className="logo">
            <a href="http://www.creative-tim.com" className="simple-text">
              SkyPi
            </a>
          </div>

          <ul className="nav">
            <li className="active">
              <a href="dashboard.html">
                <i class="pe-7s-graph" />
                <p>Dashboard</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
