import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

/**
 * Search page component
 */
class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }

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
              <form action="" onSubmit={ this.onSubmit }>
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="Enter a username" id="searchTerm" name="searchTerm" type="text" value={ this.state.searchTerm } onChange={ this.onChange } className="validate" style={{ display: 'inline-block', width: '80%', marginRight: '.3rem' }}/>
                    <label htmlFor="searchTerm">Search</label>
                    <a href="" className="btn waves-effect waves-light">Search</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
