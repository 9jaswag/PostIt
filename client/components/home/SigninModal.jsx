import React, { Component } from 'react';
import SigninForm from './SigninForm.jsx';

/**
 * @function SigninModal
 * @description the SigninModal component.
 * @returns {string} The HTML markup for the SigninModal component
 */
const SigninModal = () => <div>
  {/* Sign In Modal */}
  <div id="signinModal" className="modal">
    <div className="modal-content">
      <div className="row">
        <h5>Sign In</h5>
      </div>
      <SigninForm />
    </div>
  </div>
</div>;

export default SigninModal;
