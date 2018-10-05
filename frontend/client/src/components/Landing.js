import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card ">
                <div class="card-header ">
                  <h4 class="card-title">SkyPi</h4>
                  <p class="card-category">All products including Taxes</p>
                </div>
                <div class="card-body ">"Hello"</div>
                <div class="card-footer ">
                  <hr />
                  <div class="stats">
                    <i class="fa fa-check" /> Data information certified
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
