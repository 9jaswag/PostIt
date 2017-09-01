import React, { Component } from 'react';
import CreateGroupForm from '../group/CreateGroupForm';

export class CreateGroupModal extends Component {
  render(){
    return(
      <div>
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
      </div>
    );
  }
}

export default CreateGroupModal;