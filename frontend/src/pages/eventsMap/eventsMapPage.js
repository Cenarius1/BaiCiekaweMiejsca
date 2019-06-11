import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleApiWrapper from '../../components/Maps/Map.js';
import auth from '../../infrastructure/auth';
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as actions from './actions';

class EventsMapPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
  }

  render() {
    return (
      <div>
        <div>
          <button>Manage</button>
          <button>Event List</button>
          <button>Add event</button>
        </div>
        <div>
          <GoogleApiWrapper></GoogleApiWrapper>
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

