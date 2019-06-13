import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationBottom } from '../../components/NavigationBottom';

import * as actions from './actions';

const EventFormPage = ({ }) => {
  return (
    <div className="container">
      <NavigationBottom/>
      <h1>Event add/edit form here</h1>
    </div>
  );
};

EventFormPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventFormPage);