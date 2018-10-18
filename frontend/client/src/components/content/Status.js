import React, { Component} from 'react';

import Quickview from './dashboard/Quickview';
import Stripetable from './dashboard/Stripetable';
import Timegraph from './dashboard/Timegraph';


export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="container mt-2">
      <header className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 mx-auto">
              <div className="display-3 mb-3 my-2">
              <h1> Weather Station {'Pull Station Number/Name From Props Passed'}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
        <div>
          <div>
            <h2>Weather Station Quick View</h2>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Quickview Type={'Temp'} Reading={'77°'} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Quickview Type={'Humidity'} Reading={'68°'}/>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Quickview Type={'Wind Speed'} Reading={'17 mph'}/>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Quickview Type={'Wind Direction'} Reading={'NorthEast'}/>
              </div>
            </div>
          </div>
          <Stripetable />
        </div>
      </div>

    );
  }
}