import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import { isAfter } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class Datepicker extends Component {
  constructor(props) {
    super(props);
     this.state = {
       startDate: moment(),
       endDate: moment()
     };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.startDate;
    endDate = endDate || this.endDate;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
    window.alert(startDate);
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    return (
      <div className="row">
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}
 