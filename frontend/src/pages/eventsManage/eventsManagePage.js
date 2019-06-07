import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

const EventsManagePage = ({ }) => {
  return (
    <div className="container">
      <h1>Events manager here</h1>
    </div>
  );
};

EventsManagePage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsManagePage);