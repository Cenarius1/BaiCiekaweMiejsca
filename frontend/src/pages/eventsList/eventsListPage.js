import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

const EventsListPage = ({ }) => {
  return (
    <div className="container">
      <h1>List of events here</h1>
    </div>
  );
};

EventsListPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);