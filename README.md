# SauceDemo UI Automation - JavaScript | Selenium WebDriver | Mocha | Chai

Automated UI tests for https://www.saucedemo.com using the Page Object Model.

## Tech stack
JavaScript (Node.js), Selenium WebDriver 4, Mocha, Chai, Mochawesome

## Modules covered
Login (valid, invalid, locked-out, logout) | Inventory (sorting) | Cart (add/remove) | Checkout (happy path, validation)

## Key features
- Page Object Model
- Explicit waits (no sleeps)
- Data-driven tests
- Screenshot on failure
- HTML report with Mochawesome
- Headless mode via `HEADLESS=true`

## Run
```bash
npm install
npm test
npm run test:report            # HTML report in mochawesome-report/
HEADLESS=true npm test         # headless (PowerShell: $env:HEADLESS="true"; npm test)
```
Requirements: Node.js 18+ and Google Chrome.
