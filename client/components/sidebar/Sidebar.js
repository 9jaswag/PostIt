import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return(
      <div>
        { /* Create Group Modal Structure */}
        <div id="createGroupModal" className="modal">
          <div className="modal-content">
            <h4>Create New Group</h4>
            <form action="" className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="" id="groupname" className="validate" required />
                  <label htmlFor="groupname">Group Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="" id="groupdesc" className="validate" data-length="80" required/>
                  <label htmlFor="groupdesc">Group Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="" id="adduser"/>
                  <label htmlFor="adduser">Add Users</label>
                </div>
              </div>
              <div className="row right-align">
                <div className="input-field col s12">
                  <input className="btn" type="submit" value="Create Group"/>
                </div>
              </div>
            </form>
          </div>
        </div>
        { /*Sidebar*/ }
          <div className="col s12 m3 l2 teal accent-4 full-height padding-top">
            <a href="/dashboard" className="waves-effect waves-light btn margin-v">Dashboard</a>
            <a href="#createGroupModal" className="waves-effect waves-light btn modal-trigger">Create New Group</a>
            <a href="" className="waves-effect waves-light btn margin-v">Logout</a>
          </div>
      </div>
    );
  }
}

export default Sidebar;