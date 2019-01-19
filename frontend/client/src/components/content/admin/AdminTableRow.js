import React, { Component } from 'react'

export default class AdminTableRow extends Component {
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
        <React.Fragment>
        <tr>
            <td>{this.state.ID}</td>
        <Link>
            <td>{this.state.Name}</td>
        </Link>
            <td>{this.state.Salary}</td>
            <td>{this.state.Country}</td>
            <td>{this.state.City}</td>
        </tr>
        </React.Fragment>
    )
  }
}
