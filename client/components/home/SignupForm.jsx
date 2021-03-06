import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

/**
 * @function formatPhoneNumber
 * @description Function for formatting user's phone number
 * into Nigerian international format
 * @param {number} number phone number to be formatted
 * @return {number} returns an international formatted phone number
 */
const formatPhoneNumber = number => `234${number.slice(1)}`;

/**
 * @description the signup form component
 * @export
 * @class SignupForm
 * @extends {Component}
 */
export class SignupForm extends Component {
  /**
   * @description constructor that creates an instance of SignupForm.
   * @param {any} props
   * @memberof SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @method componentWillReceiveProps
   * @description class method to check if signup was successful
   * @param {object} nextProps new props coming into the component
   * @return {void}
   * @memberof SignupForm
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated && nextProps.user.action === 'signup') {
      $('#signupModal').modal('close');
      Materialize.toast('Sign up successful. Welcome!', 2000);
      this.props.history.push('/dashboard');
    }
    if (nextProps.user.errors) {
      this.setState({ errors: nextProps.user.errors, isLoading: false });
    }
  }

  /**
   * @typedef {object} KeyboardEvent
   */

  /**
   * @method onChange
   * @description class method that sets user input to store
   * @return {void}
   * @param {KeyboardEvent} event
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   * @description class method that makes an action call to sign up a user
   * @return {void}
   * @param {KeyboardEvent} event
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if (this.state.password.length < 6) {
      return this.setState({
        errors: {
          password: 'Password must be 6 characters or more' },
        isLoading: false });
    } if (this.state.phone.length !== 11) {
      return this.setState({
        errors: { phone: 'Phone number must be 11 characters long' },
        isLoading: false });
    }
    const { username, email, password, phone } = this.state;
    const userData = {
      username, email, password, phone: formatPhoneNumber(phone) };
    this.props.userSignupRequest(userData);
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the SignupForm component
   * @memberof SignupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <form action="" className="col s12" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="username"
              name="username"
              type="text"
              className="validate"
              value={this.state.username}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="username">Username</label>
            { errors.username && <span className="error">
              { errors.username }</span>}
          </div>
          <div className="input-field col s6">
            <input
              id="phone"
              name="phone"
              type="tel"
              className="validate"
              value={this.state.phone}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="phone">Phone Number</label>
            { errors.phone && <span className="error">
              { errors.phone }</span>}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="email"
              name="email"
              type="email"
              className="validate"
              value={this.state.email}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="email" data-error="Invalid Format">Email</label>
            { errors.email && <span className="error">
              { errors.email }</span>}
          </div>
          <div className="input-field col s6">
            <input
              id="password"
              name="password"
              type="password"
              className="validate"
              value={this.state.password}
              onChange={this.onChange}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
            { errors.password && <span className="error">
              { errors.password }</span>}
          </div>
        </div>
        <div className="row right-align">
          <div className="input-field col s12">
            <input
              type="submit"
              disabled={this.state.isLoading}
              className="btn signup"
              value="Sign Up"
            />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

SignupForm.propTypes = propTypes;

export default connect(mapStateToProps)(withRouter(SignupForm));
