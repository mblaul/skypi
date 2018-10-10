import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import pieces of Dashboard
import Sidebar from '../../layout/Sidebar';
import Textdata from '../dashboard/Textdata';
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

export default class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="side-wrapper">
            <Sidebar />
          </div>
          <div className="main-panel">
            <Stripetable />
            <Textdata />
          </div>
        </div>
      </Router>
    );
  }
}
