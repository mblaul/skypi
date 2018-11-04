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
          startDate: date
        });
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
