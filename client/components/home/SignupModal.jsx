import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import userSignupRequest from '../../actions/signupActions';

const propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

/**
 * @description the signup modal component
 * @export
 * @class SignupModal
 * @extends {Component}
 */
export class SignupModal extends Component {
  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the SignupModal
   * @memberof SignupModal
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        {/* Sign Up Modal */}
        <div id="signupModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <h5>Sign Up</h5>
            </div>
            <SignupForm userSignupRequest={userSignupRequest} />
          </div>
        </div>
      </div>
    );
  }
}

SignupModal.propTypes = propTypes;

export default connect(null, { userSignupRequest })(SignupModal);
