import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit, onUpdate, login, password, remember }) => (
  <form >
    <div className="form-group">
      <label>Email address</label>
      <input type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        value={login}
        name="login"
        onChange={(changeEvent) => onUpdate("login", changeEvent)} />
      <small
        id="emailHelp"
        className="form-text text-muted">{"We'll never share your email with anyone else."}</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        value={password}
        onChange={(changeEvent) => onUpdate("password", changeEvent)} />
    </div>
    <div className="form-group form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
        checked={remember}
        onChange={(changeEvent) => onUpdate("remember", changeEvent)} />
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button className="btn btn-primary" onClick={(event) => onSubmit(event)}>Submit</button>
  </form>
);

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool.isRequired
};

export default AuthForm;
