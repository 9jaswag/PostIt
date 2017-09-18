import React from 'react';
import CreateGroupForm from './CreateGroupForm';
import Sidebar from '../sidebar/Sidebar';

/**
 * CreateGroupPage component.
 * @returns {string} The HTML markup for the CreateGroupPage component
 */
const CreateGroupPage = () => <div className="row">
  { /* Sidebar*/ }
  <Sidebar />
  { /* Main page*/ }
  <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
    <div className="col s12 m12 l12">
      <h5 className="center-align uppercase"
        style={{ marginBottom: '2rem' }}>Create a new group</h5>
      { /* Group cards*/ }
      <CreateGroupForm />
    </div>
  </div>
</div>;

export default CreateGroupPage;
