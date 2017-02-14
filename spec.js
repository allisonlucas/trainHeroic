describe('TrainHeroic - test coach and team creation with calendar access', () => {
  it('should have a coach signup form', () => {
    browser.get('https://chgainz.trainheroic.com/app/signup/ch#/welcome');
    expect($('.th-signup').isDisplayed()).toBe(true);
  });

  it('should check name field invalid message', () => {
    element( by.model('user.fullName') ).sendKeys(' ');
    element( by.model('username') ).click();
    expect($$('.form-error').get(0).isDisplayed()).toBe(true);
  });

  it('should check username field invalid message', () => {
    element( by.model('email') ).click();
    expect($$('.form-error').get(1).isDisplayed()).toBe(true);
  });

  it('should check email field invalid message', () => {
    element( by.model('user.password') ).click();
    expect($$('.form-error').get(2).isDisplayed()).toBe(true);
  });

  it('should check password field invalid message', () => {
    element( by.model('user.phone') ).click();
    expect($$('.form-error').get(3).isDisplayed()).toBe(true);
  });

  it('should check phone field invalid message', () => {
    element( by.model('organizationName') ).click();
    expect($$('.form-error').get(4).isDisplayed()).toBe(true);
  });

  it('should check orgName field invalid message', () => {
    element( by.model('user.phone') ).click();
    expect($$('.form-error').get(5).isDisplayed()).toBe(true);
  });

  it('should check invalid form cannot be submitted', () => {
    $('.form-submit-button').click();
    browser.waitForAngularEnabled(false);
    expect($('.error-message').isDisplayed()).toBe(true);
  });

  it('should correctly fill out form', () => {
    element( by.model('user.fullName') ).sendKeys('John Smith');
    element( by.model('username') ).sendKeys('js2');
    element( by.model('email') ).sendKeys('js2@test.com');
    element( by.model('user.password') ).sendKeys('123456');
    element( by.model('user.phone') ).sendKeys('123 456 7890');
    element( by.model('organizationName') ).sendKeys('John Smith Org');
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.invisibilityOf( $$('.form-error') ), 1000 );
  });

});