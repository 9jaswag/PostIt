import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Login from '../../actions/signinAction';

const propTypes = {
  Login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
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
  }

  /**
   * @method componentWillReceiveProps
   * @description class method to check if sign in was successful
   * @param {object} nextProps new props coming into the component
   * @return {void}
   * @memberof SigninForm
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated && nextProps.user.action === 'signin') {
      $('#signinModal').modal('close');
      Materialize.toast('Sign in successful', 2000);
      this.props.history.push('/dashboard');
    }
    if (nextProps.user.errors) {
      this.setState(
        { errors: {
          message: 'Incorrect Username/Password' },
        isLoading: false
        });
    }
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
    this.props.Login(this.state);
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
          >
            Forgot Password
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

SigninForm.propTypes = propTypes;

export default connect(mapStateToProps, { Login })(withRouter(SigninForm));
