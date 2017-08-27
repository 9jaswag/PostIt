import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/signinAction';
import createGroup from '../../actions/createGroup';

export class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true })
    this.props.createGroup(this.state).then(
      (res) => {
        location.href="/dashboard"
        Materialize.toast('Group created successfully', 2000);
      },
      ({response}) => this.setState({ errors: response.data.errors , isLoading: false })
    );
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;
    const loggedInUser = this.props.auth.user.userUsername;
    const welcomeChip = <div className="chip">{ `Welcome ${loggedInUser}` }</div>
    return(
      <section className="left-sidebar">
        { /* Create Group Modal Structure */}
        <div id="createGroupModal" className="modal">
          <div className="modal-content">
             <div className="row">
              <div className="col s12">
                <h5>Create New Group</h5>
              </div>
            </div>
            <form action="" className="col s12" onSubmit={ this.onSubmit }>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="name" id="name" className="validate" onChange={ this.onChange } value={ this.state.name } required />
                  <label htmlFor="name">Group Name</label>
                  { errors.group && <span className="red-text">{ errors.group }</span>} 
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" name="description" id="description" className="validate" onChange={ this.onChange } value={ this.state.description } data-length="80" required/>
                  <label htmlFor="description">Group Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input className="btn one-whole" type="submit" value="Create Group"/>
                </div>
              </div>
            </form>
          </div>
        </div>
        { /*Sidebar*/ }
          <div className="col s12 m3 l2 teal accent-4 full-height padding-top">
            { loggedInUser ? welcomeChip : null }
            <a href="/dashboard" className="waves-effect waves-light btn one-whole margin-v">Dashboard</a>
            <a href="#createGroupModal" className="waves-effect waves-light btn one-whole modal-trigger">Create New Group</a>
            <a href="/search" className="waves-effect waves-light btn one-whole margin-v">Search User</a>            
            <a href="#" onClick= { this.logout.bind(this) } className="waves-effect waves-light btn one-whole">Logout</a>
          </div>
      </section>
    );
  }
}

Sidebar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  createGroup: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout, createGroup }) (Sidebar);