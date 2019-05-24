import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

const LoginPage = ({}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>LocaEvents</h1>
          <h3>Map</h3>
          <Link to={"/"}>Back to log-in page</Link>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);