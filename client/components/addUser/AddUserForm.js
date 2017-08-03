/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';

class AddUserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      username: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state)
  }

  render() {
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

export default AddUserForm;
