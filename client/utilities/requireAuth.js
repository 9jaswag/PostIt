import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
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

  function mapStateToProps(state){
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { addFlashMessage }) (Authenticate);
}