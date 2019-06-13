import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/Maps/Map';
import auth from '../../infrastructure/auth';
import { NavigationBottom } from '../../components/NavigationBottom';

import * as actions from './actions';

class EventsMapPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();
  }

  render() {
    return (<div style={{
      width: "100%",
      height: "100%"
    }}>  
    <NavigationBottom/>
    
    <Map style={{
      width: "400px",
      height: "600px"
    }} markers={[{
      title: "Some title",
      description: "Some longer description that wil be displayed on map",
      rating: 3.3,
      lat: 59.95,
      lng: 30.33
    }]} /></div>);
  }
}

EventsMapPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsMapPage);