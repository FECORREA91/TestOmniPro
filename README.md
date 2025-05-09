# Cypress E2E Testing for Dafiti

This project contains end-to-end (E2E) tests for the Dafiti Colombia website using Cypress with JavaScript. It includes advanced device support, mochawesome reporting, and improved mobile emulation.

## 🚀 Project Overview

This project is configured to test the Dafiti Colombia platform, ensuring the site works correctly across different devices (mobile, tablet, and web) and browsers. Key features include:

* **Multi-Device Testing**: Mobile, tablet, and web profiles
* **Rich Test Reports**: Automated reports using `cypress-mochawesome-reporter`
* **Improved Mobile Emulation**
* **Custom Tasks and Hooks**
* **Enhanced File Handling**

## 📁 Project Structure

```
📂 cypress
├── 📁 e2e
│   └── 📄 sample_test.cy.js
├── 📁 support
│   ├── 📁 pages
│   ├── 📁 utils
│   └── 📄 e2e.js
└── 📁 reports
    └── 📄 Dafiti Test Report.html

📄 cypress.config.js
📄 package.json
📄 README.md
```

## ⚙️ Setup and Installation

1. Clone this repository:

```
git clone <repository-url>
cd <repository-directory>
```

2. Install project dependencies:

```
npm install
npm install cypress --save-dev
npm install -g npx
```

3. Run Cypress for the first time to create the folder structure:

```
npx cypress open
```

## 🛠️ Configuration

The `cypress.config.js` file includes several key settings:

* **Base URL**: [https://www.dafiti.com.co/](https://www.dafiti.com.co/)
* **Default Command Timeout**: 20,000ms
* **Retry Logic**: 2 retries in run mode, 1 in open mode
* **Custom Report Configuration**: Generates detailed reports with device-specific titles
* **Device Profiles**:

  * Mobile (430x932)
  * Tablet (768x1024)
  * Web (1440x900)

## 📊 Reporting

This project uses `cypress-mochawesome-reporter` to generate interactive HTML reports:

```
npm install cypress-mochawesome-reporter --save-dev
```

Run tests with the following command to generate reports:

```
npx cypress run
```

Reports are saved in the `cypress/reports` directory.

## 🧪 Running Tests

To run the tests, you have several options:

* Open Cypress test runner:

```
npx cypress open
```

* Run all tests in headless mode:

```
npx cypress run
```

* Run tests for a specific device:

```
npx cypress run --env device=mobile
npx cypress run --env device=tablet
npx cypress run --env device=web
```

## 🔧 Custom Tasks

This project includes custom tasks like `mobileScroll` and `readFileIfExists` for enhanced mobile testing and file management.

## 📄 License

This project is licensed under the MIT License.

## 🙌 Contributions

Feel free to fork this repository, open issues, or submit pull requests to contribute.

---

Happy Testing! 🚀
