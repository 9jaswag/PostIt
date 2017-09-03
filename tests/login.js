module.exports = {
  'user sign up without credentials': (browser) => {
    browser
      .url('http://localhost:9000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=phone]', '')
      .click('.signup')
      .pause(2000)
      .assert.urlEquals('http://localhost:9000');
    browser.end();
  }
};
