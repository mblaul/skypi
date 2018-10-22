import React, { Component } from 'react';
import TableRow from '../dashboard/TableRow';
import TableHeader from '../dashboard/TableHeader';
export default class Stripetable extends Component {
  render() {
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">{this.props.TableHeader}</h4>
          <p className="category">{this.props.TableSubtitle}</p>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <TableHeader
                  Header1={this.props.Column1}
                  Header2={this.props.Column2}
                  Header3={this.props.Column3}
                  Header4={this.props.Column4}
                  Header5={this.props.Column5}
                />
              </tr>
            </thead>
            <tbody>
              <TableRow
                ID={this.props.weatherLogs[0].date}
                Name={this.props.weatherLogs[0].temperature}
                Salary={this.props.weatherLogs[0].humidity}
                Country={this.props.weatherLogs[0].wind}
                City={this.props.weatherLogs[0].winddirection}
              />
              <TableRow
                ID={this.props.weatherLogs[1].date}
                Name={this.props.weatherLogs[1].temperature}
                Salary={this.props.weatherLogs[1].humidity}
                Country={this.props.weatherLogs[1].wind}
                City={this.props.weatherLogs[1].winddirection}
              />
              <TableRow
                ID={this.props.weatherLogs[2].date}
                Name={this.props.weatherLogs[2].temperature}
                Salary={this.props.weatherLogs[2].humidity}
                Country={this.props.weatherLogs[2].wind}
                City={this.props.weatherLogs[2].winddirection}
              />
              <TableRow
                ID={this.props.weatherLogs[3].date}
                Name={this.props.weatherLogs[3].temperature}
                Salary={this.props.weatherLogs[3].humidity}
                Country={this.props.weatherLogs[3].wind}
                City={this.props.weatherLogs[3].winddirection}
              />
              <TableRow
                ID={this.props.weatherLogs[4].date}
                Name={this.props.weatherLogs[4].temperature}
                Salary={this.props.weatherLogs[4].humidity}
                Country={this.props.weatherLogs[4].wind}
                City={this.props.weatherLogs[4].winddirection}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
