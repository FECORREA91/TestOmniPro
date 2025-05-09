const LoginPage = require('../../support/pages/LoginPage');

describe('Test Omni.Pro on Dafiti e-commerce - Mobile', { testIsolation: false }, () => {
  before(() => {
    // Configuración específica para mobile
    if (Cypress.config('isMobile')) {
      cy.log(`Configurando pruebas para dispositivo ${Cypress.config("deviceType")}`);
      // Timeout aumentado para mobile
      Cypress.config('defaultCommandTimeout', 30000);
    }

    // Limpiar archivo de credenciales con manejo de errores
    cy.task('deleteFile', 'cypress/fixtures/credentials.json', { log: false })
      .then((result) => {
        if (result instanceof Error) {
          console.error('Error eliminando archivo:', result.message);
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

    // Guardar credenciales en memoria y archivo
    const credentials = LoginPage.getCurrentCredentials();
    cy.wrap(credentials).as('credentials');
    cy.writeFile('cypress/fixtures/credentials.json', credentials);
  });

  it('New user successful to log in', function() {
    // Primero intenta con el alias
    if (this.credentials) {
      return LoginPage
        .navigate()
        .login(this.credentials.email, this.credentials.password)
        .verifySuccessfulLogin()
        .verifyLogoutSuccess();
    }

    // Fallback: leer del archivo si el alias falla
    cy.task('readFileIfExists', 'cypress/fixtures/credentials.json').then((fileContent) => {
      if (fileContent) {
        const credentials = JSON.parse(fileContent);
        return LoginPage
          .navigate()
          .login(credentials.email, credentials.password)
          .verifySuccessfulLogin()
          .verifyLogoutSuccess();
      }
      throw new Error('No se encontraron credenciales registradas');
    });
  });

  it('Login Failed User does not exist', () => {
    const credentials = LoginPage.generateCredentials();
    LoginPage
      .navigate()
      .login(credentials.email, credentials.password)
      .verifyErrorMessage();
  });
});
