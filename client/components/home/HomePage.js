import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../signup/signupForm';
import SigninForm from '../signin/signinForm';
import userSignupRequest from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class HomePage extends Component {
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <div>
        <a href="/dashboard" className="waves-effect waves-light btn modal-trigger">Dashboard</a>
      </div>
    );
    const guestLinks = (
      <div>
        <a href="#signupModal" className="waves-effect waves-light btn modal-trigger">Sign Up</a>
        <a href="#signinModal" className="waves-effect waves-light btn modal-trigger margin-h">Sign In</a>
      </div>
    );

    return (
    <div>
      {/* Sign Up Modal */}
      <div id="signupModal" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5>Sign Up</h5>
          </div>
          <SignupForm userSignupRequest= { userSignupRequest } addFlashMessage= { addFlashMessage } />
        </div>
      </div>
      {/* Sign In Modal */}
      <div id="signinModal" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5>Sign In</h5>
          </div>
          <SigninForm />
        </div>
      </div>
      { /* Page Content */}
      <div>
        <div className="full-height fh">
          <div className="row">
            <div className="col s12 m6 l6 teal accent-4 valign-wrapper full-height">
              <div style={{ display: 'block', margin: 'auto' }}>
                <h2 className="center-align text-white">PostIT</h2>
                <h5 className="center-align text-white">Prompt Messages, Prompt Delivery</h5>
                { /* Modal Buttons for mobile only*/ }
                <div className="show-on-small hide-on-med-and-up center-align margin-v2">
                  { isAuthenticated ? userLinks : guestLinks } 
                </div>
              </div> 
            </div>
            <div className="col s12 m6 l6 valign-wrapper full-height hide-on-small-only">
              <div className="center-align" style={{ display: 'block', margin: 'auto' }}>
                { isAuthenticated ? userLinks : guestLinks }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

HomePage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage }) (HomePage);