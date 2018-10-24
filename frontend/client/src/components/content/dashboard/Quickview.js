import React, { Component } from 'react';

export default class Quickview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className=" col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <span className="nowrap">
        <div className="card text-center mb-2">
          <h6 className="card-header">{this.props.Type}</h6>
          <div className="card-body">
            <h4>{this.props.Reading}</h4>
          </div>
        </div>
      </span>
      </div>
    );
  }
}
