const LoginPage = require('../../support/pages/LoginPage');

describe('Flujo de Registro en Dafiti', () => {
  it('Registro exitoso con credenciales generadas', () => {
    const customUserData = {
      name: 'Carlos',
      lastname: 'Rodríguez',
      docNumber: '987654321',
      gender: 'M'
    };

    LoginPage
      .navigate()
      .registerNewUser(customUserData)
      .verifySuccessfulLogin('Carlos Rodríguez');
  });

  it('Login con credenciales generadas', () => {
    // Genera credenciales primero
    const credentials = LoginPage.generateCredentials();
    
    LoginPage
      .navigate()
      .manualLogin(credentials.email, credentials.password)
      .verifySuccessfulLogin();
  });
});