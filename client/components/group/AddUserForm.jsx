/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import addUser, { findUser } from '../../actions/addUserAction';
import removeUser from '../../actions/removeUserAction';
import { getMemberCount } from '../../actions/getGroups';

const propTypes = {
  findUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

/**
 * @export
 * @class AddUserForm
 * @extends {Component}
 */
export class AddUserForm extends Component {
  /**
   * Creates an instance of AddUserForm.
   * @param {any} props
   * @memberof AddUserForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fetchedUsers: [],
      userToAdd: {},
      error: '',
      userExists: false
    };
    this.onChange = this.onChange.bind(this);
    this.filterUser = this.filterUser.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isGroupMember = this.isGroupMember.bind(this);
  }

  /**
   * Resets the state of the component
   * @method resetState
   * @return {void}
   * @memberof AddUserForm
   */
  resetState() {
    this.setState({ username: '', fetchedUsers: [], userToAdd: {} });
  }

  /**
   * isGroupMember method - checks if the user belongs to a group
   * @param {Array} userGroups - an array of groups the user belongs to
   * @return {bool} - returns a boolean
   */
  isGroupMember(userGroups) {
    let isMember = false;
    if (userGroups) {
      userGroups.forEach((group) => {
        if (group.id === parseInt(this.props.groupId, 10)) {
          isMember = true;
        }
      });
      return isMember;
    }
  }

  /**
   * Filters the provided username from an array of users
   * @method filterUser
   * @param {string} username the username to be filtered
   * @param {Array} usersArray the array of all users
   * @returns {void}
   * @memberof AddUserForm
   */
  filterUser(username, usersArray) {
    usersArray.forEach((user) => {
      if ((user.username === username)) {
        const isMember = this.isGroupMember(user.Groups);
        this.setState({
          userToAdd: {
            userId: user.id,
            username: user.username,
            groups: user.Groups,
            isMember
          },
          error: ''
        });
      }
      // else {
      //   this.setState({ error: 'User not found' });
      // }
    });
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberof AddUserForm
   */
  onChange(event) {
    this.setState({ error: '', userToAdd: {} });
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.username.length > 0) {
      this.props.findUser().then(
        (res) => {
          this.setState({ fetchedUsers: res.data.data.user });
          this.filterUser(
            this.state.username.toLowerCase(),
            this.state.fetchedUsers
          );
        }
      );
    }
  }

  /**
   * Makes an action call to add a user to a group
   * @returns {void}
   * @memberof AddUserForm
   */
  onClick() {
    this.setState({ error: '' });
    if (this.state.userToAdd.userId && !this.state.userToAdd.isMember) {
      const groupId = this.props.groupId;
      const userToAdd = this.state.userToAdd;
      this.props.addUser(groupId, userToAdd).then(
        () => {
          this.props.history.push('/group');
          Materialize.toast(
            `${userToAdd.username} has been added to the group`, 2000);
          this.props.getMemberCount(groupId);
        }
      );
    } else if (this.state.userToAdd.userId && this.state.userToAdd.isMember) {
      if (this.props.groupOwner === this.props.currentUser) {
        const groupId = this.props.groupId;
        const userToAdd = this.state.userToAdd;
        this.props.removeUser(groupId, userToAdd).then( // send group owner
          () => {
            this.props.history.push('/group');
            Materialize.toast(
              `${userToAdd.username} has been removed from the group`, 2000);
            this.props.getMemberCount(groupId);
          }
        );
      } else {
        this.props.history.push('/group');
        Materialize.toast(
          'Only group owner can remove users from group', 2000);
      }
    }
    this.resetState();
  }
  /**
   * Prevents form action if enter is pressed
   * @param {object} event
   * @returns {void}
   * @memberof AddUserForm
   */
  onSubmit(event) {
    event.preventDefault();
  }

  /**
   * @returns {string} The HTML markup for the AddUserForm
   * @memberof AddUserForm
   */
  render() {
    const userChip = <div className={ classnames('chip pointer', {
      'bkg-green text-white': this.state.userToAdd.isMember === true,
    }) } data-id={ this.state.userToAdd.userId }
    onClick={ this.onClick }>{ this.state.userToAdd.username }
    </div>;
    const removePrompt = <p>Already a member. Click to remove from group</p>;
    const addPrompt = <p>Click to add to group</p>;
    const showPrompt = this.state.userToAdd.isMember ? removePrompt : addPrompt;
    return (
      <div>
        <div className="row form">
          <div className="col s12">
            <h5 className="center-align form">Add New User To Group</h5>
          </div>
        </div>
        <form action="" className="col s12" onSubmit={ this.onSubmit }>
          <div className="row">
            <div className="input-field col s12">
              <input id="username" name="username"
                type="text" className="validate"
                value={ this.state.username }
                onChange= { this.onChange} required/>
              <label htmlFor="username">Enter username</label>
              { (this.state.userToAdd.userId) ? userChip : null }
              { (this.state.userToAdd.userId) ? showPrompt : null }
              { this.state.error ? <span
                className="red-text">{ this.state.error }</span> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddUserForm.propTypes = propTypes;

const mapStateToProps = state => ({
  groupOwner: state.groupDetails.details[2],
  currentUser: state.auth.user.userUsername,
  groupId: state.groupDetails.details[0]
});

export default connect(
  mapStateToProps,
  { findUser, addUser, removeUser, getMemberCount })(withRouter(AddUserForm));
