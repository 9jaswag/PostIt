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
      errors: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: '' });
  }
  onSubmit(e){
    e.preventDefault();
    if (this.state.username.length === 0) {
      this.setState({ errors: 'Enter a username' });
    }else {
      this.props.searchUserAction(this.state.username.toLowerCase()).then(
        (res) => {
          this.setState({ users: res.data.data });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  render() {
    const { users, currentPage, userPerPage } = this.state;
    const userCards = users.map(user =>
      <div className="col s12"> <div className="card-panel hoverable">@{ user.username }
      <span className="margin-h2">Email: { user.email }</span>
      <span className="margin-h2">Phone: { user.phone }</span> 
      <span className="margin-h2">Number of groups: { user.Groups.length }</span> </div></div>
    )
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
                { (this.state.users.length > 0) ? userCards : null }
                <ul className="pagination center-align">
                  <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                  <li className="active"><a href="#!">1</a></li>
                  <li className="waves-effect"><a href="#!">2</a></li>
                  <li className="waves-effect"><a href="#!">3</a></li>
                  <li className="waves-effect"><a href="#!">4</a></li>
                  <li className="waves-effect"><a href="#!">5</a></li>
                  <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>
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
