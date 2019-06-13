import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleApiWrapper from '../../components/Maps/Map.js';
import auth from '../../infrastructure/auth';
import * as actions from './actions';
import { BusyIndicator } from '../../components/BusyIndicator';
import { NavigationBottom } from '../../components/NavigationBottom';

class EventsMapPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
    this.props.getEvents();
  }

  render() {
    return (
      <div>
        <div>
          <NavigationBottom />
          {!this.props.isBusy && <GoogleApiWrapper events={this.props.events} initialPoint={this.props.initialPoint} onDetailsClick={this.props.navigateToDetails} />}

          {this.props.isBusy && <BusyIndicator text={"Loading..."} />}
        </div>
      </div>
    );
  }
}

EventsMapPage.propTypes = {
  getEvents: PropTypes.func.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  initialPoint: PropTypes.object.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  events: state.EventsMapPage.events,
  initialPoint: state.EventsMapPage.initialPoint,
  isBusy: state.EventsMapPage.isBusy,

});

const mapDispatchToProps = (dispatch) => ({
  getEvents: () => dispatch(actions.onGetEvents()),
  navigateToDetails: (id) => dispatch(actions.onNavigateToDetails(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsMapPage);

