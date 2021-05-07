import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventValue: 32,
  };

  handleEventInputChanged = (event) => {
    const eventValue = event.target.value;
    this.setState({
      eventValue,
    });
    this.props.updateEvents(null, eventValue);
  };

  render() {
    return (
      <div className='event-number'>
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
