import React, { Component } from 'react';
import queryString from 'query-string';

/**
 * Reset Password component
 */
class ResetPasswoord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: null,
      secondary: null,
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.submitReset = this.submitReset.bind(this);
  }

  onChange(e) {
    this.setState({ error: '' });
    this.setState({ [e.target.name]: e.target.value });
  }

  submitRequest(e) {
    this.setState({ error: '' });
    e.preventDefault();
    console.log(this.state);
    // sens email and save token and time
  }

  submitReset(e) {
    this.setState({ error: '' });
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword ) {
      return this.setState({ error: 'Passwords do not match' });
    }
    // reset password and delete token
  }

  componentWillMount(){
    if(queryString.parse(location.search).token){
      this.setState({ initial: false, secondary: true });
    }else{
      this.setState({ initial: true, secondary: false });
    }
  }

  render() {
    const requestResetForm = <div>
      <h4 className="center-align">Forgot password?</h4>
      <section className="padding2 teal accent-4" style={{ marginTop: '3rem' }}>
        <form action="" onSubmit={ this.submitRequest }>
          <div className="input-field col s12">
            <label htmlFor="email" style={{ color: "white" }}>Enter your email address</label>
            <input type="email" name="email" id="email" className="validate" value={ this.state.email } onChange={ this.onChange }/>
            <input type="submit" value="Submit" className="btn waves-effect waves-light one-whole"/>
          </div>
          <div className="center-align margin-v">
            { this.state.error && <span className="red-text">{ this.state.error }</span>}
          </div>
        </form>
        <div className="col s12 margin-v">
          <a className="text-white" href="/">I think I remember my password</a>
        </div>
      </section>
    </div>
    const resetPasswordForm = <div>
      <h4 className="center-align">Reset password?</h4>
      <section className="padding2 teal accent-4" style={{ marginTop: '3rem' }}>
        <form action="" onSubmit={ this.submitReset }>
          <div className="input-field col s12">
            <label htmlFor="password" style={{ color: "white" }}>Enter your new password</label>
            <input type="password" name="password" id="password" className="validate" value={ this.state.password } onChange={ this.onChange }/>
          </div>
          <div className="input-field col s12">
            <label htmlFor="confirmPassword" style={{ color: "white" }}>Confirm new password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" className="validate" value={ this.state.confirmPassword } onChange={ this.onChange }/>
          </div>
          <div className="input-field col s12">
            <input type="submit" value="Reset password" className="btn waves-effect waves-light one-whole"/>
          </div>
          <div className="center-align margin-v">
            { this.state.error && <span className="red-text">{ this.state.error }</span>}
          </div>
        </form>
        <div className="col s12 margin-v">
          <a className="text-white" href="/">I think I remember my password</a>
        </div>
      </section>
    </div>
    return(
      <div>
        <div className="container margin-v4">
          { this.state.initial && requestResetForm }
          { this.state.secondary && resetPasswordForm }          
        </div>
      </div>
    );
  }
}


export default ResetPasswoord;