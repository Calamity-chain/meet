import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  };

  ShowDetailsButton = () => {
    if (this.state.showDetails === true) {
      this.setState({ showDetails: false });
    } else {
      this.setState({ showDetails: true });
    }
  };

  render() {
    const { event } = this.props;
    return (
      <div className='event-container'>
        <h1>{event.summary}</h1>
        <p>{event.start.dateTime}</p>
        <p className='locations'>{event.location}</p>

        {this.state.showDetails && (
          <div className='event-details'>
            <h2>About event:</h2>
            <a href={event.htmlLink}>See Details</a>
            <p>{event.description}</p>
          </div>
        )}

        <button
          className='show-details-btn'
          onClick={() => this.ShowDetailsButton()}
        >
          {!this.state.showDetails ? 'show details' : 'hide-details'}
        </button>
      </div>
    );
  }
}
export default Event;