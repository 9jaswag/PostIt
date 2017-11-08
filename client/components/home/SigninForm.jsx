import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Login from '../../actions/signinAction';

const propTypes = {
  Login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

/**
 * @description Signin Form component
 * @export
 * @class SigninForm
 * @extends {Component}
 */
export class SigninForm extends Component {
  /**
   * @description constructor that creates an instance of SigninForm.
   * @param {any} props
   * @memberof SigninForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeBackdrop = this.removeBackdrop.bind(this);
  }

  /**
   * @method onChange
   * @description class method that sets user input to store
   * @param {object} event
   * @returns {void}
   * @memberof SigninForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   * @description class method that makes an action call to sign in a user
   * @param {object} event
   * @returns {void}
   * @memberof SigninForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.Login(this.state).then(
      () => {
        $('#signinModal').modal('close');
        Materialize.toast('Sign in successful', 2000);
        this.props.history.push('/dashboard');
      },
      () => this.setState(
        { errors: {
          message: 'Incorrect Username/Password' },
        isLoading: false
        })
    );
  }

  /**
   * @method removeBackdrop
   * @description class method that removes the modal backdrop
   * which remains after modal closes
   * @return {void}
   * @memberof SigninForm
   */
  removeBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop.fade.in');
    backdrop.hidden = true;
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the SigninForm component
   * @memberof SigninForm
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <form action="" className="col s12" onSubmit={this.onSubmit}>
        <div className="row center-align">
          { errors.message && <span className="error">
            { errors.message }</span>}
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username"
              name="username"
              type="text"
              className="validate signin"
              value={this.state.username}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              name="password"
              type="password"
              className="validate signin"
              value={this.state.password}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row right-align">
          <div className="input-field col s12">
            <input
              type="submit"
              className="btn signin"
              disabled={isLoading}
              value="Sign In"
            />
          </div>
        </div>
        <div className="row">
          <Link
            to="/resetpassword"
            onClick={this.removeBackdrop}
          >
            Forgot Password
          </Link>
        </div>
      </form>
    );
  }
}

SigninForm.propTypes = propTypes;

export default connect(null, { Login })(withRouter(SigninForm));
