import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ login, password, displayName, isBusy, formUpdate, handleSubmit }) => {
  return (<form>
    <div className="form-group">
      <label htmlFor="emailInput">Email address</label>
      <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" value={login} name="username" onChange={changeEvent => formUpdate("login", changeEvent)} disabled={isBusy} />
      <small id="emailHelp" className="form-text text-muted">{"We'll never share your email with anyone else."}</small>
    </div>
    <div className="form-group">
      <label htmlFor="passwordInput">Password</label>
      <input type="password" className="form-control" id="passwordInput" placeholder="Password" name="password" value={password} onChange={changeEvent => formUpdate("password", changeEvent)} disabled={isBusy} />
    </div>
    <div className="form-group">
      <label htmlFor="displayNameInput">Display Name</label>
      <input type="text" className="form-control" id="displayNameInput" placeholder="Display Name" name="displayName" value={displayName} onChange={changeEvent => formUpdate("displayName", changeEvent)} disabled={isBusy} />
    </div>
    <button className="btn btn-primary" onClick={event => handleSubmit(event)} disabled={isBusy}>
      {isBusy && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}

      {isBusy && "Registering..."}
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
