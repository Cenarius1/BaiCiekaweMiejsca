import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSubmit, onUpdate, login, password, displayName, remember }) => (
  <form >
    <div className="form-group">
      <label htmlFor="emailInput">Email address</label>
      <input type="email"
        className="form-control"
        id="emailInput"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        value={login}
        name="username"
        onChange={(changeEvent) => onUpdate("login", changeEvent)} />
      <small
        id="emailHelp"
        className="form-text text-muted">{"We'll never share your email with anyone else."}</small>
    </div>
    <div className="form-group">
      <label htmlFor="passwordInput">Password</label>
      <input type="password"
        className="form-control"
        id="passwordInput"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(changeEvent) => onUpdate("password", changeEvent)} />
    </div>
    <div className="form-group">
      <label htmlFor="displayNameInput">Display Name</label>
      <input type="text"
        className="form-control"
        id="displayNameInput"
        placeholder="Display Name"
        name="displayName"
        value={displayName}
        onChange={(changeEvent) => onUpdate("displayName", changeEvent)} />
    </div>
    <button className="btn btn-primary" onClick={(event) => onSubmit(event)}>Register</button>
  </form>
);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired
};

export default RegisterForm;
