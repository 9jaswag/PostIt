import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Sidebar from '../dashboard/Sidebar.jsx';
import SearchForm from './SearchForm.jsx';
import RenderUser from './RenderUser.jsx';
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
   * @param {object} event
   * @returns {void}
   * @memberof Searchpage
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errors: '' });
  }
  /**
   * Method for searching for users
   * @return {void}
   * @memberof Searchpage
   */
  searchUsers() {
    const payload = {
      username: this.state.username.toLowerCase(),
      offset: this.state.offset,
      limit: this.state.limit
    };
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
   * @param {object} event
   * @returns {void}
   * @memberof Searchpage
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.username.length === 0) {
      this.setState({ errors: 'Enter a username' });
    } else {
      this.searchUsers();
    }
  }
  /**
   * Method for handling the pagination of users
   * @method handlePagination
   * @param {Number} page the selected page number
   * @return {void}
   * @memberof Searchpage
   */
  handlePagination(page) {
    const selected = page.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset }, () => {
      this.searchUsers();
    });
  }

  /**
   * @returns {string} The HTML markup for the Searchpage component
   * @memberof Searchpage
   */
  render() {
    const { count, limit, users } = this.state;
    // render users
    const renderUsers = users.map((user, index) => (
      <div className="col s12" key={ index }>
        <RenderUser user={ user }/>
      </div>
    ));
    // get page numbers
    const pageCount = count / limit;
    // remder page numbers
    const renderPageNumbers = <ReactPaginate
      previousLabel={<i className="material-icons pointer">chevron_left</i>}
      nextLabel={<i className="material-icons pointer">chevron_right</i>}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePagination}
      containerClassName={'pagination pointer'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'} />;
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
                    { users.length > 0 && renderPageNumbers }
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
