import React, { Component} from 'react'

export default class Quickview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
        <div className="card mx-1 my-1">
            <h3>{this.props.Type}</h3>
            <div className="card">
                <h2>{this.props.Reading}</h2>
            </div>
        </div>
    )
  }
}