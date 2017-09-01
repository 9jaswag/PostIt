import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../signup/SignupForm';
import userSignupRequest from '../../actions/signupActions';

export class SignupModal extends Component {
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
            <SignupForm userSignupRequest= { userSignupRequest } />
          </div>
        </div>
      </div>
    );
  }
}

SignupModal.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect(null, { userSignupRequest }) (SignupModal);