const { generateRandomEmail, generateRandomPassword } = require('../utilities/generators');

class LoginPage {
  constructor() {
    this.currentCredentials = null;
  }

  elements = {
    registerNewUser: () => cy.get('.noLogin'),
    email: () => cy.get('#RegistrationForm_email'),
    newPassword: () => cy.get('#RegistrationForm_password'),
    confirmPass: () => cy.get('#RegistrationForm_password2'),
    name: () => cy.get('#RegistrationForm_first_name'),
    lastname: () => cy.get('#RegistrationForm_last_name'),
    docNumber: () => cy.get('#RegistrationForm_identification'),
    typeOfDocument: () => cy.get('#RegistrationForm_identification_type'),
    dateOfBirthD: () => cy.get('#RegistrationForm_day'),
    dateOfBirthM: () => cy.get('#RegistrationForm_month'),
    dateOfBirthY: () => cy.get('#RegistrationForm_year'),
    gender: () => cy.get('#RegistrationForm_gender'),
    acceptTerms: () => cy.get('#RegistrationForm_terms_accepted'),
    createAccount: () => cy.get('#createAccountButton'),
    verifyName: () => cy.get('#LoginInfoTag > .text'),
    menuUser: () => cy.xpath('//*[@id="hdMenuContainer"]/ul'),
    logOut: () => cy.get('a.sel-logout').should('exist'),
    usernameInput: () => cy.get('#LoginForm_email'),
    passwordInput: () => cy.get('#LoginForm_password'),
    loginButton: () => cy.get('#loginButton'),
    errorMessage: () => cy.get('#form-account-login > fieldset > div:nth-child(5) > div.lfloat.size2of3 > div.loginField.error.mtm')
  };

  navigate() {
    cy.visit("https://www.dafiti.com.co/");
    return this;
  }

  generateCredentials(domain = "dafiti.com.co") {
    this.currentCredentials = {
      email: generateRandomEmail(domain),
      password: generateRandomPassword()
    };
    return this.currentCredentials;
  }

  registerNewUser(userData = {}) {
    if (!this.currentCredentials) {
      this.generateCredentials();
    }

    this.elements.registerNewUser().click();
    this.elements.email().type(this.currentCredentials.email);
    this.elements.newPassword().type(this.currentCredentials.password);
    this.elements.confirmPass().type(this.currentCredentials.password);
    
    this.elements.name().type(userData.name || 'Test');
    this.elements.lastname().type(userData.lastname || 'User');
    this.elements.docNumber().type(userData.docNumber || '1234567890');
    this.elements.typeOfDocument().select(userData.docType || 'CC');
    this.elements.dateOfBirthD().type('17');
    this.elements.dateOfBirthM().type('1');
    this.elements.dateOfBirthY().select('1991');
    this.elements.gender().select('Masculino');
    this.elements.acceptTerms().check();
    this.elements.createAccount().click();
    return this;
  }

  manualLoginCurrentCredentials() {
    if (!this.currentCredentials) {
      throw new Error('Debes generar credenciales primero (usa generateCredentials() o registerNewUser())');
    }
    
    this.elements.registerNewUser().click();
    this.elements.usernameInput().type(this.currentCredentials.email);
    this.elements.passwordInput().type(this.currentCredentials.password);
    this.elements.loginButton().click();
    
    return this;
  }

  manualLogin(email, password) {
    this.elements.registerNewUser().click();
    this.elements.usernameInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
    return this;
  }

  verifySuccessfulLogin(expectedName = 'Hola, Carlos') {
    this.elements.verifyName().should('contain.text', expectedName);
    return this;
  }

  verifyLogoutSuccess() {
    cy.hoverAndVerify('.arrowIcon', 'ul.hdLoginMenu');
    cy.contains('ul.hdLoginMenu a', 'Salir')
      .should(($el) => {
        if ($el.css('visibility') === 'hidden') {
          $el.css('visibility', 'visible');
        }
      })
      .click({ force: true });
    return this;
  }

  verifyErrorMessage(expectedName = 'E-mail o contraseña incorrectos.') {
    this.elements.errorMessage().should("contain.text", expectedName);
    return this;
  }

  getCurrentCredentials() {
    if (!this.currentCredentials) {
      throw new Error('No hay credenciales generadas');
    }
    return { ...this.currentCredentials };
  }
}

module.exports = new LoginPage();