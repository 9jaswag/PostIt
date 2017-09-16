import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import SearchForm from './SearchForm';
import RenderUser from './RenderUser';
import searchUserAction from '../../actions/searchUserAction';

const propTypes = {
  searchUserAction: PropTypes.func.isRequired
};

/**
 * @export
 * @class Searchpage
 * @extends {Component}
 */
export class SearchPage extends Component {
  /**
   * Creates an instance of Searchpage.
   * @param {any} props
   * @memberof Searchpage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      users: [],
      errors: '',
      count: 0,
      offset: 0,
      limit: 2
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  /**
   * @param {object} e
   * @returns {void}
   * @memberof Searchpage
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: '' });
  }
  /**
   * Method for searching for users
   * @return {void}
   * @memberof Searchpage
   */
  searchUsers() {
    const payload = {
      searchTerm: this.state.username.toLowerCase(),
      offset: this.state.offset,
      limit: this.state.limit
    };
    console.log(this.state.offset);
    this.props.searchUserAction(payload).then(
      (res) => {
        if (res.data.data.length < 1) {
          return this.setState({ errors: 'No user found' });
        }
        this.setState(
          { users: res.data.data.rows, count: res.data.data.count }
        );
      }
    );
  }

  /**
   * Makes an action call to search for users
   * @param {object} e
   * @returns {void}
   * @memberof Searchpage
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.state.username.length === 0) {
      this.setState({ errors: 'Enter a username' });
    } else {
      this.searchUsers();
    }
  }
  /**
   * Method for handling the pagination of users
   * @method handlePagination
   * @param {object} e
   * @return {void}
   * @memberof Searchpage
   */
  handlePagination(e) {
    this.setState({ offset: Number(e.target.id) });
    this.searchUsers();
  }

  /**
   * @returns {string} The HTML markup for the Searchpage component
   * @memberof Searchpage
   */
  render() {
    const { count, limit, offset, users } = this.state;
    // render users
    const renderUsers = users.map((user, index) => (
      <div className="col s12" key={ index }>
        <RenderUser user={ user }/>
      </div>
    ));
    // render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / limit); i += 1) {
      pageNumbers.push(i);
    }
    const currentPage = Math.floor(offset / limit) + 1;
    const renderPageNumbers = pageNumbers.map(number => (
      <li className={ classnames({ // move to component
        'active teal darken-1': currentPage === number
      })} key={ number } id={ number } onClick={ this.handlePagination } >
        <a href="#" id={ number }>{ number }</a>
      </li>
    ));
    return (
      <div className="row">
        { /* Sidebar*/ }
        <Sidebar />
        { /* Main page*/ }
        <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
          <div className="col s12">
            <div className="container">
              <h5 className="center-align uppercase"
                style={{ marginBottom: '2rem' }}>Search Users
              </h5>
              <div className="row">
                <SearchForm onSubmit={ this.onSubmit }
                  onChange={ this.onChange }
                  state={ this.state }/>
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

SearchPage.propTypes = propTypes;

export default connect(null, { searchUserAction })(SearchPage);
