import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/Maps/Map';

import * as actions from './actions';

const LoginPage = ({ }) => {
  return (

    <div style={{ width: "100%", height: "100%" }}>  <Map style={{ width: "400px", height: "600px" }} markers={[{
      title: "Some title",
      description: "Some longer description that wil be displayed on map",
      rating: 3.3,
      lat: 59.95,
      lng: 30.33
    }]} /></div>

  );
};

LoginPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);