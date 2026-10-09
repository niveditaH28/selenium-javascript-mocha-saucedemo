const { expect } = require('chai');
const { createDriver, loginAsStandardUser, screenshotOnFailure } = require('./baseTest');

describe('Inventory tests', function () {
  let driver;

  beforeEach(async function () { driver = await createDriver(); });
  afterEach(async function () {
    await screenshotOnFailure(driver, this);
    await driver.quit();
  });

  it('sort price low to high orders ascending', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.sortBy('Price (low to high)');
    const prices = await inventory.getPrices();
    expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
  });

  it('sort price high to low orders descending', async function () {
    const inventory = await loginAsStandardUser(driver);
    await inventory.sortBy('Price (high to low)');
    const prices = await inventory.getPrices();
    expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
  });
});
