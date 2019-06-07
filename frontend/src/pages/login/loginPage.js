import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import * as actions from './actions';

import AuthForm from '../../components/Auth/AuthForm';

const LoginPage = ({ handleSubmit, formUpdate, login, password, remember, navigation }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 col-md-8 offset-md-2">
          <h1>LocaEvents</h1>
          <h3>Sign-in</h3>
          <AuthForm
            onSubmit={handleSubmit}
            onUpdate={formUpdate}
            login={login}
            password={password}
            remember={remember} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Link to="/register">Or register new account</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-auto-logout-link="false" data-use-continue-as="false" />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  login: state.LoginPage.login,
  password: state.LoginPage.password,
  remember: state.LoginPage.remember
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(actions.onSubmitClick(event)),
  formUpdate: (field, event) => dispatch(actions.onFormUpdate(field, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);