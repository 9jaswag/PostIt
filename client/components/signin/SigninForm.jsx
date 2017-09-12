/* global $ */
/* global Materialize */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Login from '../../actions/signinAction';

const propTypes = {
  Login: PropTypes.func.isRequired
};

/**
 * @export
 * @class SigninForm
 * @extends {Component}
 */
export class SigninForm extends Component {
  /**
   * Creates an instance of SigninForm.
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
  }

  /**
   * @param {object} e
   * @returns {void}
   * @memberof SigninForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Makes an action call to sign in a user
   * @param {object} e
   * @returns {void}
   * @memberof SigninForm
   */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.Login(this.state).then(
      () => {
        $('#signinModal').modal('close');
        Materialize.toast('Sign in successful', 2000);
        this.props.history.push('/dashboard');
      },
      ({response}) => this.setState({ errors: { message: 'Incorrect Username/Password' }, isLoading: false })
      // server error response is not displayed for security reasons
    );
  }

  /**
   * @returns {string} The HTML markup for the SigninForm component
   * @memberof SigninForm
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <form action="" className="col s12" onSubmit= { this.onSubmit }>
        <div className="row center-align">
          { errors.message && <span className="red-text">{ errors.message }</span>}
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="username" name="username" type="text" className="validate signin" value={ this.state.username } onChange={ this.onChange } required />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" name="password" type="password" className="validate signin" value={ this.state.password } onChange={ this.onChange } required />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row right-align">
          <div className="input-field col s12">
            <input type="submit" className="btn signin" disabled= { isLoading } value="Sign In"/>
          </div>
        </div>
        <div className="row">
          <Link to="/resetpassword">Forgot Password</Link>
        </div>
      </form>
    );
  }
}

SigninForm.propTypes = propTypes;

export default connect(null, { Login })(withRouter(SigninForm));
