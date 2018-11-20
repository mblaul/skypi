import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class OldDatepicker extends Component {
    constructor(props){
        super(props);
        this.state = {
          baseDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
        this.setState({
          baseDate: date
          //Trying to get it to output Start and end date properly
        });
        console.log((this.state.baseDate).format("YYYY-MM-DD h:mm A"));
      }
  render() {
    return (
      <div>
        <DatePicker
            selected={this.state.baseDate}
            onChange={this.handleChange}
        />
      </div>
    )
  }
}
