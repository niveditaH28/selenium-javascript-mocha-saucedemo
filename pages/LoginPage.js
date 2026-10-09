const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.username = By.id('user-name');
    this.password = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css("[data-test='error']");
  }

  async open() {
    await this.driver.get('https://www.saucedemo.com');
  }

  async login(user, pass) {
    await this.type(this.username, user);
    await this.type(this.password, pass);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.getText(this.errorMessage);
  }
}

module.exports = LoginPage;
