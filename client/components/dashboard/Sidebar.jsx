import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../actions/signinAction';

const propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

/**
 * @description the Sidebar component
 * @export
 * @class Sidebar
 * @extends {Component}
 */
export class Sidebar extends Component {
  /**
   * @method logout
   * @description class method for logging out a user
   * @param {object} event
   * @return {void}
   * @memberof Sidebar
   */
  logout(event) {
    event.preventDefault();
    this.props.logout().then(
      () => {
        Materialize.toast('You\'ve logged out successfully', 2000);
        this.props.history.push('/');
      }
    );
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the Sidebar component
   * @memberof Sidebar
   */
  render() {
    const isAuthenticated = this.props.auth;
    const loggedInUser = isAuthenticated.user.username;
    const welcomeChip = <div
      className="chip">{ `Welcome ${loggedInUser}` }</div>;
    return (
      <section className="left-sidebar">
        { /* Sidebar*/ }
        <div className="col s12 m3 l2 teal accent-4 full-height padding-top">
          { loggedInUser ? welcomeChip : null }
          <Link to="/dashboard" className="waves-effect waves-light btn one-whole margin-v dashboard">Dashboard</Link>
          <Link to="create-group"
            className="waves-effect waves-light btn one-whole create-group">
            Create Group
          </Link>
          <Link to="/search"
            className="waves-effect waves-light btn one-whole margin-v search">
            Search User
          </Link>
          <Link to="#"
            onClick= { this.logout.bind(this) }
            className="waves-effect waves-light btn one-whole logout">
            Logout
          </Link>
          <div className="footer col s12">
            <h6 className="text-white">&copy; PostIT 2017</h6>
          </div>
        </div>
      </section>
    );
  }
}

Sidebar.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(withRouter(Sidebar));
