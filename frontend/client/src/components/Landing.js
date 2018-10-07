import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card ">
                <div className="card-header ">
                  <h4 className="card-title">SkyPi</h4>
                  <p className="card-category">All products including Taxes</p>
                </div>
                <div className="card-body ">"Hello"</div>
                <div className="card-footer ">
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
