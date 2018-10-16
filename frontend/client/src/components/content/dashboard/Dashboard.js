import React, { Component } from 'react';

//import pieces of Dashboard
import Textdata from '../dashboard/Textdata';
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';
import Timegraph from '../dashboard/Timegraph';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "Daniel"
      //The code below is to generate it based on a passed prop  
      //Name: this.props.Name
    };
  }
  render() {
    return (
      <div className="container mt-2">
            <header className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 mx-auto">
            <div className="display-3 mb-3">
              <h1>Hello {this.state.Name}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
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