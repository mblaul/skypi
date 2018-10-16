import React, { Component } from 'react';

//import pieces of Stations
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

export default class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: this.props.ID,
      Name: this.props.Name,
      Email: this.props.Salary,
      Admin: this.props.Country,
      Delete: this.props.City
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
