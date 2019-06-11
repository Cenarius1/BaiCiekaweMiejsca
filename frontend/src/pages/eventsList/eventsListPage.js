import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from '../../infrastructure/auth';
import * as actions from './actions';
import EventsList from './EventsList';


class EventsListPage extends Component {
  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
    this.props.loadEvents();
  }

  render() {
    return (
      <div className="EventsListPage">
        <header className="EventsListPage-header">
          <h1 className="EventsListPage-title">Upcoming Events</h1>
        </header>
        {this.props.isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
        {!this.props.isBusy && <EventsList events={this.props.events} onEventClick={this.props.eventClick} />}
      </div>
    );
  }
}

EventsListPage.propTypes = {
  eventClick: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  events: state.EventsListPage.events,
  isBusy: state.EventsListPage.isBusy
});

const mapDispatchToProps = (dispatch) => ({
  eventClick: (id) => dispatch(actions.onEventClick(id)),
  loadEvents: () => dispatch(actions.onLoadEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);