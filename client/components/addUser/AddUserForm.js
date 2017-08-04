/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUser } from '../../actions/addUserAction';
import addUser from '../../actions/addUserAction';

class AddUserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      // users: [], for adding multiple users
      username: '',
      fetchedUsers: [],
      userToAdd: [],
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.filterUser = this.filterUser.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState(){
    this.setState({ username: '', fetchedUsers: [], userToAdd: [] });
  }

  filterUser(username, usersArray){
    usersArray.filter( user => {
      if (user.username === username) {
        console.log(`match found: ${username}`)
        this.setState({ userToAdd: [ user.id, user.username ] });
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ error: '' })
    setTimeout(() => {
      this.props.findUser().then(
        (res) => {
          this.setState({ fetchedUsers: res.data.data.user });
          this.filterUser(this.state.username, this.state.fetchedUsers);
          //reset username state after adding user to users array
        },
        (err) => {
          console.log(err)
        }
      );
    }, 3000);
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({ error: '' })
    const userDetails = { userId: this.state.userToAdd[0] }
    this.props.addUser( this.props.groupId, userDetails ).then(
      (res) => {
        location.href='/group'
      },
      (err) => {
        this.setState({ error: err.response.data.error.message });
      }
    );
    this.resetState();
  }

  render() {
    const userChip = <div className="chip">{ this.state.userToAdd[1] }
      <i className="close material-icons" onClick={ this.resetState }>close</i>
    </div>
    return(
      <div>
        { /* Add User Modal Structure */}
        <div id="addUserModal" className="modal">
          <div className="modal-content">
            <h4>Add New User To Group</h4>
            <form action="" className="col s12" onSubmit={ this.onSubmit }>
              <div className="row">
                <div className="input-field col s12">
                  <input id="username" name="username" type="text" className="validate" value={ this.state.username } onChange= { this.onChange} required/>
                  <label htmlFor="username">Enter username</label>
                  { (this.state.userToAdd.length === 2 ) ? userChip : null }
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

AddUserForm.propTypes = {
  findUser: React.PropTypes.func.isRequired,
  addUser: React.PropTypes.func.isRequired
}

export default connect(null, { findUser, addUser }) (AddUserForm);
