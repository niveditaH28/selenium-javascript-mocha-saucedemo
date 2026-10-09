const { expect } = require('chai');
const { createDriver, loginAsStandardUser, screenshotOnFailure } = require('./baseTest');
const LoginPage = require('../pages/LoginPage');

describe('Login tests', function () {
  let driver;

  beforeEach(async function () { driver = await createDriver(); });            // runs before EACH test
  afterEach(async function () {                                                // runs after EACH test
    await screenshotOnFailure(driver, this);
    await driver.quit();
  });

  it('valid login opens the Products page', async function () {
    const inventory = await loginAsStandardUser(driver);
    expect(await inventory.getTitle()).to.equal('Products');
  });

  it('locked out user sees an error', async function () {
    const login = new LoginPage(driver);
    await login.open();
    await login.login('locked_out_user', 'secret_sauce');
    expect(await login.getErrorMessage()).to.include('locked out');
  });

  // Data-driven: one test generated per data row
  [
    ['standard_user', 'wrong_pass'],
    ['invalid_user', 'secret_sauce'],
    ['', ''],
  ].forEach(([user, pass]) => {
    it(`invalid login shows error for user="${user}" pass="${pass}"`, async function () {
      const login = new LoginPage(driver);
      await login.open();
      await login.login(user, pass);
      expect(await login.getErrorMessage()).to.include('Epic sadface');
    });
  });

  it('logout returns to the login page', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.logout();
    expect(await driver.getCurrentUrl()).to.equal('https://www.saucedemo.com/');
  });
});
