import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

const EventFormPage = ({ }) => {
  return (
    <div className="container">
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