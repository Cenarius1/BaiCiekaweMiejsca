import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from '../../infrastructure/auth';
import * as actions from './actions';
import EventsList from './EventsList';

const events = [
    {
      "description": "Some short description of the event",
      "rating": 5,
      "fullDescription": "Some longer description that describes more what is this event about",
      "organizers": "Adam",
      "contact": "+48 123123123",
      // "localization": {
      //     "latitude": 21.02,
      //     "longitude": 50.01
      // },
      "date": 1559842654382,
      "id": "fc1d2a48-280c-4b75-b3a4-72b101c11ff8",
      "cost": 1,
      "title": "sometitle"
  },
  {
    "description": "Some short description of the event",
    "rating": 5,
    "fullDescription": "Some longer description that describes more what is this event about",
    "organizers": "Adam",
    "contact": "+48 123123123",
    // "localization": {
    //     "latitude": 21.02,
    //     "longitude": 50.01
    // },
    "date": 1559842654382,
    "id": "fc1d2a48-280c-4b75-b3a4-72b101c11ff8",
    "cost": 1,
    "title": "sometitle"
  }
];


class EventsListPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
  }

  state = {
    events: []
  };

  componentDidMount() {
    fetch('https://us-central1-bai-1212.cloudfunctions.net/api/events')
      .then(result => {
        return result.json();
      }).then(response => {

        const newEvents = response.data.map(e => {
          return {
            description: e.description,
            rating: e.rating,
            fullDescription: e.fullDescription, 
            organizers: e.organizers,
            contact: e.contact,
            date: e.date,
            id: e.id,
            cost: e.cost,
            title: e.title
          };
        });

        const newState = Object.assign({}, this.state, {
          events: newEvents
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="EventsListPage">
        <header className="EventsListPage-header">
          <h1 className="EventsListPage-title">List of events</h1>
        </header>
        {/* <EventsList events={events} /> */}
        <EventsList events={this.state.events} />
      </div>
    );
  }
}

EventsListPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);