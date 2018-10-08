import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
          <div className="wrapper">
              <Navbar />
            <div className="main-panel">
            <Sidebar />
              <Footer />
            </div>
          </div>
      </Router>
    );
  }
}
