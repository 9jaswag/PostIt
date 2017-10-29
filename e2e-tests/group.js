module.exports = {
  beforeEach: (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click('.signin-modal')
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin');
  },
  'logged in user can create group': (browser) => {
    browser
      .url('http://localhost:9000/create-group')
      .waitForElementVisible('body', 3000)
      .setValue('input#name', 'Andela')
      .setValue('input#description', 'An Andelan group')
      .click('input.btn.one-whole')
      .waitForElementVisible('.card-panel.hoverable', 3000)
      .assert.containsText('.card-panel.hoverable', 'Andela')
      .end();
  },
  'logged in user can post message': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('.card-panel.hoverable', 2000)
      .click('.card-panel.hoverable')
      .setValue('input#title', 'Important')
      .setValue('textarea#message', 'Message content')
      .click('input.waves-effect.waves-light.one-whole.btn.margin-v2')
      .waitForElementVisible('.message-card-div', 5000)
      .assert.containsText('.message-card-div', 'Important')
      .end();
  }
};

