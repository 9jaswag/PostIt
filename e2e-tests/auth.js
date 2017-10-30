module.exports = {
  'user can\'t visit an auth-required page without logging in': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 3000)
      .assert.urlEquals('http://localhost:9000/')
      .end();
  },
  'user can\'t sign up without credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 3000)
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
      .waitForElementVisible('body', 3000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signup-modal')
      .setValue('input#username', 'chioma')
      .setValue('input#password', 'password')
      .setValue('input#email', 'chioma@email.com')
      .setValue('input#phone', '07077123456')
      .click('input.btn.signup')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
  'user can\'t sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 3000)
      .click('.signin-modal')
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
      .waitForElementVisible('body', 3000)
      .click('.signin-modal')
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
  'user can log out': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 3000)
      .pause(2000)
      .click('.signin-modal')
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.one-whole.logout')
      .assert.urlEquals('http://localhost:9000/')
      .end();
  },
  'a second user can sign up': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 3000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signup-modal')
      .setValue('input#username', 'chuks')
      .setValue('input#password', 'password')
      .setValue('input#email', 'chuks@email.com')
      .setValue('input#phone', '07077123444')
      .click('input.btn.signup')
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
};
