/**
 * Component for form that adds a new user to a group
 */

import React, { Component } from 'react';

class AddUserForm extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        { /* Add User Modal Structure */}
        <div id="addUserModal" className="modal">
          <div className="modal-content">
            <h4>Add New User To Group</h4>
            <form action="" className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input id="username" type="text" className="validate" required/>
                  <label htmlFor="first_name">Enter username</label>
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
