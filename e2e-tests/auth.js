module.exports = {
  'user can\'t visit an auth-required page without logging in': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/')
      .end();
  },
  'user can\'t sign up without credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signup-modal')
      .setValue('input#username', '')
      .setValue('input#password', '')
      .setValue('input#email', '')
      .setValue('input#phone', '')
      .click('input.btn.signup')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/#signupModal')
      .end();
  },
  'user signs up successfully': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signup-modal')
      .setValue('input#username', 'chioma')
      .setValue('input#password', 'password')
      .setValue('input#email', 'chioma@email.com')
      .setValue('input#phone', '07077123456')
      .click('input.btn.signup')
      .pause(2000)
      .url('http://localhost:9000/dashboard')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
  'user can\'t sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click(
        'a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal'
      )
      .setValue('input#username.signin', 'anthony')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/#signinModal')
      .end();
  },
  'user signs in successfully': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click(
        'a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal'
      )
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .url('http://localhost:9000/dashboard')
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
  'user can log out': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click(
        'a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal')
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .url('http://localhost:9000/dashboard')
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.one-whole.logout')
      .assert.urlEquals('http://localhost:9000/')
      .end();
  }
};
