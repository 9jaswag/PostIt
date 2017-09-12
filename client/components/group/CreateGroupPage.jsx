import React, { Component } from 'react';
import CreateGroupForm from './CreateGroupForm.jsx';
import Sidebar from '../sidebar/Sidebar';

export class CreateGroupPage extends Component {
  render() {
    return (
      // <div className="modal-content">
      //   <div className="row">
      //     <div className="col s12">
      //       <h5>Create New Group</h5>
      //     </div>
      //   </div>
      //   <CreateGroupForm />
      // </div>
      <div className="row">
        { /* Sidebar*/ }
        <Sidebar />
        { /* Main page*/ }
        <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
          <div className="col s12 m12 l12">
            <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>Create a new group</h5>
            { /* Group cards*/ }
            <CreateGroupForm />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroupPage;
