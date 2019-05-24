import React from 'react';
import PropTypes from 'prop-types';
//import { Form, Button } from 'react-bootstrap';

// const AuthForm = ({ onSubmit, login, password, remember }) => (
//   <Form>
//     <Form.Group controlId="formBasicEmail">
//       <Form.Label>Email address</Form.Label>
//       <Form.Control type="email" placeholder="Enter email" value={login} />
//       <Form.Text className="text-muted">{"We'll never share your email with anyone else."}</Form.Text>
//     </Form.Group>

//     <Form.Group controlId="formBasicPassword">
//       <Form.Label>Password</Form.Label>
//       <Form.Control type="password" placeholder="Password" value={password} />
//     </Form.Group>
//     <Form.Group controlId="formBasicChecbox">
//       <Form.Check type="checkbox" label="Remember me" checked={remember} />
//     </Form.Group>
//     <Button variant="primary" type="submit" onClick={() => onSubmit()}>
//       Submit
//     </Button>
//   </Form>
// );

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
