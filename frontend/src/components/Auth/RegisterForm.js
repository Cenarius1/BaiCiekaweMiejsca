import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ login, password, displayName, isBusy, formUpdate, handleSubmit }) => {
  return (<form>
    <div className="form-group">
      <label  htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
      <input type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        value={login}
        disabled={isBusy}
        name="login"
        onChange={(changeEvent) => formUpdate("login", changeEvent)} />
      <small
        id="emailHelp"
        className="form-text text-muted">{"We'll never share your email with anyone else."}</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
      <input type="password"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        value={password}
        disabled={isBusy}
        onChange={(changeEvent) => formUpdate("password", changeEvent)} />
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1" className="sr-only">Display name</label>
      <input type="password"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Display name"
        value={displayName}
        disabled={isBusy}
        onChange={(changeEvent) => formUpdate("displayName", changeEvent)} />
    </div>
    <button className="btn btn-lg btn-primary btn-block" onClick={event => handleSubmit(event)} disabled={isBusy}>
      {isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}

      {isBusy && " Registering..."}
      {!isBusy && "Register"}
    </button>
  </form>);
};

RegisterForm.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};

export default RegisterForm;
