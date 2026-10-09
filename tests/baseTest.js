const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

// Creates a Chrome driver. Set HEADLESS=true to run without a visible browser.
async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--window-size=1920,1080');
  if (process.env.HEADLESS === 'true') options.addArguments('--headless=new');
  // Selenium Manager downloads chromedriver automatically
  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

async function loginAsStandardUser(driver) {
  const login = new LoginPage(driver);
  await login.open();
  await login.login('standard_user', 'secret_sauce');
  return new InventoryPage(driver);
}

// Call inside afterEach(): saves a screenshot if the test failed
async function screenshotOnFailure(driver, testContext) {
  if (testContext.currentTest && testContext.currentTest.state === 'failed') {
    const dir = path.join(__dirname, '..', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    const name = testContext.currentTest.title.replace(/[^a-z0-9]/gi, '_') + '.png';
    const image = await driver.takeScreenshot();
    fs.writeFileSync(path.join(dir, name), image, 'base64');
  }
}

module.exports = { createDriver, loginAsStandardUser, screenshotOnFailure };
