const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.firstName = By.id('first-name');
    this.lastName = By.id('last-name');
    this.postalCode = By.id('postal-code');
    this.continueButton = By.id('continue');
    this.finishButton = By.id('finish');
    this.completeHeader = By.className('complete-header');
    this.errorMessage = By.css("[data-test='error']");
  }

  async fillInformation(first, last, zip) {
    await this.type(this.firstName, first);
    await this.type(this.lastName, last);
    await this.type(this.postalCode, zip);
    await this.click(this.continueButton);
  }

  clickContinueOnly() { return this.click(this.continueButton); }
  clickFinish() { return this.click(this.finishButton); }
  getConfirmation() { return this.getText(this.completeHeader); }
  getErrorMessage() { return this.getText(this.errorMessage); }
}

module.exports = CheckoutPage;
