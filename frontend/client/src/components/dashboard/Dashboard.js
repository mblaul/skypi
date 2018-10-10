import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import pieces of Dashboard
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Textdata from './Textdata';
//import Plaintable from './Plaintable';
//import Stripetable from './Stripetable';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
          <div className="wrapper">
              <Navbar />
          <div className="side-wrapper">
              <Sidebar />
          </div>
            <div className="main-panel">
              <Textdata />
              <Footer />
            </div>
          </div>
      </Router>
    );
  }
}
