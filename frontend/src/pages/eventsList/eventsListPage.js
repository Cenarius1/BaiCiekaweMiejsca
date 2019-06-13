import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from '../../infrastructure/auth';
import * as actions from './actions';
import EventsList from './EventsList';
import { NavigationBottom } from '../../components/NavigationBottom';


class EventsListPage extends Component {
  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
    this.props.loadEvents();
  }

  formatTimestamp(UNIX_timestamp) {
    if (!UNIX_timestamp)
      return;

    let a = new Date(UNIX_timestamp * 1000);

    return ('0' + a.getDate()).slice(-2) + '/'
      + ('0' + (a.getMonth() + 1)).slice(-2) + '/'
      + a.getFullYear() + ' '
      + ('0' + a.getHours()).slice(-2) + ':'
      + ('0' + a.getMinutes()).slice(-2) + " (" + Intl.DateTimeFormat().resolvedOptions().timeZone + " Timezone)";
  }

  render() {
    return (
      <div className="container">
        <NavigationBottom />
        <header className="EventsListPage-header">
          <h2 className="EventsListPage-title">Upcoming Events</h2>
        </header>

<div className="mb-5">
        {this.props.events.map(event =>
          <div key={event.id} className="block mt-2" onClick={() => this.props.eventClick(event.id)}>
            <dl className="row">
              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{event.name}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">
                <p>{event.description}</p>
              </dd>

              <dt className="col-sm-3">Date</dt>
              <dd className="col-sm-9">{this.formatTimestamp(event.date)}</dd>
            </dl>
          </div>)}
          </div>
        {this.props.isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
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