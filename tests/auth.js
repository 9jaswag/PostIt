module.exports = {
  'user sign up without credentials': (client) => {
    client
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
    client.end();
  },
  'user sign up successful': (client) => {
    client
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.signin-modal')
      .setValue('input#username', 'chioma')
      .setValue('input#password', 'password')
      .setValue('input#email', 'chioma@email.com')
      .setValue('input#phone', '07077123456')
      .click('input.btn.signup')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard');
    client.end();
  },
  'user sign in successful': (client) => {
    client
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .click('a.waves-effect.waves-light.btn.modal-trigger.margin-h.signup-modal')
      .setValue('input#username', 'chuks')
      .setValue('input#password', 'password')
      .click('input.btn.signin')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000/dashboard');
    client.end();
  }
};
