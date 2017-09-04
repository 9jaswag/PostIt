import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupModal from '../modal/SignupModal';
import SigninModal from '../modal/SigninModal';

const propTypes = {
  auth: PropTypes.object.isRequired
};

/**
 * @export
 * @class HomePage
 * @extends {Component}
 */
export class HomePage extends Component {
  /**
   * @returns {string} The HTML markup for the HomePage
   * @memberof HomePage
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <div>
        <a href="/dashboard" className="waves-effect waves-light btn modal-trigger dashboard">Dashboard</a>
      </div>
    );
    const guestLinks = (
      <div>
        <a href="#signupModal" className="waves-effect waves-light btn modal-trigger signin-modal">Sign Up</a>
        <a href="#signinModal" className="waves-effect waves-light btn modal-trigger margin-h signup-modal">Sign In</a>
      </div>
    );

    return (
      <div>
        {/* Sign Up Modal */}
        <SignupModal/>
        {/* Sign In Modal */}
        <SigninModal/>
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

const mapStateToProps = state => ({
  auth: state.auth
});

HomePage.propTypes = propTypes;

export default connect(mapStateToProps, {})(HomePage);
