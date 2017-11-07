import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { addUser,
  findUser,
  removeUser } from '../../actions/groupActions';

const propTypes = {
  findUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  foundUser: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  groupOwner: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  removeUser: PropTypes.func.isRequired,
  groupMemberCount: PropTypes.number.isRequired
};

/**
 * @description the Add User Form component
 * @export
 * @class AddUserForm
 * @extends {Component}
 */
export class AddUserForm extends Component {
  /**
   * @description constructor that creates an instance of AddUserForm.
   * @param {any} props
   * @memberof AddUserForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userToAdd: {},
      error: '',
      userExists: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isGroupMember = this.isGroupMember.bind(this);
  }

  /**
   * @method onChange
   * @description class method that handles user input in the add user form
   * @param {object} event
   * @returns {void}
   * @memberof AddUserForm
   */
  onChange(event) {
    this.setState({ error: '', userToAdd: {} });
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value.length > 0) {
      this.props.findUser(event.target.value.toLowerCase()).then(() => {
        if (this.props.foundUser.user) {
          const user = this.props.foundUser.user;
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
        } else {
          this.setState({ error: 'User not found' });
        }
      });
    }
  }

  /**
   * @method onClick
   * @description a class method that makes an action call 
   * to add or remove a user from a group on click of the username chip
   * @returns {void}
   * @memberof AddUserForm
   */
  onClick() {
    this.setState({ error: '' });
    // if user is not a group member then add the user
    if (this.state.userToAdd.userId && !this.state.userToAdd.isMember) {
      const groupId = this.props.groupId;
      const userToAdd = this.state.userToAdd;
      swal({
        title: `Do you want to add ${userToAdd.username} to the group?`,
        text: `${userToAdd.username} will be able to read group messages
        and will receive notifications of new messages`,
        icon: 'info',
        button: 'Yes Please!'
      }).then((willDelete) => {
        if (willDelete) {
          this.props.addUser(
            groupId, userToAdd, this.props.groupMemberCount
          ).then(
            () => {
              this.props.history.push('/group');
              Materialize.toast(
                `${userToAdd.username} has been added to the group`, 2000);
            }
          );
        } else {
          swal(`${userToAdd.username} was not added to the group`);
        }
      });
    } else if (this.state.userToAdd.userId && this.state.userToAdd.isMember) {
      if (this.props.groupOwner === this.props.currentUser) {
        const groupId = this.props.groupId;
        const userToAdd = this.state.userToAdd;
        swal({
          title: `Do you want to remove ${userToAdd.username} from the group?`,
          text: 'This action can not be undone',
          icon: 'warning',
          button: 'Yes Please!',
          dangerMode: true
        }).then((willDelete) => {
          if (willDelete) {
            this.props.removeUser(
              groupId, userToAdd, this.props.groupMemberCount
            ).then(
              () => {
                this.props.history.push('/group');
                Materialize.toast(
                  `${userToAdd.username} has been removed from the group`,
                  2000);
              }
            );
          } else {
            swal(`${userToAdd.username} was not removed from the group`);
          }
        });
      } else {
        this.props.history.push('/group');
        Materialize.toast('Only group owner can remove users from group', 2000);
      }
    }
    // reset state
    this.setState({
      username: '',
      fetchedUsers: [],
      userToAdd: {},
      error: '' });
  }

  /**
   * @method onSubmit
   * @description class method that prevents form action if enter is pressed
   * @param {object} event
   * @returns {void}
   * @memberof AddUserForm
   */
  onSubmit(event) {
    event.preventDefault();
  }

  /**
   * @method isGroupMember
   * @description class method that checks if a user belongs to a group
   * @param {Array} userGroups - an array of groups the user belongs to
   * @return {bool} - returns a boolean
   * @memberof AddUserForm
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
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the AddUserForm
   * @memberof AddUserForm
   */
  render() {
    const userChip = (<div
      className={classnames('chip pointer', {
        'bkg-green text-white': this.state.userToAdd.isMember === true,
      })}
      data-id={this.state.userToAdd.userId}
      onClick={this.onClick}
    >{ this.state.userToAdd.username }
    </div>);
    const removePrompt = <p>Already a member. Click to remove from group</p>;
    const addPrompt = <p>Click to add to group</p>;
    const showPrompt = this.state.userToAdd.isMember ? removePrompt : addPrompt;
    return (
      <div>
        <div className="row form">
          <div className="col s12">
            <h5 className="center-align form margin-v-bottom-none">
              Add New User To Group
            </h5>
          </div>
        </div>
        <form action="" className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="username"
                name="username"
                type="text"
                className="validate"
                value={this.state.username}
                onChange={this.onChange}
                required
                autoComplete="off"
              />
              <label htmlFor="username">Enter username</label>
              { (this.state.userToAdd.userId) ? userChip : null }
              { (this.state.userToAdd.userId) ? showPrompt : null }
              { this.state.error ? <span
                className="error"
              >{ this.state.error }</span> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddUserForm.propTypes = propTypes;

const mapStateToProps = state => ({
  groupOwner: state.groupDetails[2],
  currentUser: state.auth.user.username,
  groupId: state.groupDetails[0],
  foundUser: state.foundUser,
  groupMemberCount: state.groupMemberCount
});

export default connect(
  mapStateToProps,
  { findUser, addUser, removeUser })(withRouter(AddUserForm));
