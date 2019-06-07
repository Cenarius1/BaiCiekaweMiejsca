import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';

import RegisterForm from '../../components/Auth/RegisterForm';

const LoginPage = ({ handleSubmit, formUpdate, login, password, displayName, navigation }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 col-md-8 offset-md-2">
          <h1>LocaEvents</h1>
          <h3>Register</h3>
          <RegisterForm
            onSubmit={handleSubmit}
            onUpdate={formUpdate}
            login={login}
            password={password}
            displayName={displayName} />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  login: state.RegisterPage.login,
  password: state.RegisterPage.password,
  displayName: state.RegisterPage.displayName
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(actions.onSubmitClick(event)),
  formUpdate: (field, event) => dispatch(actions.onFormUpdate(field, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);