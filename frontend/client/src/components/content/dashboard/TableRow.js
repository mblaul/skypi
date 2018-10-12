import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

export default class Stripetable extends Component {
    constructor(props) {
    super(props);
    this.state = {
        ID: this.props.ID,
        Name: this.props.Name,
        Salary: this.props.Salary,
        Country: this.props.Country,
        City: this.props.City
    };
  }
  render() {
    return (
        <React.Fragment>
            <tr>
                <td>{this.state.ID}</td>
            <Link to="/stations">
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