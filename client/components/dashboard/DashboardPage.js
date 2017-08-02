import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class DashboardPage extends Component {
  render() {
    return(
      <div>
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main page*/ }
          <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
            <div className="col s12 m12 l12">
              <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>My Groups</h5>
              { /*Group cards*/ }
              <a href="/group" className="tooltipped pointer"  data-position="right" data-delay="50" data-tooltip="This is a short group description of a maximum of about 70 chars.">
                <div className="col s12 m6 l4">
                  <div className="card-panel hoverable">Andela Bootcamp <span className="new badge">4</span></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
