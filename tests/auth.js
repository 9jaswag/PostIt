module.exports = {
  'visiting an auth-required page without logging in': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/')
      .end();
  },
  'user sign up without credentials': (browser) => {
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
  'user sign up successful': (browser) => {
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
      .click('a.waves-effect.waves-light.btn.modal-trigger.dashboard')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  },
  'user sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal')
      .setValue('input#username.signin', 'anthony')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/#signinModal')
      .end();
  },
  'user sign in successful': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal')
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.dashboard')
      .assert.urlEquals('http://localhost:9000/dashboard')
      .end();
  }
};
