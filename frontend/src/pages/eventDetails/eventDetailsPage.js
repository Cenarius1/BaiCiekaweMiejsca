import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

const EventDetailsPage = ({ }) => {
  return (
    <div className="container">
      <h1>Details here</h1>
    </div>
  );
};

EventDetailsPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);