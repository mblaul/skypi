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
                ID={'1'}
                Name={'Station1'}
                Salary={'$81,000'}
                Country={'United States'}
                City={'Rochester'}
              />
              <TableRow
                ID={'2'}
                Name={'Station2'}
                Salary={'$82,000'}
                Country={'Canada'}
                City={'Hamilton'}
              />
              <TableRow
                ID={'3'}
                Name={'Station3'}
                Salary={'$83,000'}
                Country={'United States'}
                City={'New York'}
              />
              <TableRow
                ID={'4'}
                Name={'Station4'}
                Salary={'$84,000'}
                Country={'Canada'}
                City={'Blind River'}
              />
              <TableRow
                ID={'5'}
                Name={'Station5'}
                Salary={'$85,000'}
                Country={'United States'}
                City={'Austin'}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
