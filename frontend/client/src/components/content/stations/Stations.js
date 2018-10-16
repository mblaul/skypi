import React, { Component } from 'react';

//import pieces of Stations
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

export default class Stations extends Component {
  render() {
    return (
      <div className="wrapper">
        <header className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 mx-auto">
                <div className="display-3 mb-3">
                  <h1>Hello User!</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mt-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Stripetable />
          </div>
        </div>
      </div>
    );
  }
}
