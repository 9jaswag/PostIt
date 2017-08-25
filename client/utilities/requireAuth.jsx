/**
 * Component to protect auth required pages
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default (ComposedComponent) => {
  class Authenticate extends Component{

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Login to use app'
        });
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
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { addFlashMessage }) (Authenticate);
}