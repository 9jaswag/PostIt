/* global Materialize */
/* global confirm */

/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        this.setState({ userToAdd: { userId: user.id, username: user.username } });
      }
    });
  }

  /**
   * @param {object} e
   * @returns {void}
   * @memberof AddUserForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ error: '', userToAdd: {} });
    if (this.state.username.length > 0) {
      this.props.findUser().then(
        (res) => {
          this.setState({ fetchedUsers: res.data.data.user });
          this.filterUser(this.state.username.toLowerCase(), this.state.fetchedUsers);
          // reset username state after adding user to users array
        }
      );
    }
  }

  /**
   * Makes an action call to add a user to a group
   * @param {object} e
   * @returns {void}
   * @memberof AddUserForm
   */
  onClick() {
    this.setState({ error: '' });
    if (this.state.userToAdd.userId) {
      const groupId = this.props.groupId;
      const userToAdd = this.state.userToAdd;
      this.props.addUser(groupId, userToAdd).then(
        () => {
          this.props.history.push('/group');
          Materialize.toast(`${userToAdd.username} has been added to the group`, 2000);
          this.props.getMemberCount(groupId);
        },
        (err) => {
          Materialize.toast(`${err.response.data.error.message}`, 1000, '', () => {
            if (confirm(`Do you want to remove ${userToAdd.username} from this group?`) === true) {
              if (this.props.groupOwner === this.props.currentUser) {
                this.props.removeUser(groupId, userToAdd).then( // send group owner
                  () => {
                    this.props.history.push('/group');
                    Materialize.toast(`${userToAdd.username} has been removed from the group`, 2000);
                    this.props.getMemberCount(groupId);
                  }
                );
              } else {
                this.props.history.push('/group');
                Materialize.toast('Only group owner can remove users from group', 2000);
              }
            }
          });
          this.setState({ userExists: true });
        }
      );
    } else {
      this.setState({ error: 'That user does not exist' });
    }
    this.resetState();
  }
  /**
   * Prevents form action if enter is pressed
   * @param {object} e
   * @returns {void}
   * @memberof AddUserForm
   */
  onSubmit(e) {
    e.preventDefault();
  }

  /**
   * @returns {string} The HTML markup for the AddUserForm
   * @memberof AddUserForm
   */
  render() {
    const userChip = <div className="chip pointer" data-id={ this.state.userToAdd.userId } onClick={ this.onClick }>{ this.state.userToAdd.username }
    </div>;
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
              <input id="username" name="username" type="text" className="validate" value={ this.state.username } onChange= { this.onChange} required/>
              <label htmlFor="username">Enter username</label>
              { (this.state.userToAdd.userId) ? userChip : null }
              { this.state.error ? <span className="red-text">{ this.state.error }</span> : null}
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
  currentUser: state.auth.user.userUsername
});

export default connect(mapStateToProps, { findUser, addUser, removeUser, getMemberCount })(withRouter(AddUserForm));
