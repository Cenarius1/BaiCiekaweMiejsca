/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import auth from '../../infrastructure/auth';
import logo from '../../assets/logo.png';

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
    return (<div style={{
      "display": "-ms-flexbox",
      "display": "-webkit-box",
      "display": "flex",
      "-ms-flex-align": "center",
      "-ms-flex-pack": "center",
      "-webkit-box-align": "center",
      "align-items": "center",
      "-webkit-box-pack": "center",
      "justify-content": "center",
      "padding-top": "40px",
      "padding-bottom": "40px",
      "background-color": "#f5f5f5",
      "height": "100%"
    }}>
      <div className="row">
      <div className="col-sm-12 col-md-12 offset-md-12 text-center">
        <img src={logo} width="72" height="72" className="mb-4" />
          <h1>LocaEvents</h1>
          <h3>Please Sign-in</h3>
          <AuthForm onSubmit={this.props.handleSubmit} onUpdate={this.props.formUpdate} login={this.props.login} password={this.props.password} isBusy={this.props.isBusy} />
          <div className="col-sm-12 text-center">
            <p className="mt-3 mb-3 text-muted"><Link to="/register">Or register new account</Link></p>
          </div>
        </div>
      </div>
      <div className="row">

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