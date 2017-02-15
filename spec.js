/* The test passes if the following criteria is met: 
 * A new coach account is created
 * A new team is created
 * This user can access that team’s calendar page
 */

const _fullName = 'John Smith';
const _username = 'js' + Date.now();
const _email = 'j.s.' + Date.now() + '@test.com';
const _password = '123456';
const _phone = '1234567890';
const _orgName = 'js' + Date.now();
const _title = 'js' + Date.now();
const _code = 'js' + Date.now();
const EC = protractor.ExpectedConditions;

describe('TrainHeroic - test coach and team creation with calendar access', () => {
  it('should have a coach signup form', () => {
    browser.get('https://chgainz.trainheroic.com/app/signup/ch#/welcome');
    expect( $('.th-signup').isDisplayed() ).toBe(true);
  });

  it('should check name field invalid message', () => {
    element( by.model('user.fullName') ).click();
    element( by.model('username') ).click();
    expect( $$('.form-error').get(0).isDisplayed() ).toBe(true);
  });

  it('should check username field invalid message', () => {
    element( by.model('email') ).click();
    expect( $$('.form-error').get(1).isDisplayed() ).toBe(true);
  });

  it('should check email field invalid message', () => {
    element( by.model('user.password') ).click();
    expect( $$('.form-error').get(2).isDisplayed() ).toBe(true);
  });

  it('should check password field invalid message', () => {
    element( by.model('user.phone') ).click();
    expect( $$('.form-error').get(3).isDisplayed() ).toBe(true);
  });

  it('should check phone field invalid message', () => {
    element( by.model('organizationName') ).click();
    expect( $$('.form-error').get(4).isDisplayed() ).toBe(true);
  });

  it('should check orgName field invalid message', () => {
    element( by.model('user.phone') ).click();
    expect( $$('.form-error').get(5).isDisplayed() ).toBe(true);
  });

  it('should check invalid form cannot be submitted', () => {
    $('.form-submit-button').click();
    browser.waitForAngularEnabled(false);
    expect( $('.error-message').isDisplayed() ).toBe(true);
  });

  it('should correctly fill out coach form', () => {
    element( by.model('user.fullName') ).sendKeys(_fullName);
    element( by.model('username') ).sendKeys(_username);
    element( by.model('email') ).sendKeys(_email);
    element( by.model('user.password') ).sendKeys(_password);
    element( by.model('user.phone') ).sendKeys(_phone);
    element( by.model('organizationName') ).sendKeys(_orgName);
    browser.wait( EC.invisibilityOf( $$('.form-error') ), 1000 );
  });

  it('should submit coach form and check for create team button', () => {
    $('.form-submit-button').click();
    browser.waitForAngularEnabled(true);
    expect( element( by.buttonText('Create Team') ).isDisplayed() ).toBe(true);
  });

  it('should click create team and access team form', () => {
    element( by.buttonText('Create Team') ).click();
    expect( $('.md-dialog-content').isDisplayed() ).toBe(true);
  });

  it('should check title & code field invalid message and invalid form cannot be submitted', () => {
    element( by.model('team.title') ).click();
    element( by.model('team.code') ).click();
    element( by.model('team.title') ).click();
    expect( element( by.model('team.title') ).getAttribute('class') ).toEqual('ng-pristine md-input ng-empty ng-invalid ng-invalid-required ng-touched');
    expect( element( by.model('team.code') ).getAttribute('class') ).toEqual('ng-pristine md-input ng-empty ng-invalid ng-invalid-required ng-touched');
    element.all( by.buttonText('Create Team') ).get(1).click();
    browser.waitForAngularEnabled(false);
    expect( $('.md-dialog-content').isDisplayed() ).toBe(true);
  });

  it('should correctly fill out team form', () => {
    element( by.model('team.title') ).sendKeys(_title);
    element( by.model('team.code') ).sendKeys(_code);
    browser.wait( EC.invisibilityOf( $$('.form-error') ), 1000 );
  });

  it('should submit team form and check for calendar tab', () => {
    element.all( by.buttonText('Create Team') ).get(1).click();
    browser.waitForAngularEnabled(true);
    browser.wait( EC.visibilityOf( $('.calendar-body') ), 10000 );
    let calendar = browser.findElement(by.xpath('//div[@class="second-level ng-scope"]/div[contains(@class, "left-nav-items")]/div[contains(@class, "sub-navbar")]/div[2]'));
    expect( calendar.getText() ).toBe('CALENDAR');
  });

});