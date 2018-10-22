import React, { Component} from 'react';
import Stripetable from './dashboard/Stripetable';

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
          </div>
          <Stripetable   
                TableHeader={'Weather Station\'s Readings'}
                TableSubtitle={'Recent Readings for the selected Station'} 
                Column1={'Time'}
                Column2={'Temp'}
                Column3={'Humidity'}
                Column4={'Wind Speed'}
                Column5={'Wind Direction'}
            />
        </div>
    );
  }
}