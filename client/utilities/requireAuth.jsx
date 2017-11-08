import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { logout } from '../actions/signinAction';

/**
 * @description the requireAuth class
 * @export
 * @class requireAuth
 * @param {Component} ComposedComponent
 */
export default (ComposedComponent) => {
/**
 * @description the Authenticate component
 * @export
 * @class Authenticate
 * @extends {Component}
 * @memberof requireAuth
 */
  class Authenticate extends Component {
    /**
     * @method isExpired
     * @description class method to check if user's token is has expired
     * @param {string} token user's token
     * @returns {boolean} validity of token
     * @memberof Authenticate
     */
    isExpired(token) {
      const expiryDate = jwt.decode(token).exp;
      return expiryDate < Date.now() / 1000;
    }

    /**
   * @method componentWillMount
   * @description class method to check if the user is authenticated
   * @return {void}
   * @memberof Authenticate
   */
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      if (!this.props.isAuthenticated) {
        Materialize.toast('Login to use app', 2000);
        this.props.logout();
      }
      if (this.props.isAuthenticated && token && this.isExpired(token)) {
        localStorage.removeItem('jwtToken');
        Materialize.toast('Session has expired. Please log in again', 2000);
        this.props.logout();
      }
    }
    /**
   * @method componentWillUpdate
   * @description class method to check if the user is authenticated
   * @param {prop} nextProps
   * @return {void}
   * @memberof Authenticate
   */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }
    /**
   * @method render
   * @description class method that renders the passed component
   * @returns {Component} returns the passed component
   * @memberof Authenticate
   */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps, { logout })(withRouter(Authenticate));
};
