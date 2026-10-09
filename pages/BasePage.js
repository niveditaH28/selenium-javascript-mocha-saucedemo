const { until } = require('selenium-webdriver');

// Parent of all page objects: holds driver + reusable actions with EXPLICIT WAITS
class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 10000;
  }

  async waitForVisible(locator) {
    const el = await this.driver.wait(until.elementLocated(locator), this.timeout);
    await this.driver.wait(until.elementIsVisible(el), this.timeout);
    return el;
  }

  async type(locator, text) {
    const el = await this.waitForVisible(locator);
    await el.clear();
    await el.sendKeys(text);
  }

  async click(locator) {
    const el = await this.waitForVisible(locator);
    await el.click();
  }

  async getText(locator) {
    const el = await this.waitForVisible(locator);
    return el.getText();
  }

  async isDisplayed(locator) {
    const els = await this.driver.findElements(locator);
    return els.length > 0 && (await els[0].isDisplayed());
  }
}

module.exports = BasePage;
