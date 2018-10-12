import React, { Component } from 'react'
import TableRow from '../dashboard/TableRow'

export default class Stripetable extends Component {
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
                                    <TableRow />
                                    <TableRow />
                                    <TableRow />
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
