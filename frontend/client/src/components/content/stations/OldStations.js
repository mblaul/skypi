import React, { Component } from 'react';

//import pieces of Stations
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

export default class Stations extends Component {
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
      <div className="wrapper">
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
        <div className="main-panel">
          <Stripetable />
        </div>
      </div>
    );
  }
}
