import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignupModal from './SignupModal.jsx';
import SigninModal from './SigninModal.jsx';

const propTypes = {
  auth: PropTypes.object.isRequired
};

/**
 * @description the Homepage component
 * @export
 * @class HomePage
 * @extends {Component}
 */
export class HomePage extends Component {
  /**
   * @method componentDidMount
   * @description class method for opening the modal when component mounts
   * @return {void}
   * @memberof HomePage
   */
  componentDidMount() {
    $('.modal').modal();
  }
  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the HomePage
   * @memberof HomePage
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <div>
        <Link to="/dashboard"
          className="waves-effect waves-light btn modal-trigger dashboard">
          Dashboard</Link>
      </div>
    );
    const guestLinks = (
      <div>
        <Link to="#signupModal"
          className="waves-effect waves-light btn modal-trigger signup-modal">
          Sign Up</Link>
        <Link to="#signinModal" className="waves-effect waves-light btn modal-trigger margin-h signin-modal">Sign In</Link>
      </div>
    );

    return (
      <div>
        {/* Sign Up Modal */}
        <SignupModal/>
        {/* Sign In Modal */}
        <SigninModal/>
        { /* Page Content */}
        <div className="full-height fh home">
          <div className="row">
            <div className="col s12 m6 l6 teal accent-4 valign-wrapper full-height home">
              <div className="centralize">
                <h2 className="center-align text-white">PostIT</h2>
                <h5 className="center-align text-white">
                  Prompt Messages, Prompt Delivery</h5>
                { /* Modal Buttons for mobile only*/ }
                <div className="show-on-small hide-on-med-and-up center-align margin-v2">
                  { isAuthenticated ? userLinks : guestLinks }
                </div>
              </div>
            </div>
            <div className="col s12 m6 l6 valign-wrapper full-height hide-on-small-only">
              <div className="center-align centralize">
                { isAuthenticated ? userLinks : guestLinks }
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
