import React, { Component } from 'react';


/**
 * Function for formatting user's phone number into Nigerian international format
 * @param {number} number phone number to be formatted
 */
const formatPhoneNumber = (number) => `234${number.slice(1)}`;

/**
 * Signup form component
 */
export class SignupForm extends Component {
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

  /**
   * @typedef {object} KeyboardEvent
   */

  /**
   * @return void
   * @param {KeyboardEvent} e 
   */
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @return void
   * @param {KeyboardEvent} e 
   */
  onSubmit(e){
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    // validation checks
    if(this.state.password.length < 6) {
      return this.setState({ errors: { password: 'Password must be 6 characters or more' }, isLoading: false });
    } if (this.state.phone.length !== 11){
      return this.setState({ errors: { phone: 'Phone number must be 11 characters long' }, isLoading: false });
    }
    const { username, email, password, phone } = this.state;
    const userData = { username, email, password, phone: formatPhoneNumber(phone) };
    this.props.userSignupRequest(userData).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Sign up successful. Welcome!'
        })
        Materialize.toast('Sign up successful. Welcome!', 2000);
        location.href="/dashboard"
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