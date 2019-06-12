import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleApiWrapper from '../../components/Maps/Map.js';
import auth from '../../infrastructure/auth';
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as actions from './actions';
import history from '../../history';
import { BASE_API_URL } from '../../constants/urls';
import { request, HTTP_METHOD } from '../../helpers/request';


class EventsMapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: []
    }

    this.state.eventList = [
      {
        id: 1,
        title: 't1',
        name: 'n1',
        lat: -1.2884,
        lng: 36.8233
      },
      {
        id: 2,
        title: 't2',
        name: 'n2',
        lat: -1.2884,
        lng: 37.0
      }
    ]
  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
    this.getEvents();
  };

  goToAddEvent() {
    history.replace('add')
  };
  goToManage() {
    history.replace('manage')
  };

  getEvents = async () => {
    const requestResponse = await request(BASE_API_URL + "/api/events", { method: "GET", headers: {}, body: {} });
    this.state.eventList = requestResponse.data;
    console.log('getEvents');
    console.log(this.state.eventList);
  }

  goToEventList = () => {
    history.replace('list')
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.goToManage}>Manage</button>
          <button onClick={this.goToEventList}>Event List</button>
          <button onClick={this.goToAddEvent}>Add event</button>
        </div>
        <div>
          <GoogleApiWrapper eventList={this.state.eventList} ></GoogleApiWrapper>
        </div>
      </div>
    );
  }
}

EventsMapPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsMapPage);

