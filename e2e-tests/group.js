module.exports = {
  beforeEach: (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .pause(2000)
      .click(
        'a.waves-effect.waves-light.btn.modal-trigger.margin-h.signin-modal'
      )
      .setValue('input#username.signin', 'chioma')
      .setValue('input#password.signin', 'password')
      .click('input.btn.signin');
  },
  'logged in user can create group': (browser) => {
    browser
      .url('http://localhost:9000/create-group')
      .waitForElementVisible('body', 5000)
      .pause(20000)
      // .execute(() => {
      //   document.getElementsByClassName('.left-sidebar').style.position = 'fixed';
      //   return true;
      // });
      .setOrientation('PORTRAIT');
      // .setValue('input#name', 'Andela')
      // .setValue('input#description', 'An Andelan group')
      // .click('input.btn.one-whole')
      // .pause(2000);
      // .url('http://localhost:9000/search');
      // .waitForElementVisible('.card-panel.hoverable', 5000)
      // .assert.containsText('.card-panel.hoverable', 'Andela');
  }
};

