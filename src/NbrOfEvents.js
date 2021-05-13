import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventValue: 32,
  };

  handleEventInputChanged = (event) => {
    const eventValue = event.target.value;
    if (eventValue < 1) {
      return this.setState({
        eventValue:'',
        errorText:'Select number between 1 and 32',
      });
    }else if (eventValue > 32) {
      return this.setState({
        eventValue:'',
        errorText:'Select number between 1 and 32',
      });
    }else{
      this.setState({
        eventValue,
        errorText:'',
      });
    this.props.updateEvents(null, eventValue);
    } 
  };

  render() {
    return (
      <div className='event-number'>
        <ErrorAlert text={this.state.errorText}/>
        <label htmlFor='numberOfEvent'>Number of Events:</label>
        <input
          type='number'
          name='numberOfEvent'
          className='event-number-input'
          placeholder='Enter Number of Events'
          value={this.state.eventValue}
          onChange={this.handleEventInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
