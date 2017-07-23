import React from 'react';

const HomePage = (props) => {
  return (
    <div>
      <div id="signupModal">
        <div className="modal-content">
          <h4>Sign Up</h4>
          <form action="" className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="username" type="text" className="validate" required />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s6">
                <input id="password" type="text" className="validate" required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="email" type="email" className="validate" required />
                <label htmlFor="email" data-error="Invalid Format">Email</label>
              </div>
              <div className="input-field col s6">
                <input id="phone" type="tel" className="validate" required />
                <label htmlFor="phone">Phone Number</label>
              </div>
            </div>
            <div className="row right-align">
              <div className="input-field col s12">
                <input type="submit" className="btn" value="Sign Up"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id="signinModal" className="modal">
        <div className="modal-content">
          <h4>Sign In</h4>
          <form action="" className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="username" type="text" className="validate" required />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="text" className="validate" required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row right-align">
              <div className="input-field col s12">
                <input type="submit" className="btn" value="Sign In"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="full-height fh">
        <div className="row">
          <div className="col s12 m6 l6 teal accent-4 valign-wrapper full-height">
            <div style={{ display: 'block', margin: 'auto' }}>
              <h2 className="center-align text-white">PostIT</h2>
              <h2 className="center-align text-white">Prompt Messages, Prompt Delivery</h2>
            </div>
            <div className="show-on-small hide-on-med-and-up center-align margin-v2">
              <a href="#signupModal" className="waves-effect waves-light btn modal-trigger">Sign Up</a>
              <a href="#signinModal" className="waves-effect waves-light btn modal-trigger">Sign In</a>
            </div>
          </div>
          <div className="col s12 m6 l6 valign-wrapper full-height hide-on-small-only">
            <div className="center-align" style={{ display: 'block', margin: 'auto' }}>
              <a href="#signupModal" className="waves-effect waves-light btn modal-trigger">Sign Up</a>
              <a href="#signinModal" className="waves-effect waves-light btn modal-trigger">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
