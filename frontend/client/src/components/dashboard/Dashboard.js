import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import pieces of Dashboard
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Plaintable from './Plaintable';
import Stripetable from './Stripetable';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
          <div className="wrapper">
              <Navbar />
              <Sidebar />
            <div className="main-panel">
              <Plaintable />
              <Stripetable />
              <Footer />
            </div>
          </div>
      </Router>
    );
  }
}
