import React, { Component } from 'react';
import SigninForm from '../signin/SigninForm';

/**
 * @export
 * @class SigninModal
 * @extends {Component}
 */
export class SigninModal extends Component {
  /**
   * @returns {string} The HTML markup for the SigninModal
   * @memberof SigninModal
   */
  render() {
    return (
      <div>
        {/* Sign In Modal */}
        <div id="signinModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <h5>Sign In</h5>
            </div>
            <SigninForm />
          </div>
        </div>
      </div>
    );
  }
}

export default SigninModal;
