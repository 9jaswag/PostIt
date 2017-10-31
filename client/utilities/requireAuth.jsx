/* global location */

/**
 * Component to protect auth required pages
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { logout } from '../actions/signinAction';

/**
 * @export
 * @class requireAuth
 * @param {Component} ComposedComponent
 */
export default (ComposedComponent) => {
  /**
 * @export
 * @class Authenticate
 * @extends {Component}
 * @memberof requireAuth
 */
  class Authenticate extends Component {
    /**
     * Method to check if a token is has expired
     * @param {string} token user's token
     * @returns {boolean} validity of token
     */
    isExpired(token) {
      const expiryDate = jwt.decode(token).exp;
      return expiryDate < Date.now() / 1000;
    }

    /**
   * Checks if the user is authenticated
   * @method componentWillMount
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
   * Checks if the user is authenticated
   * @method componentWillUpdate
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
   * @returns {Component} returns the passed component
   * @memberof Authenticate
   */
    render() {
      return (
        <ComposedComponent { ...this.props } />
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
