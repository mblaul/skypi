import React, { Component } from 'react';

//import pieces of Dashboard
import Textdata from '../dashboard/Textdata';
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';
//import Timegraph from '../dashboard/Timegraph'; Issues to be resolved!

export default class Dashboard extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-panel">
          <Stripetable />
          <Textdata />
        </div>
      </div>
    );
  }
}
