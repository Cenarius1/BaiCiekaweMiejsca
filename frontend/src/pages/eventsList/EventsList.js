import React, { Component } from "react";
import Event from "./Event";
import PropTypes from 'prop-types';

class EventsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="row">
      {this.props.events.map((e, index) => <Event
        key={e.id}
        description={e.description}
        rating={e.rating.average}
        owner={e.user.displayName}
        date={e.date}
        id={e.id}
        name={e.name}
        onClick={this.props.onEventClick} />)}
    </div>);
  }
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired
};

export default EventsList;