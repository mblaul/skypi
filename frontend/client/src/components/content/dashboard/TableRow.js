import React, { Component} from 'react';
import { Link } from 'react-router-dom';

export default class Stripetable extends Component {

  render() {
    return (
        <React.Fragment>
            <tr>
                <td>{this.props.ID}</td>
                <td>
                    <Link to="/stations">
                    {this.props.Name}
                    </Link>
                </td>
                <td>{this.props.Salary}</td>
                <td>{this.props.Country}</td>
                <td>{this.props.City}</td>
            </tr>
        </React.Fragment>
    )
  }
}