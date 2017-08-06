import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { connect } from 'react-redux';
import searchUserAction from '../../actions/searchUserAction';

/**
 * Search page component
 */
class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      users: [],
      errors: '',
      currentPage: 1,
      usersPerPage: 3
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: '', users: [] });
  }
  onSubmit(e){
    e.preventDefault();
    if (this.state.username.length === 0) {
      this.setState({ errors: 'Enter a username' });
    }else {
      this.props.searchUserAction(this.state.username.toLowerCase()).then(
        (res) => {
          console.log(res.data.data);
          this.setState({ users: res.data.data });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  handlePagination(e){
    this.setState({ currentPage: Number(e.target.id) })
  }

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    // pagination logic
    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;
    const currentUsers = users.slice(firstUserIndex, lastUserIndex);
    // render users
    const renderUsers = currentUsers.map((user, index) => {
      return(
        <div className="col s12" key={ index }>
          <div className="card-panel hoverable">
            { user.username }
          </div>
        </div>
      );
    });
    // render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={ number } onClick={ this.handlePagination }>
          <a href="#!" id={ number }>{ number }</a>
        </li>
      );
    });
    return(
      <div className="row">
        { /*Sidebar*/ }
        <Sidebar />
        { /*Main page*/ }
        <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
          <div className="col s12">
            <div className="container">
              <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>Search Users</h5>
              <div className="row">
                <form action="" onSubmit={ this.onSubmit }>
                  <div className="row">
                    <div className="input-field col s12">
                      <input placeholder="Enter a username and press enter" id="username" name="username" type="text" value={ this.state.username } onChange={ this.onChange } className="validate" style={{ display: 'inline-block', width: '80%', marginRight: '.3rem' }}/>
                      <label htmlFor="username">Search</label>
                    </div>
                    <div className="col l12">{ this.state.errors && <span className="red-text">{ this.state.errors }</span>}</div>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="col s12">
                  { renderUsers }
                </div>
                <div className="col s12">
                  <ul className="pagination center-align">
                    { renderPageNumbers }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchUserAction: React.PropTypes.func.isRequired
}

export default connect(null, { searchUserAction }) (SearchPage);
