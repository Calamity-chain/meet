import React, { Component } from 'react';
import {WarningAlert} from './Alert';
import Event from './Event';

class EventList extends Component {

  state = {
    warningText : ""
  }

  closeAlert = () => {
    this.setState({
      warningText : ''
    })
  }

  checkConnection = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: "You are not connected to the internet and viewing events offline. Connect to the internet for an updated list of events."
      })
    }
  }

  componentDidMount() {
    this.checkConnection();
  }


  render() {
    const {events} = this.props;
    return (
      <ul className="EventList">
        { this.state.infoText
                ? <WarningAlert text={this.state.infoText} close={this.closeAlert}/>
                : null  
                }
        {events.map(event =>
          <li key={event.id}>
            <Event event={event}/>
          </li>
          )}
      </ul>
    );
  }
}

export default EventList;