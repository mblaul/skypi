import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class Datepicker extends Component {
    constructor(props){
        super(props);
        this.state = {
          startDate: moment(),
          endDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
        this.setState({
          startDate: date,
          endDate: date
        });
        console.log((this.state.startDate).format("YYYY-MM-DD h:mm A"));
        console.log((this.state.endDate).format("YYYY-MM-DD h:mm A"));
      }
  render() {
    return (
      <div>
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
        />
      </div>
    )
  }
}
