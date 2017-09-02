/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUser, { findUser } from '../../actions/addUserAction';

const propTypes = {
  findUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

export class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // users: [], for adding multiple users
      username: '',
      fetchedUsers: [],
      userToAdd: {},
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.filterUser = this.filterUser.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({ username: '', fetchedUsers: [], userToAdd: {} });
  }

  filterUser(username, usersArray) {
    usersArray.filter((user) => {
      if ((user.username === username)) {
        // return this.setState({ error: 'That user does not exist'} );
        this.setState({ userToAdd: { userId: user.id, username: user.username } });
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ error: '', userToAdd: {} });
    if (this.state.username.length > 0) {
      this.props.findUser().then(
        (res) => {
          this.setState({ fetchedUsers: res.data.data.user });
          this.filterUser(this.state.username.toLowerCase(), this.state.fetchedUsers);
          // reset username state after adding user to users array
        },
        (err) => {}
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ error: '' });
    // const userDetails = { userId: this.state.userToAdd[0] }
    if (this.state.userToAdd.userId) {
      this.props.addUser(this.props.groupId, this.state.userToAdd).then(
        (res) => {
          location.href = '/group';
          Materialize.toast('User added successfully', 2000);
        },
        (err) => {
          this.setState({ error: err.response.data.error.message });
        }
      );
    } else {
      this.setState({ error: 'That user does not exist' });
    }
    this.resetState();
  }

  render() {
    const userChip = <div className="chip">{ this.state.userToAdd.username }
      <i className="close material-icons" onClick={ this.resetState }>close</i>
    </div>;
    return (
      <div>
        { /* Add User Modal Structure */}
        <div id="addUserModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <h5>Add New User To Group</h5>
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
              <div className="row">
                <div className="input-field col s12">
                  <input className="btn one-whole" type="submit" value="Add User"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddUserForm.propTypes = propTypes;

export default connect(null, { findUser, addUser })(AddUserForm);
