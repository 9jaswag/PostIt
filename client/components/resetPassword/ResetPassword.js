import React, { Component } from 'react';

/**
 * Reset Password component
 */
class ResetPasswoord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: true,
      secondary: false
    }
    console.log(this.props);
    console.log(this.props.location.search);
  }

  // componentWillMount(){
  //   if(this.props.match.params.token){
  //     this.setState({ initial: false, secondary: true });
  //   }else{
  //     this.setState({ initial: true, secondary: false });
  //   }
  // }

  render() {
    const requestResetForm = <div>
      <h4 className="center-align">Forgot password?</h4>
      <section className="padding2 teal accent-4" style={{ marginTop: '3rem' }}>
        <form action="">
          <div className="input-field col s12">
            <label htmlFor="email" style={{ color: "white" }}>Enter your email address</label>
            <input type="email" name="" id="email" className="validate"/>
            <input type="submit" value="Reset password" className="btn waves-effect waves-light one-whole"/>
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
        </div>
      </div>
    );
  }
}


export default ResetPasswoord;