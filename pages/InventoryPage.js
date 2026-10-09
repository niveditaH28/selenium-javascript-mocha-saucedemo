const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.title = By.className('title');
    this.backpackAddBtn = By.id('add-to-cart-sauce-labs-backpack');
    this.bikeLightAddBtn = By.id('add-to-cart-sauce-labs-bike-light');
    this.backpackRemoveBtn = By.id('remove-sauce-labs-backpack');
    this.cartBadge = By.className('shopping_cart_badge');
    this.cartLink = By.className('shopping_cart_link');
    this.sortDropdown = By.className('product_sort_container');
    this.itemPrices = By.className('inventory_item_price');
    this.menuButton = By.id('react-burger-menu-btn');
    this.logoutLink = By.id('logout_sidebar_link');
  }

  getTitle() { return this.getText(this.title); }
  addBackpack() { return this.click(this.backpackAddBtn); }
  addBikeLight() { return this.click(this.bikeLightAddBtn); }
  removeBackpack() { return this.click(this.backpackRemoveBtn); }
  getCartCount() { return this.getText(this.cartBadge); }
  isCartBadgeVisible() { return this.isDisplayed(this.cartBadge); }
  openCart() { return this.click(this.cartLink); }

  async sortBy(optionText) {
    const dropdown = await this.waitForVisible(this.sortDropdown);
    await dropdown.click();
    const option = await dropdown.findElement(By.xpath(`.//option[text()="${optionText}"]`));
    await option.click();
  }

  async getPrices() {
    await this.waitForVisible(this.itemPrices);
    const els = await this.driver.findElements(this.itemPrices);
    const texts = await Promise.all(els.map((e) => e.getText()));
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async logout() {
    await this.click(this.menuButton);
    await this.click(this.logoutLink);
  }
}

module.exports = InventoryPage;
