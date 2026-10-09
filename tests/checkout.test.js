const { expect } = require('chai');
const { createDriver, loginAsStandardUser, screenshotOnFailure } = require('./baseTest');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('Checkout tests', function () {
  let driver;

  beforeEach(async function () { driver = await createDriver(); });
  afterEach(async function () {
    await screenshotOnFailure(driver, this);
    await driver.quit();
  });

  it('complete checkout shows the confirmation message', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    await inventory.openCart();
    await new CartPage(driver).clickCheckout();

    const checkout = new CheckoutPage(driver);
    await checkout.fillInformation('Test', 'User', '500001');
    await checkout.clickFinish();
    expect(await checkout.getConfirmation()).to.equal('Thank you for your order!');
  });

  it('checkout without information shows an error', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    await inventory.openCart();
    await new CartPage(driver).clickCheckout();

    const checkout = new CheckoutPage(driver);
    await checkout.clickContinueOnly();
    expect(await checkout.getErrorMessage()).to.include('First Name is required');
  });
});
