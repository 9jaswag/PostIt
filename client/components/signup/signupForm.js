import React, { Component } from 'react';

/**
 * Signup form component
 */
class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
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
    this.props.userSignupRequest(this.state).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Sign up successful. Welcome!'
        })
        // location.href="/dashboard"
      },
      ({response}) => this.setState({ errors: response.data.errors, isLoading: false })
    );
  }
  render() {
    const { errors } = this.state;
    return(
      <form action="" className="col s12" onSubmit={ this.onSubmit }>
        <div className="row">
          <div className="input-field col s6">
            <input id="username" name="username" type="text" className="validate" value={ this.state.username } onChange={ this.onChange } required />
            <label htmlFor="username">Username</label>
            { errors.username && <span className="red-text">{ errors.username }</span>}
          </div>
          <div className="input-field col s6">
            <input id="password" name="password" type="password" className="validate" value={ this.state.password } onChange={ this.onChange } required />
            <label htmlFor="password">Password</label>
            { errors.password && <span className="red-text">{ errors.password }</span>}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="email" name="email" type="email" className="validate" value={ this.state.email } onChange={ this.onChange } required />
            <label htmlFor="email" data-error="Invalid Format">Email</label>
            { errors.email && <span className="red-text">{ errors.email }</span>}
          </div>
          <div className="input-field col s6">
            <input id="phone" name="phone" type="tel" className="validate" value={ this.state.phone } onChange={ this.onChange } required />
            <label htmlFor="phone">Phone Number</label>
            { errors.phone && <span className="red-text">{ errors.phone }</span>}
          </div>
        </div>
        <div className="row right-align">
          <div className="input-field col s12">
            <input type="submit" disabled={ this.state.isLoading } className="btn" value="Sign Up"/>
          </div>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {}
export default SignupForm;
