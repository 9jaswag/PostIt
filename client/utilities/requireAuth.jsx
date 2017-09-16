/* global location */

/**
 * Component to protect auth required pages
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
   * Checks if the user is authenticated
   * @method componentWillMount
   * @return {void}
   * @memberof Authenticate
   */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        // Materialize.toast('Login to use app', 2000);
        location.href='/';
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
        location.href='/';
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

  return connect(mapStateToProps, { })(Authenticate);
};
