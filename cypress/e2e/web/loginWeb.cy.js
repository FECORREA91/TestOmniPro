const LoginPage = require('../../support/pages/LoginPage');

describe('Test Omni.Pro on Dafiti e-commerce', () => {
  before(() => {
    cy.task('readFileIfExists', {
      path: 'cypress/fixtures/credentials.json',
      action: 'delete'
    }).then((result) => {
      if (result === 'deleted') {
        cy.log('Archivo de credenciales eliminado', { log: false });
      }
    });
  });

  it('Successful registration of new user', () => {
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

    // Guardar credenciales
    const credentials = LoginPage.getCurrentCredentials();
    cy.writeFile('cypress/fixtures/credentials.json', credentials);
  });

  it('New user successful to log in', () => {
    // Leer credenciales del archivo
    cy.readFile('cypress/fixtures/credentials.json').then((credentials) => {
      LoginPage
        .navigate()
        .manualLogin(credentials.email, credentials.password)
        .verifySuccessfulLogin('Hola, Carlos')
        .verifyLogoutSuccess();
    });
  });

  it('Login Failed User does not exist', () => {
    const credentials = LoginPage.generateCredentials();
    LoginPage
      .navigate()
      .manualLogin(credentials.email, credentials.password)
      .verifyErrorMessage();
  });
});