const { expect } = require('chai');
const { createDriver, loginAsStandardUser, screenshotOnFailure } = require('./baseTest');
const CartPage = require('../pages/CartPage');

describe('Cart tests', function () {
  let driver;

  beforeEach(async function () { driver = await createDriver(); });
  afterEach(async function () {
    await screenshotOnFailure(driver, this);
    await driver.quit();
  });

  it('adding an item updates the cart badge', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    expect(await inventory.getCartCount()).to.equal('1');
  });

  it('adding two items shows badge 2', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    await inventory.addBikeLight();
    expect(await inventory.getCartCount()).to.equal('2');
  });

  it('removing the item hides the badge', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    await inventory.removeBackpack();
    expect(await inventory.isCartBadgeVisible()).to.equal(false);
  });

  it('cart page lists the added item', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.addBackpack();
    await inventory.openCart();
    const names = await new CartPage(driver).getItemNames();
    expect(names).to.include('Sauce Labs Backpack');
  });
});
