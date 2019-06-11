/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import auth from '../../infrastructure/auth';

import * as actions from './actions';

class RegisterPage extends Component {
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
        <div className="col-sm-12 col-md-12 offset-md-12">
          <h1>LocaEvents</h1>
          <h3>Register</h3>
          <RegisterForm
            login={this.props.login}
            formUpdate={this.props.formUpdate}
            isBusy={this.props.isBusy}
            password={this.props.password}
            displayName={this.props.displayName}
            event={event}
            handleSubmit={this.props.handleSubmit} />
          <div className="col-sm-12 text-center">
            <p className="mt-3 mb-3 text-muted"><Link to="/">Back to login page</Link></p>
          </div>
        </div>
      </div>
    </div>);
  }
}

RegisterPage.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  login: state.RegisterPage.login,
  password: state.RegisterPage.password,
  displayName: state.RegisterPage.displayName,
  isBusy: state.RegisterPage.isBusy
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(actions.onSubmitClick(event)),
  formUpdate: (field, event) => dispatch(actions.onFormUpdate(field, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);