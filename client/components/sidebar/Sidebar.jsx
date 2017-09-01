import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateGroupModal from '../modal/CreateGroupModal';
import { logout } from '../../actions/signinAction';

export class Sidebar extends Component {

  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedInUser = this.props.auth.user.userUsername;
    const welcomeChip = <div className="chip">{ `Welcome ${loggedInUser}` }</div>
    return(
      <section className="left-sidebar">
        { /* Create Group Modal Structure */}
        <CreateGroupModal/>
        { /*Sidebar*/ }
          <div className="col s12 m3 l2 teal accent-4 full-height padding-top">
            { loggedInUser ? welcomeChip : null }
            <a href="/dashboard" className="waves-effect waves-light btn one-whole margin-v">Dashboard</a>
            <a href="#createGroupModal" className="waves-effect waves-light btn one-whole modal-trigger">Create New Group</a>
            <a href="/search" className="waves-effect waves-light btn one-whole margin-v">Search User</a>            
            <a href="#" onClick= { this.logout.bind(this) } className="waves-effect waves-light btn one-whole">Logout</a>
          </div>
      </section>
    );
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout }) (Sidebar);