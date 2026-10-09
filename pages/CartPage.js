const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.itemNames = By.className('inventory_item_name');
    this.checkoutButton = By.id('checkout');
  }

  async getItemNames() {
    await this.waitForVisible(this.itemNames);
    const els = await this.driver.findElements(this.itemNames);
    return Promise.all(els.map((e) => e.getText()));
  }

  clickCheckout() { return this.click(this.checkoutButton); }
}

module.exports = CartPage;
