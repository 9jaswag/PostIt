import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../signup/signupForm'
import { userSignupRequest } from '../actions/signupActions';

class HomePage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
    <div>
      {/* Sign Up Modal */}
      <div id="signupModal" className="modal">
        <div className="modal-content">
          <h4>Sign Up</h4>
          <SignupForm userSignupRequest= { userSignupRequest } />
        </div>
      </div>
      {/* Sign In Modal */}
      <div id="signinModal" className="modal">
        <div className="modal-content">
          <h4>Sign In</h4>
          <form action="" className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="username" type="text" className="validate" required />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="text" className="validate" required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row right-align">
              <div className="input-field col s12">
                <input type="submit" className="btn" value="Sign In"/>
              </div>
            </div>
          </form>
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
                  <a href="#signupModal" className="waves-effect waves-light btn modal-trigger">Sign Up</a>
                  <a href="#signinModal" className="waves-effect waves-light btn modal-trigger margin-h">Sign In</a>
                </div>
              </div> 
            </div>
            <div className="col s12 m6 l6 valign-wrapper full-height hide-on-small-only">
              <div className="center-align" style={{ display: 'block', margin: 'auto' }}>
                <a className="waves-effect waves-light btn modal-trigger" href="#signupModal">Sign Up</a>
                <a className="waves-effect waves-light btn modal-trigger margin-h" href="#signinModal">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

HomePage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect((state) => { return {} }, { userSignupRequest }) (HomePage);