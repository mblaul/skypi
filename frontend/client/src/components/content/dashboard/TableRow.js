import React, { Component } from 'react'

export default class Stripetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ID: "1",
        Name: "TableRowTest",
        Salary: "$65,000",
        Country: "Canada",
        City: "Hamilton"
    };
  }
  render() {
    return (
      <div className="container">
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Striped Table with Hover</h4>
                                <p className="category">Here is a subtitle for this table</p>
                            </div>
                            <div className="content table-responsive table-full-width">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <th>ID</th>
                                    	<th>Name</th>
                                    	<th>Salary</th>
                                    	<th>Country</th>
                                    	<th>City</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        	<td>this.state.ID</td>
                                        	<td>this.state.Name</td>
                                        	<td>this.state.Salary</td>
                                        	<td>this.state.Country</td>
                                        	<td>this.state.City</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
    )
  }
}