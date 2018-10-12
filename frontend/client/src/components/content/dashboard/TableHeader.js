import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

export default class Stripetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ID: "ID",
        Name: "Name",
        Salary: "Salary",
        Country: "Country",
        City: "City"
    };
  }
  render() {
    return (
        <React.Fragment>
                <th>{this.state.ID}</th>
                <th>{this.state.Name}</th>
                <th>{this.state.Salary}</th>
                <th>{this.state.Country}</th>
                <th>{this.state.City}</th>
        </React.Fragment>
    )
  }
}