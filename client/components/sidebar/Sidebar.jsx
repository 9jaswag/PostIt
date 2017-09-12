import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateGroupModal from '../modal/CreateGroupModal';
import { logout } from '../../actions/signinAction';

const propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

/**
 * @export
 * @class Sidebar
 * @extends {Component}
 */
export class Sidebar extends Component {
  /**
   * Method for logging out a user
   * @method logout
   * @param {object} e 
   * @return {void}
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  /**
   * @returns {string} The HTML markup for the Sidebar component
   * @memberof Sidebar
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedInUser = this.props.auth.user.userUsername;
    const welcomeChip = <div className="chip">{ `Welcome ${loggedInUser}` }</div>;
    return (
      <section className="left-sidebar">
        { /* Create Group Modal Structure */}
        <CreateGroupModal/>
        { /* Sidebar*/ }
        <div className="col s12 m3 l2 teal accent-4 full-height padding-top">
          { loggedInUser ? welcomeChip : null }
          <Link to="/dashboard" className="waves-effect waves-light btn one-whole margin-v dashboard">Dashboard</Link>
          <a to="#createGroupModal" className="waves-effect waves-light btn one-whole modal-trigger create-group">Create New Group</a>
          <Link to="/search" className="waves-effect waves-light btn one-whole margin-v search">Search User</Link>
          <Link to="#" onClick= { this.logout.bind(this) } className="waves-effect waves-light btn one-whole logout">Logout</Link>
        </div>
      </section>
    );
  }
}

Sidebar.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);
