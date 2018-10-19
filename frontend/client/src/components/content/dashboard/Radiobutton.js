import React, { Component } from 'react';

export default class Radiobutton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="radio">
        <label className="col-xs-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto">
          <input type={this.props.Type} name={this.props.Name} value={this.props.Value} /> {this.props.Value}
        </label>
      </div>
    );
  }
}
