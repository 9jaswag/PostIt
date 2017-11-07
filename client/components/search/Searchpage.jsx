import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Sidebar from '../dashboard/Sidebar';
import SearchForm from './SearchForm';
import RenderUser from './RenderUser';
import { searchUserAction } from '../../actions/groupActions';

const propTypes = {
  searchUserAction: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired
};

/**
 * @description the SearchPage component
 * @export
 * @class Searchpage
 * @extends {Component}
 */
export class SearchPage extends Component {
  /**
   * @description constructor that creates an instance of Searchpage.
   * @param {any} props
   * @memberof Searchpage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      users: [],
      error: '',
      offset: 0,
      limit: 2,
      pagination: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  /**
   * @method onChange
   * @description class method for setting user's input to state
   * and call the search action
   * @param {object} event
   * @returns {void}
   * @memberof Searchpage
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value,
      errors: '' }, () => {
      this.searchUsers();
    });
  }

  /**
   * @method onSubmit
   * @description class method that prevents form action on
   * form submit
   * @param {object} event
   * @returns {void}
   * @memberof Searchpage
   */
  onSubmit(event) {
    event.preventDefault();
  }

  /**
   * @method searchUsers
   * @description class method for searching for users
   * @return {void}
   * @memberof Searchpage
   */
  searchUsers() {
    this.setState({ error: '' });
    const payload = {
      username: this.state.username.toLowerCase(),
      offset: this.state.offset,
      limit: this.state.limit
    };
    this.props.searchUserAction(payload).then(() => {
      if (this.props.searchResult.users) {
        this.setState(
          { users: this.props.searchResult.users,
            pagination: this.props.searchResult.pagination,
            error: '' }
        );
      } else {
        this.setState({ error: this.props.searchResult.error, users: [] });
      }
    });
  }

  /**
   * @method handlePagination
   * @description class method for handling the pagination of users
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
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the Searchpage component
   * @memberof Searchpage
   */
  render() {
    const { users, pagination, error } = this.state;
    // render users
    const renderUsers = users.map(user => (
      <RenderUser user={user} key={user.id} />
    ));
    // get page numbers
    const pageCount = pagination.numberOfPages;
    // remder page numbers
    const renderPageNumbers = (<ReactPaginate
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
      activeClassName={'active'}
    />);
    return (
      <div className="row">
        { /* Sidebar*/ }
        <Sidebar />
        { /* Main page*/ }
        <div className="col s12 m9 l10 margin-v-top">
          <div className="col s12">
            <div className="container">
              <h5 className="center-align uppercase margin-v-bottom">
                Search Users
              </h5>
              <div className="row">
                <SearchForm
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  state={this.state}
                />
              </div>
              <div className="row">
                <div className="col s12">
                  { renderUsers }
                  { error && <span className="error">{ error }</span> }
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

const mapStateToProps = state => ({
  searchResult: state.searchUser
});
export default connect(mapStateToProps, { searchUserAction })(SearchPage);
