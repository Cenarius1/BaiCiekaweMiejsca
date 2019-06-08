import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    return (<div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 col-md-8 offset-md-2">
          <h1>LocaEvents</h1>
          <h3>Register</h3>
          <RegisterForm login={this.props.login} formUpdate={this.props.formUpdate} isBusy={this.props.isBusy} password={this.props.password} displayName={this.props.displayName} event={event} handleSubmit={this.props.handleSubmit} />
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