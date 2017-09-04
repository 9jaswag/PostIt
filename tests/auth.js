module.exports = {
  'visiting an auth-required page without logging in': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/');
    browser.end();
  },
  'user sign up without credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signin-modal')
      .setValue('input#username', '')
      .setValue('input#password', '')
      .setValue('input#email', '')
      .setValue('input#phone', '')
      .click('input.btn.signup')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/#signupModal');
    browser.end();
  },
  'user sign up successful': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signin-modal')
      .setValue('input#username', 'chioma')
      .setValue('input#password', 'password')
      .setValue('input#email', 'chioma@email.com')
      .setValue('input#phone', '07077123456')
      .click('input.btn.signup')
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.dashboard')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard');
    browser.end();
  },
  'user sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.margin-h.signup-modal')
      .setValue('input#username', 'anthony')
      .setValue('input#password', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/#signinModal');
    browser.end();
  },
  'user sign in successful': (browser) => {
    before: (browser) => {
      browser
        .click('a.waves-effect.waves-light.btn.modal-trigger.dashboard')
        .pause(2000)
        .click('a.waves-effect.waves-light.btn.one-whole.logout');
    };
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.margin-h.signup-modal')
      .setValue('input#username', 'chioma')
      .setValue('input#password', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.dashboard')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard');
    browser.end();
  }
};
