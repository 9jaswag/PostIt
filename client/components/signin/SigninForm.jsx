import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../actions/signinAction';

export class SigninForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true })
    this.props.Login(this.state).then(
      (res) => {
        Materialize.toast('Sign in successful', 2000);
        location.href="/dashboard"
      },
      ({response}) => this.setState({ errors: { message: 'Incorrect Username/Password' }, isLoading: false })
    );
  }

  render() {
    const { errors, username, password, isLoading } = this.state;
    return(
      <form action="" className="col s12" onSubmit= { this.onSubmit }>
        <div className="row center-align">   
          { errors.message && <span className="red-text">{ errors.message }</span>}       
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="username" name="username" type="text" className="validate" value={ this.state.username } onChange={ this.onChange } required />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" name="password" type="password" className="validate" value={ this.state.password } onChange={ this.onChange } required />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row right-align">
          <div className="input-field col s12">
            <input type="submit" className="btn" disabled= { isLoading } value="Sign In"/>
          </div>
        </div>
        <div className="row">
          <a href="/resetpassword">Forgot Password</a>
        </div>
      </form>
    );
  }
}

SigninForm.propTypes = {
  Login: React.PropTypes.func.isRequired
}

export default connect(null, { Login }) (SigninForm);
