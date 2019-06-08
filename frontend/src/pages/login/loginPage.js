import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import auth from '../../infrastructure/auth';

import * as actions from './actions';

import AuthForm from '../../components/Auth/AuthForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.navigateToAppIfAuthericated();
  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 col-md-8 offset-md-2">
          <h1>LocaEvents</h1>
          <h3>Sign-in</h3>
          <AuthForm onSubmit={this.props.handleSubmit} onUpdate={this.props.formUpdate} login={this.props.login} password={this.props.password} isBusy={this.props.isBusy} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Link to="/register">Or register new account</Link>
        </div>
      </div>
    </div>);
  }
}

LoginPage.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired,
  checkAuthericated: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  login: state.LoginPage.login,
  password: state.LoginPage.password,
  remember: state.LoginPage.remember,
  isBusy: state.LoginPage.isBusy
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthericated: () => dispatch(actions.onCheckAuthericated()),
  handleSubmit: (event) => dispatch(actions.onSubmitClick(event)),
  formUpdate: (field, event) => dispatch(actions.onFormUpdate(field, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);