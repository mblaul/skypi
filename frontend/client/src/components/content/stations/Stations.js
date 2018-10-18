import React, { Component } from 'react';

//import pieces of Stations
//import Plaintable from './Plaintable';
import Stripetable from '../dashboard/Stripetable';

export default class Stations extends Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable
              TableHeader={'Active Stations'}
              TableSubtitle={
                'Stations which successfully reported at last request'
              }
              Column1={'ID'}
              Column2={'Name'}
              Column3={'Location'}
              Column4={'Last Reported'}
              Column5={'More Information'}
            />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <Stripetable
              TableHeader={'Inactive Stations'}
              TableSubtitle={'Stations which Failed to report at last request'}
              Column1={'ID'}
              Column2={'Name'}
              Column3={'Location'}
              Column4={'Last Reported'}
              Column5={'More Information'}
            />
          </div>
        </div>
      </div>
    );
  }
}
