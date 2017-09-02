import React, { Component } from 'react';
import CreateGroupForm from '../group/CreateGroupForm';

/**
 * CreateGroupModal component.
 * @returns {string} The HTML markup for the CreateGroupModal component
 */
const CreateGroupModal = () => <div>
  { /* Create Group Modal Structure */}
  <div id="createGroupModal" className="modal">
    <div className="modal-content">
      <div className="row">
        <div className="col s12">
          <h5>Create New Group</h5>
        </div>
      </div>
      <CreateGroupForm />
    </div>
  </div>
</div>;

export default CreateGroupModal;
