import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
              <Navbar />
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
