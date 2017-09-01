/**
 * Component to protect auth required pages
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class Authenticate extends Component{

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        // Materialize.toast('Login to use app', 2000);
        location.href="/";
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        location.href="/"
      }
    }

    render() {
      return(
        <ComposedComponent { ...this.props } />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { }) (Authenticate);
}