import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit, onUpdate, login, password, isBusy }) => (
  <form>
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
        onChange={(changeEvent) => onUpdate("login", changeEvent)} />
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
        onChange={(changeEvent) => onUpdate("password", changeEvent)} />
    </div>
    <button className="btn btn-lg btn-primary btn-block" onClick={event => onSubmit(event)} disabled={isBusy}>
      {isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}

      {isBusy && " Authenticating..."}
      {!isBusy && "Sign-in"}
    </button>
  </form>
);

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired
};

export default AuthForm;
