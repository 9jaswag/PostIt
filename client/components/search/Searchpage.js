import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

/**
 * Search page component
 */
class SearchPage extends Component {
  render() {
    return(
      <div className="row">
        { /*Sidebar*/ }
        <Sidebar />
        { /*Main page*/ }
        <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
          <div className="col s12 m12 l12">
            <div className="container">
              <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>Search Users</h5>
              <div className="row">
                <div className="input-field col s12">
                  <input placeholder="Enter a username" id="username" name="username" type="text" className="validate" style={{ display: 'inline-block', width: '80%', marginRight: '.3rem' }}/>
                  <label htmlFor="username">Search</label>
                  <a href="" className="btn waves-effect waves-light">Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
