import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class OldDatepicker extends Component {
    constructor(props){
        super(props);
        this.state = {
          baseDate: moment(),
          returnDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
        console.log((this.state.baseDate).format("YYYY-MM-DD h:mm A"));
        this.setState({
          baseDate: date
          //Trying to get it to output Start and end date properly
        });
        //window.alert(this.state.baseDate);
      }
      //HandleSelect Function provides the value after selection, where as on change often returned the value prior to the change
      handleSelect(date) {
        var returnDate = date.format("YYYY-MM-DD h:mm A")
        window.alert(returnDate);
        return returnDate;
      }
  render() {
    return (
      <div>
        <DatePicker
          onChange = {this.handleChange}
          selected={this.state.baseDate}
          onSelect={this.handleSelect}
          value={this.handleSelect}
        />
      </div>
    )
  }
}
