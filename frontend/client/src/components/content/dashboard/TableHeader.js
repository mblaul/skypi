import React, { Component} from 'react';

export default class Stripetable extends Component {

  render() {
    return (
        <React.Fragment>
                <th>{this.props.Header1}</th>
                <th>{this.props.Header2}</th>
                <th>{this.props.Header3}</th>
                <th>{this.props.Header4}</th>
                <th>{this.props.Header5}</th>
        </React.Fragment>
    )
  }
}