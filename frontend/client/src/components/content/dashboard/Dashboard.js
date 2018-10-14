import React, { Component } from 'react';

//import pieces of Dashboard
import Textdata from '../dashboard/Textdata';
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container mt-2">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Timegraph />
          </div>
        </div>
        <Textdata />
      </div>
    );
  }
}
