const LoginPage = require('../../support/pages/LoginPage');

describe('Test Omni.Procls on Dafiti e-commerce', () => {
  before(() => {
    // Remove the .catch() and use a try-catch if you need to handle errors.
    cy.task('deleteFile', 'cypress/fixtures/credentials.json', { log: false })
      .then(() => {
        cy.log('Archivo de credenciales eliminado (si existía)');
      });
  });

  it('Registration successful with credentials', () => {
    const customUserData = {
      name: 'Carlos',
      lastname: 'Rodríguez',
      docNumber: '987654321',
      gender: 'Masculino'
    };

    LoginPage
      .navigate()
      .registerNewUser(customUserData)
      .verifySuccessfulLogin('Hola, Carlos')
      .verifyLogoutSuccess();

    // Save credentials IN MEMORY
    const credentials = LoginPage.getCurrentCredentials();
    cy.wrap(credentials).as('credentials');

  });

  it('Login successful', function () { 
    // Retrieve alias credentials
    const credentials = this.credentials;

    // Fallback: If alias fails, read from file
    if (!credentials) {
      cy.readFile('cypress/fixtures/credentials.json').then((fileCredentials) => {
        LoginPage
          .navigate()
          .manualLogin(fileCredentials.email, fileCredentials.password)
          .verifySuccessfulLogin();
      });
    } else {
      LoginPage
        .navigate()
        .manualLogin(credentials.email, credentials.password)
        .verifySuccessfulLogin();
    }
  });


});